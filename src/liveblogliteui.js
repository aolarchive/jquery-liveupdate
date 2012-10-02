/**
 * AOL Liveblog Lite UI Widget
 *
 * @fileOverview A slim UI widget to publish data from AOL liveblogs.
 *
 * @see https://github.com/aol/liveblog-widget
 * @author Nate Eagle, Jeremy Jannotta
 * @requires $.fn.liveBlogLiteApi
 */

(function ($) {

  $.fn.liveBlogLiteUi = function (customOptions) {

    var defaultOptions = {
        postId: null,
        url: null,
        toolbarEnabled: false,
        pageSize: 0,
        tweetButtons: true,
        height: 0
      },

      $this = $(this),

      liveBlogLiteUi = function (customOptions) {

        if ($.fn.liveBlogLiteApi) {

          var options = $.extend(true, {}, defaultOptions, customOptions),
            hash = window.location.hash;

          // Check the hash for the presence of a tag filter
          // Only one tag may be filtered at a time (currently)
          if (hash.length) {
            var tag,
              start,
              tagPosition = hash.indexOf('tag=');

            if (tagPosition > -1) {
              start = tagPosition + 4;
              tag = hash.substring(start, hash.length);
              tag = decodeURIComponent(tag);

              options.tagFilter = tag;
            }
          }

          // Listen to 'begin' event from API, to initialize and build the widget
          $this.bind('begin', function (event) {

            $this.empty();

            var paused = true,
              pageSize = options.pageSize,
              pendingUpdates = [],
              beginTime = 0,
              endTime = 0,
              $tagAlert = null,
              $clearTagFilter = null,
              $posts = null,
              $toolbar = null,
              $slider = null,
              $status = null,

              /**
               * Create DOM element for post item from the given data item. If
               * element is provided then replaces content of that element,
               * else creates new one.
               * @param {Object} item The data item used as source.
               * @param {Object|null} element The optional jQuery object to modify, instead of creating new one.
               * @returns {Object} The jQuery object built from the data, not yet added to the DOM.
               */
              buildItem = function (item, element) {//{{{

                var data = item.content,
                  type = item.type,
                  id = item.id,
                  caption = item.caption,
                  tags = item.tags,
                  timestamp = item.date,
                  memberId = item.memberId,
                  timestampString = '<a href="#p' + id + '">' + getFormattedDateTime(timestamp) + '</a> by ' + item.memberName,
                  $tweetButton,
                  tweetText,
                  $postInfo;

                //console.log('type', type);

                // If there is a tag filter present...
                if (options.tagFilter && tags) {
                  // If the tag is not present in this item, don't build it
                  if ($.inArray(options.tagFilter, tags) === -1) {
                    // Return an empty array
                    return [];
                  }
                }

                if (!element) {
                  element = $('<p />', {
                    id: 'p' + id,
                    'class': 'lb-post'
                  })
                  .data('date', item.date.getTime());
                } else {
                  element.empty();
                }

                if (type === 'text' || type === 'comment') {
                  element.append(
                    $('<span />', {
                      html: data,
                      'class': 'lb-post-text'
                    })
                  );

                  if (type === 'comment') {
                    element.addClass('lb-comment');
                  }

                } else if (type === 'image') {
                  element.append(
                    $('<img />', {
                      src: data
                    }),
                    $('<span />', {
                      html: caption,
                      'class': 'lb-post-caption'
                    })
                  );
                }

                element.append(
                  $postInfo = $('<span />', {
                    'class': 'lb-post-info'
                  })
                  .append(
                    $('<span />', {
                      html: timestampString,
                      'class': 'lb-post-timestamp'
                    })
                  )
                );

                if (item.tags && item.tags.length) {
                  var tagsList = $('<ul />', {
                    'class': 'lb-post-tags'
                  }).appendTo($postInfo);

                  $.each(item.tags, function (i, el) {
                    tagsList.append(
                      $('<li />', {
                        html: '<a href="#tag=' + encodeURIComponent(el) + '" class="tag">' + el + '</a>',
                        'class': ((i === 0) ? 'lb-first' : null)
                      })
                    );
                  });
                }

                if (options.tweetButtons) {
                  // Make the tweet button
                  tweetText = caption || data;
                  $tweetButton = makeTweetButton(id, data);

                  // Bind a just-in-time load of the tweet button
                  element.bind('mouseenter', function (event) {
                    // Unbind the load event once it's been triggered
                    element.unbind('mouseenter');
                    $postInfo.append($tweetButton);

                    // Re-render tweet buttons
                    // https://dev.twitter.com/discussions/6860
                    twttr.widgets.load();
                  });

                }

                return element;
              },//}}}

              /**
               * Add data item into the DOM.
               * @param {Object} item The item to add.
               * @param {Object|null} afterElement The optional jQuery object after which to position the new item.
               */
              addItem = function (item, afterElement) {//{{{
                var $item = $('#p' + item.id, $posts),
                  $parent = null,
                  height = 0,
                  scrollTop = $posts.scrollTop();

                if (!$item.length) {
                  $item = buildItem(item);

                  if ($item.length) {
                    $item.hide();

                    if (item.type === 'comment' && item.p) {
                      $parent = $('#p' + item.p, $posts);

                      if ($parent.length) {
                        // Give comment the timestamp of its parent post, for navigation
                        $item.data('date', $parent.data('date'));

                        // Append comment directly after its parent post
                        $item.insertAfter($parent);
                      } else {
                        // Parent post doesn't exist, so add comment to
                        // pendingUpdates array for processing in next page
                        pendingUpdates.push(item);
                      }

                    } else if (afterElement && afterElement.length) {
                      $item.insertAfter(afterElement);

                    } else {
                      $item.prependTo($posts);
                    }

                    // Adjust scroll position so doesn't shift after adding an item
                    height = $item.outerHeight();
                    if (height && scrollTop) {
                      $posts.scrollTop(scrollTop + height);
                    }

                    $item.fadeIn(400);
                  }
                }
              },//}}}

              /**
               * Update data item in the DOM with new one.
               * @param {Object} item The new item to use.
               */
              updateItem = function (item) {
                var $item = $('#p' + item.id, $posts),
                  beforeHeight = 0,
                  afterHeight = 0,
                  diffHeight = 0,
                  scrollTop = $posts.scrollTop();

                if ($item.length) {
                  beforeHeight = $item.outerHeight();
                  $item = buildItem(item, $item);

                  if ($item) {
                    afterHeight = $item.outerHeight();
                    diffHeight = afterHeight - beforeHeight;

                    // Adjust scroll position so doesn't shift after editing an item
                    if (diffHeight && scrollTop) {
                      $posts.scrollTop(scrollTop + diffHeight);
                    }

                    // TODO: Show update animation effect here instead of fadeIn
                    $item.hide().fadeIn(400);
                  }
                } else {
                  // If item is pending, overwrite its object
                  modifyPendingUpdate(item.id, item);
                }
              },//}}}

              /**
               * Remove data item from the DOM.
               * @param {Object} item The item to remove; requires item.id for reference.
               */
              deleteItem = function (item) {
                var $item = $('#p' + item.id, $posts),
                  height = 0,
                  scrollTop = $posts.scrollTop();

                if ($item.length) {
                  height = $item.outerHeight();

                  $item.fadeOut(400, 'swing', function () {
                    $item.remove();

                    // Adjust scroll position so doesn't shift after removing an item
                    if (height && scrollTop) {
                      $posts.scrollTop(scrollTop - height);
                    }
                  });
                } else {
                  // If item is pending, delete it from the list
                  modifyPendingUpdate(item.id, null);
                }
              },//}}}

              /**
               * Add data items from API into the DOM. IF pagination is enabled,
               *   only shows n items at a time, and remainder goes into pendingUpdates array.
               * @param {Array} items An array of post items from the API to add to the view.
               */
              addItems = function (items) {//{{{

                items = items || [];

                var len = items.length,
                  start = 0;

                // Queue up older updates, if pagination enabled and post
                // container is empty
                if (pageSize > 0 && len > pageSize && !pendingUpdates.length && !$posts.children('.lb-post').length) {

                  pendingUpdates = items.splice(0, len - pageSize);

                  $posts.append($('<a />', {
                    'class': 'lb-more-button',
                    text: 'Show earlier posts'
                  }))
                  .click($.proxy(onMoreButtonClicked, this));
                }

                $(items).each(function (i, item) {
                  // Add item to the DOM
                  addItem(item);

                  // Update the begin and end times
                  if (item.type !== 'comment' && item.date) {
                    var timestamp = item.date.getTime();
                    beginTime = Math.min(beginTime, timestamp);
                    endTime = Math.max(endTime, timestamp);
                  }
                });
              },//}}}

              /**
               * The 'more' button was clicked, to show the next page of paginated items.
               * @param {Event} event
               */
              onMoreButtonClicked = function (event) {//{{{
                var button = $(event.target),
                  len = pendingUpdates.length,
                  lastItem = null,
                  start = 0,
                  nextPage = null;

                if (len) {
                  lastItem = $posts.children('.lb-post:last');

                  start = Math.max(len - pageSize, 0);
                  nextPage = pendingUpdates.splice(start, pageSize);

                  $(nextPage).each(function (i, item) {
                    addItem(item, lastItem);
                  });
                }

                if (!pendingUpdates.length) {
                  button.remove();
                }
              },//}}}

              /**
               * Scroll the post container to position the given post item at the top.
               * @param {String} id The id of post item to scroll to.
               */
              goToItem = function (id) {//{{{
                var $post = $('#p' + id, $posts);

                if ($post.length) {
                  // Scroll to top of this post
                  $posts.scrollTop($post.get(0).offsetTop);
                }
              },//}}}

              /**
               * Find the post item nearest to the given timestamp.
               * @param {Number} timestamp The timestamp to compare, as generated from Date.getTime()
               * @returns {Object|null} The jQuery object found with the nearest
               *   match to the given timestamp, or null if not found.
               */
              getNearestItemByTime = function (timestamp) {//{{{
                var $item = null;

                $posts.children('.lb-post:not(.lb-comment)').each(function (i, el) {
                  var $el = $(el);

                  if ($el.data('date') === timestamp ||
                      ($el.data('date') < timestamp && $el.prev().data('date') > timestamp)) {
                    $item = $el;
                    return false;
                  }
                });

                return $item;
              },//}}}

              /**
               * Formats a Date object into a simple string; ex: "9/27/2012, 10:44am"
               * @param {Date} dateObj The Date object to format.
               * @returns {String} Formatted date/time string.
               */
              getFormattedDateTime = function (dateObj) {//{{{
                dateObj = new Date(dateObj);

                var ampm = 'am',
                  hours = dateObj.getHours(),
                  minutes = dateObj.getMinutes(),
                  timeStr = '',
                  dateStr = '',
                  dateTimeStr = '',
                  now = new Date(),
                  yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                if (hours >= 12) {
                  ampm = 'pm';
                }

                if (hours === 0) {
                  hours = 12;
                } else if (hours > 12) {
                  hours = hours - 12;
                }

                if (minutes < 10) {
                  minutes = '0' + minutes;
                }

                timeStr = hours + ':' + minutes + ampm;

                dateStr = (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

                if (dateObj.getTime() >= yesterday.getTime()) {
                  dateTimeStr = timeStr;
                } else {
                  dateTimeStr = dateStr + ', ' + timeStr;
                }

                return dateTimeStr;
              },//}}}

              /**
               * Return a Tweet Button according to the specs here:
               * @see https://twitter.com/about/resources/buttons#tweet
               * @param {String} id The post item id
               * @param {String} text The text to include in the tweet
               */
              makeTweetButton = function (id, text) {//{{{
                var href = window.location.href.replace(/\#.*$/, ''),
                  /**
                   * Simple way to strip html tags
                   * @see http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
                   * @param {string} html Text with html tags
                   */
                  stripHtml = function (html) {
                    var tmp = document.createElement('DIV');
                    tmp.innerHTML = html;
                    return tmp.textContent || tmp.innerText;
                  },

                  $tweetButton = $('<a />', {
                    'data-count': 'none',
                    'data-text': '"' + stripHtml(text) + '"',
                    'data-url': href + '#p' + id,
                    'href': 'https://twitter.com/share',
                    'class': 'twitter-share-button'
                  }),
                  tmp = document.createElement('DIV');

                tmp.innerHtml = text;

                return $tweetButton;
              },//}}}

              /**
               * Modify the pendingUpdates array. If item is provided, replaces
               *   existing with that item; if item not provided then deletes item from list.
               *
               * @param {String} id The post item id of the item to modify
               * @param {Object|null} item The new item to use, or null to remove it
               */
              modifyPendingUpdate = function (id, item) {//{{{
                if (pendingUpdates.length) {
                  for (var i = 0; i < pendingUpdates.length; i++) {
                    if (pendingUpdates[i].id === id) {
                      if (item) {
                        // Update item
                        pendingUpdates[i] = item;
                      } else {
                        // Delete item
                        pendingUpdates[i] = null;
                        pendingUpdates.splice(i, 1);
                      }
                      break;
                    }
                  }
                }
              },//}}}

              /**
               * Pause button was clicked
               * @param {Event} event
               */
              onPausedButtonClicked = function (event) {//{{{
                var $button = $(event.target);

                if (paused) {
                  start();
                  $button.text('Pause');
                  $toolbar.removeClass('lb-status-paused');
                } else {
                  stop();
                  $button.text('Resume');
                  $toolbar.addClass('lb-status-paused');
                }

                updateStatusLabel();
              },//}}}

              /**
               * Start/resume the API, so polls for updates
               */
              start = function () {
                $this.liveBlogLiteApi('play');
                paused = false;
              },

              /**
               * Pause the API, so no polling occurs
               */
              stop = function () {
                $this.liveBlogLiteApi('pause');
                paused = true;
              },

              /**
               * Update the blog status indicator based on its paused state.
               * @param {Boolean} enabled Whether the status should be visible or not.
               */
              updateStatusLabel = function (enabled) {//{{{
                if ($status) {
                  $status.removeClass('lb-status-live');

                  if (enabled === false) {
                    $status.text('')
                      .hide();
                  } else {
                    if (paused) {
                      $status.text('Paused');
                    } else {
                      $status.text('Live!')
                        .addClass('lb-status-live');
                    }
                    $status.show();
                  }
                }
              },//}}}

              /**
               * Setup the slider controls parameters, update position
               */
              initSlider = function () {//{{{
                if ($slider) {
                  // Set the min and max values
                  $slider.slider('option', {
                    min: beginTime,
                    max: endTime,
                    disabled: false
                  });
                  // Update the slider based on latest scroll position
                  $posts.scroll();
                }
              },//}}}

              /**
               * Update the slider label's text
               */
              updateSliderLabel = function (value) {//{{{
                if ($slider) {
                  value = value || $slider.slider('value');

                  var timeObj = new Date(value),
                    timeStr = getFormattedDateTime(timeObj);

                  $('.lb-timeline-label', $toolbar).text(timeStr);
                }
              },//}}}

              /**
               * Set the slider's value, which sets its position, and update the label
               */
              setSliderValue = function (value) {//{{{
                if ($slider) {
                  $slider.slider('value', value);
                  updateSliderLabel();
                }
              },//}}}

              /**
               * Return the top most visible post item in the scrollable container
               * @returns {Object|null} jQuery object of top most visible item, or null if not found
               */
              getTopVisibleItem = function (container) {//{{{
                var $container = $(container || window),
                  $topItem = null;

                $container.children('.lb-post').each(function (i, el) {
                  var $el = $(el),
                    height = $el.height(),
                    positionTop = $el.position().top,
                    positionBottom = positionTop + height;

                  if (positionTop <= 0 && positionBottom > 0) {
                    $topItem = $el;
                    //console.log('Top scrolled item: (' + positionTop + ') ' + $el.find('.lb-post-text,.lb-post-caption').text());
                    return false;
                  }
                });

                return $topItem;
              },//}}}

              /**
               * On container scroll event, set slider value based on the top most visible post item
               */
              onContainerScroll = function (event) {//{{{
                var $topItem = getTopVisibleItem($posts);

                if ($topItem) {
                  if (!$topItem.hasClass('lb-top')) {
                    $posts.children('.lb-top').removeClass('lb-top');
                    $topItem.addClass('lb-top');
                  }

                  setSliderValue($topItem.data('date'));
                }
              },//}}}

              /**
               * As slider is moving, update the label and scroll position
               */
              onSliderMove = function (event, ui) {//{{{
                updateSliderLabel(ui.value);

                var $item = getNearestItemByTime(ui.value);
                if ($item) {
                  goToItem($item.attr('id').substr(1));
                }
              };//}}}

            /*
             *  Setup the UI structure
             */

            $this.addClass('lb');

            if (options.toolbarEnabled) {//{{{
              $this.append(
                $toolbar = $('<div />', {
                  'class': 'lb-toolbar'
                })
                .append(
                  $('<a />', {
                    'class': 'lb-pause-button',
                    'text': 'Pause'
                  })
                  .bind('click', $.proxy(onPausedButtonClicked, this)),

                  $('<div />', {
                    'class': 'lb-timeline'
                  })
                  .append(
                    $('<p />', {
                      'class': 'lb-timeline-label',
                      text: 'Waiting for updates...'
                    }),
                    $slider = $('<div />', {
                      'class': 'lb-timeline-slider'
                    })
                  ),

                  $status = $('<span />', {
                      'class': 'lb-status'
                    })
                )
              );

              $slider.slider({
                slide: onSliderMove,
                disabled: true
              });
            }//}}}

            if (options.tagFilter) {
              $tagAlert = $('<div />', {
                'class': 'lb-tag-alert',
                html: 'Showing all updates with the <b>' + options.tagFilter + '</b> tag. '
              }).appendTo($this);

              $clearTagFilter = $('<a />', {
                href: '#',
                text: 'View all updates'
              })
                .appendTo($tagAlert)
                .bind('click', function (event) {
                  event.preventDefault();

                  options.tagFilter = '';
                  window.location.hash = '';
                  $this.liveBlogLiteApi('reset');
                  $this.trigger('begin');
                });
            }

            $posts = $('<div />', {
              'class': 'lb-post-container'
            })
            .appendTo($this)
            .scroll(onContainerScroll);

            if (options.height && options.height > 0) {
              $posts.height(options.height);
            }

            // Bind to API 'update' events
            $this.bind('update', function (event, data) {
              //console.log('update', event, data);
              var hash = window.location.hash;

              if (data.updates) {
                // Init the begin time if not set yet
                if (beginTime === 0) {
                  beginTime = (new Date()).getTime();
                }

                // Add items to the DOM
                addItems(data.updates);

                // Update the slider's range and position
                initSlider();
              }

              $(data.changes).each(function (i, item) {
                updateItem(item);
              });

              if (data.deletes) {
                $(data.deletes).each(function (i, item) {
                  var $item = $('#p' + item.id),
                    timestamp,
                    nextItem;

                  // Adjust the begin or end time, if this item was the first or last item
                  if ($item.length && !$item.hasClass('lb-comment')) {
                    timestamp = $item.data('date');

                    // Item was first, assign beginTime to prev item's date
                    if (timestamp === beginTime) {
                      nextItem = $item.prev(':not(.lb-comment)');
                      if (nextItem.length) {
                        beginTime = nextItem.data('date');
                      }
                    }
                    // Item was last, assign endTime to next item's date
                    if (timestamp === endTime) {
                      nextItem = $item.next(':not(.lb-comment)');
                      if (nextItem.length) {
                        endTime = nextItem.data('date');
                      }
                    }
                    // Update the slider
                    initSlider();
                  }

                  // Remove the item from the DOM
                  deleteItem(item);
                });
              }

              // Allow permalinks to individual updates
              // ie, #p19923
              if (hash.length) {
                var id,
                  start,
                  postPosition = hash.indexOf('p');

                if (postPosition > -1) {
                  start = postPosition + 1;
                  // Note assumption that the hash ONLY contains an ID
                  id = hash.substring(start, hash.length);

                  goToItem(id);
                }
              }

            });

            // API fires 'end' event when the set time is reached to stop polling
            $this.bind('end', function (event) {
              $('.lb-pause-button', $this).hide();
              updateStatusLabel(false);
            });

            // If not alive, or already reached end time
            if (options.alive === false || (options.end && options.end <= new Date())) {
              $('.lb-pause-button', $this).hide();
              updateStatusLabel(false);

            // else is alive and kickin'
            } else {
              paused = false;
              updateStatusLabel();
            }

          });

          $this.delegate('.tag', 'click', function (event) {
            options.tagFilter = $(event.currentTarget).text();
            $this.liveBlogLiteApi('reset');

            // Manually clean up some bindings
            // TODO: separate building UI from event binding
            $this.unbind('end update');

            $this.trigger('begin');
            //$this.find('.lb-post-container').scrollTop('0');
          });


          // Set up show / hide of tweet buttons
          if (options.tweetButtons) {

            // Load Twitter Share JS
            // Script taken from Twitter, but linted
            // https://twitter.com/about/resources/buttons#tweet
            if (typeof twttr === 'undefined') {
              (function (d, s, id) {
                var js,
                  fjs = d.getElementsByTagName(s)[0];

                if (!d.getElementById(id)) {
                  js = d.createElement(s);
                  js.id = id;
                  js.src = 'http://platform.twitter.com/widgets.js';
                  fjs.parentNode.insertBefore(js, fjs);
                }
              }(document, 'script', 'twitter-wjs'));
            }

            $this.delegate('.lb-post', 'mouseenter', function (event) {
              $(event.currentTarget)
                .find('.twitter-share-button')
                .fadeIn('fast');
            });

            $this.delegate('.lb-post', 'mouseleave', function (event) {
              $(event.currentTarget)
                .find('.twitter-share-button')
                .fadeOut('fast');
            });
          }

          // Begin polling the API
          $this.liveBlogLiteApi(options);

        }

      };

    return this.each(function () {
      customOptions = customOptions || {};
      liveBlogLiteUi(customOptions);
    });

  };

}(jQuery));
