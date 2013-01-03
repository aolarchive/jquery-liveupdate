/**
 * AOL Live Update UI Widget
 *
 * @fileOverview A slim UI widget to publish data from AOL liveblogs.
 *
 * @see https://github.com/aol/jquery-liveupdate
 * @author Nate Eagle, Jeremy Jannotta
 * @requires $.fn.liveUpdateApi
 */

(function ($) {

  $.fn.liveUpdateUi = function (customOptions) {

    var defaultOptions = {
        /**
         * Whether to show the toolbar UI.
         * @type Boolean
         * @default false
         */
        toolbarEnabled: false,
        /**
         * Whether to show the timeline slider and label UI in the toolbar.
         * @type Boolean
         * @default true
         */
        timelineEnabled: true,
        /**
         * Number of items to show for pagination. If 0 or not a positive integer, pagination is disabled.
         * @type Number
         * @default 0
         */
        pageSize: 0,
        /**
         * Whether to show the tweet buttons on posts.
         * @type Boolean
         * @default true
         */
        tweetButtons: true,
        /**
         * Height of the post container, required for the timeline slider to
         * function. Must be a positive integer.
         * @type Number
         * @default 0
         */
        height: 0,
        /**
         * Optional URL params to append to all outgoing links within the post
         * text; for link tracking, etc. Ex: 'icid=aol123'
         * @type String
         * @default null
         */
        linkParams: null,
        /**
         * Whether to show the 75 x 75 thumbnail version of images . If set to
         * false, will show the full image. In our default CSS, the image is
         * scaled down to 100px height and proportionally determined width.
         * @type Boolean
         * @default true
         */
        thumbnails: true,
        /**
         * Whether to use DIMS for thumbnails
         * @type Boolean
         * @default true
         */
        dims: true,
        /**
         * Dimension restrictions for thumbnail images - only applicable if
         * using DIMS
         * @type Object
         **/
        thumbnailDimensions: {
          height: 100,
          width: null
        }
      },
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

      $this = $(this),

      liveUpdateUi = function (customOptions) {

        if ($.fn.liveUpdateApi) {

          var options = $.extend(true, {}, defaultOptions, customOptions),
            scrolling = false,
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

          // Make sure linkParams don't begin with a delimiter
          if (options.linkParams && (options.linkParams.charAt(0) === '?' || options.linkParams.charAt(0) === '&')) {
            options.linkParams = options.linkParams.substr(1);
          }

          // Listen to 'begin' event from API, to initialize and build the widget
          $this.bind('begin', function (event) {

            $this.empty();

            var paused = true,
              pageSize = options.pageSize,
              pendingUpdates = [],
              beginTime = 0,
              endTime = 0,
              $alert = null,
              $tagFilter = null,
              $clearTagFilter = null,
              $posts = null,
              $toolbar = null,
              $slider = null,
              $status = null,
              $unreadCount,
              unreadItemCount = 0,
              receivedFirstUpdate = false,

              /**
               * Create DOM element for post item from the given data item. If
               * element is provided then replaces content of that element,
               * else creates new one.
               * @param {Object} item The data item used as source.
               * @param {Object|null} element The optional jQuery object to modify, instead of creating new one.
               * @returns {Object} The jQuery object built from the data, not yet added to the DOM.
               */
              buildItem = function (item, element) {

                var data = item.content,
                  type = item.type,
                  id = item.id,
                  caption = item.caption,
                  tags = item.tags,
                  timestamp = item.date,
                  memberId = item.memberId,
                  timestampString = '<a href="#p' + id + '">' + getFormattedDateTime(timestamp) + '</a> by ' + item.memberName,
                  imageUrl,
                  fullImageUrl,
                  $tweetButton,
                  tweetText,
                  $postInfo,
                  isNew = !element;

                //console.log('type', type);

                // If there is a tag filter present...
                if (options.tagFilter) {
                  // If the item doesn't have a tag or the tag is not present
                  // in this item, don't build it
                  if (!tags || $.inArray(options.tagFilter, tags) === -1) {
                    // Return an empty array
                    return [];
                  }
                }

                if (isNew) {
                  element = $('<p />', {
                    id: 'p' + id,
                    'class': 'lb-post'
                  })
                  .data('date', item.date.getTime());
                } else {
                  element.empty()
                    .addClass('lb-edited');

                  timestampString = timestampString + ' - edited';
                }

                if (type === 'text' || type === 'comment') {
                  element.append(
                    buildTextElement(data, 'lb-post-text')
                  );

                  if (type === 'comment') {
                    element.addClass('lb-comment');

                    element.prepend(
                      $('<div class="lb-comment-icon"/>')
                        .append(
                          $('<div class="lb-comment-icon-dot"/>')
                        )
                    );
                  } else {
                    // Initialize item's comments to 0
                    if (!element.data('comments')) {
                      element.data('comments', 0);
                    }
                  }

                } else if (type === 'image') {
                  if (options.thumbnails) {
                    // Store a reference to the full-sized image
                    fullImageUrl = data;
                    if (options.dims) {
                      // Use the getDynamicImageSrc plugin to fetch a proper
                      // DIMS URL
                      imageUrl = $.getDynamicImageSrc(data, options.thumbnailDimensions.width, options.thumbnailDimensions.height);
                    } else {
                      // Otherwise, use the Blogsmith CDN way of fetching a
                      // standard 75x75 thumbnail
                      imageUrl = data.replace(/(\.gif|\.jpg|\.jpeg|\.png)$/, '_thumbnail$1');
                    }
                  } else {
                    imageUrl = data;
                  }

                  element.append(
                    $('<img />', {
                      // Use the thumbnail version of the image
                      src: imageUrl,
                      'data-src': fullImageUrl || '',
                      alt: (caption) ? stripHtml(caption) : '',
                      title: 'Click to view larger'
                    }),
                    buildTextElement(caption, 'lb-post-caption')
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
                        html: '<a href="#tag=' + encodeURIComponent(el) + '" class="tag" title="Show only updates with this tag">' + el + '</a>',
                        'class': ((i === 0) ? 'lb-first' : null)
                      })
                    );
                  });
                }

                if (options.tweetButtons) {
                  // Make the tweet button
                  tweetText = caption || data;
                  $tweetButton = makeTweetButton(id, tweetText);

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
              },

              /**
               * Create jQuery element for the text portion of a post item.
               *   Does extra processing to remove unwanted tags, and format others.
               * @param {String} text The text data from the API.
               * @param {String|null} className The className for this element.
               * @returns {Object} The new jQuery object.
               */
              buildTextElement = function (text, className) {
                className = className || 'lb-post-text';
                var $el;

                if (text) {
                  // Strip out all undesirable tags before they become DOM elements
                  text = text.replace(/<script[^>]*>.*?<\/script>/ig, '');
                }

                // Build element
                $el = $('<span />', {
                  html: text,
                  'class': className
                });

                // Make sure all links target a new window
                $el.find('a').attr('target', '_blank');

                // If linkParams are provided, append to all links, in appropriate place
                if (options.linkParams) {
                  $el.find('a[href]').each(function (i, el) {
                    var $link = $(el),
                      href = $link.attr('href'),
                      hashPos = href.indexOf('#'),
                      params = (href.indexOf('?') === -1 ? '?' : '&') + options.linkParams;

                    if (hashPos !== -1) {
                      href = href.substring(0, hashPos) + params + href.substring(hashPos);
                    } else {
                      href += params;
                    }

                    $link.attr('href', href);
                  });
                }

                // Remove undesirable elements
                $el.find('object, embed, applet, iframe, frame, input, select, textarea').remove();

                return $el;
              },

              /**
               * Add data item into the DOM.
               * @param {Object} item The item to add.
               * @param {Object|null} afterElement The optional jQuery object after which to position the new item.
               */
              addItem = function (item, afterElement) {
                var $item = $('#p' + item.id, $posts),
                  $parent = null,
                  height = 0,
                  scrollTop = $posts.scrollTop(),
                  $commentsLabel;

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

                        // Add class to last comment in a row
                        $item.next('.lb-comment').andSelf()
                          .last().addClass('lb-comment-last')
                          .prev().removeClass('lb-comment-last');

                        // Increment the parent's comments count
                        $parent.data('comments', $parent.data('comments') + 1);

                        // Add the comments label to parent item, if needed
                        if ($parent.data('comments') > 0) {
                          $commentsLabel = $parent.find('.lb-post-comments-label');
                          if (!$commentsLabel.length) {
                            $parent.append(
                              $commentsLabel = $('<span />', {
                                'class': 'lb-post-comments-label',
                                'text': 'Comments'
                              })
                            );
                          }
                        }

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
              },

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
                  scrollTop = $posts.scrollTop(),
                  $parent = null;

                if ($item.length) {
                  height = $item.outerHeight();

                  $item.fadeOut(400, 'swing', function () {
                    // If deleting last comment in a row, shift class to prev comment
                    if ($item.hasClass('lb-comment-last')) {
                      $item.prev('.lb-comment').addClass('lb-comment-last');
                    }

                    // Decrement the parent's comments count
                    if ($item.hasClass('lb-comment')) {
                      $parent = $item.prevAll('.lb-post:not(.lb-comment):first');
                      $parent.data('comments', $parent.data('comments') - 1);

                      // Remove the comments label, if not needed
                      if ($parent.data('comments') === 0) {
                        $parent.find('.lb-post-comments-label').remove();
                      }
                    }

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
              addItems = function (items) {

                items = items || [];

                var len = items.length,
                  start = 0;

                // Queue up older updates, if pagination enabled and post
                // container is empty
                if (pageSize > 0 && len > pageSize && !pendingUpdates.length && !$posts.children('.lb-post').length) {

                  pendingUpdates = items.splice(0, len - pageSize);

                  $posts.append($('<a />', {
                    'class': 'lb-more-button lb-button',
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
              },

              /**
               * The 'more' button was clicked, to show the next page of paginated items.
               * @param {Event} event
               */
              onMoreButtonClicked = function (event) {
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
              },

              /**
               * Scroll the post container to position the given post item at the top.
               * @param {String} id The id of post item to scroll to.
               * @returns {Object} The jQuery object for the target item.
               */
              goToItem = function (id) {
                var $post = $('#p' + id, $posts);

                scrolling = true;

                if ($post.length) {
                  // Scroll to top of this post
                  $posts.stop().animate({
                    'scrollTop': $post.get(0).offsetTop
                  }, {
                    duration: 'fast',
                    complete: function () {
                      scrolling = false;
                    }
                  });
                }

                return $post;
              },

              /**
               * Find the post item nearest to the given timestamp.
               * @param {Number} timestamp The timestamp to compare, as generated from Date.getTime()
               * @returns {Object|null} The jQuery object found with the nearest
               *   match to the given timestamp, or null if not found.
               */
              getNearestItemByTime = function (timestamp) {
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
              },

              /**
               * Formats a Date object into a simple string; ex: "9/27/2012, 10:44am"
               * @param {Date} dateObj The Date object to format.
               * @returns {String} Formatted date/time string.
               */
              getFormattedDateTime = function (dateObj) {
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
              },

              /**
               * Return a Tweet Button according to the specs here:
               * @see https://twitter.com/about/resources/buttons#tweet
               * @param {String} id The post item id
               * @param {String} text The text to include in the tweet
               */
              makeTweetButton = function (id, text) {
                var href = window.location.href.replace(/\#.*$/, ''),

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
              },

              /**
               * Modify the pendingUpdates array. If item is provided, replaces
               *   existing with that item; if item not provided then deletes item from list.
               *
               * @param {String} id The post item id of the item to modify
               * @param {Object|null} item The new item to use, or null to remove it
               */
              modifyPendingUpdate = function (id, item) {
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
              },

              /**
               * Pause button was clicked
               * @param {Event} event
               */
              onPausedButtonClicked = function (event) {
                var $button = $(event.target);

                if (paused) {
                  start();
                  $button.text('Pause').attr('title', 'Stop receiving updates');
                  $toolbar.removeClass('lb-status-paused');
                } else {
                  stop();
                  $button.text('Resume').attr('title', 'Resume receiving updates');
                  $toolbar.addClass('lb-status-paused');
                }

                updateStatusLabel();
              },

              /**
               * Start/resume the API, so polls for updates
               */
              start = function () {
                $this.liveUpdateApi('play');
                paused = false;
              },

              /**
               * Pause the API, so no polling occurs
               */
              stop = function () {
                $this.liveUpdateApi('pause');
                paused = true;
              },

              /**
               * Update the blog status indicator based on its paused state.
               * @param {Boolean} enabled Whether the status should be visible or not.
               */
              updateStatusLabel = function (enabled) {
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
              },

              /**
               * Setup the slider controls parameters, update position
               */
              initSlider = function () {
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
              },

              /**
               * Update the slider label's text
               */
              updateSliderLabel = function (value) {
                if ($slider) {
                  value = value || $slider.slider('value');

                  var timeObj = new Date(value),
                    timeStr = getFormattedDateTime(timeObj);

                  $('.lb-timeline-label', $toolbar).text(timeStr);
                }
              },

              /**
               * Set the slider's value, which sets its position, and update the label
               */
              setSliderValue = function (value) {
                if ($slider) {
                  $slider.slider('value', value);
                  updateSliderLabel();
                }
              },

              /**
               * Return the top most visible post item in the scrollable container
               * @returns {Object|null} jQuery object of top most visible item, or null if not found
               */
              getTopVisibleItem = function (container) {
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
              },

              /**
               * On container scroll event, set slider value based on the top most visible post item
               */
              onContainerScroll = function (event) {
                var $topItem = getTopVisibleItem($posts);

                if ($topItem) {
                  if (!$topItem.hasClass('lb-top')) {
                    $posts.children('.lb-top').removeClass('lb-top');
                    $topItem.addClass('lb-top');
                  }

                  if (!scrolling) {
                    setSliderValue($topItem.data('date'));
                  }
                }

                if ($posts.scrollTop() === 0) {
                  updateUnreadItems(0);
                }
              },

              /**
               * As slider is moving, update the label and scroll position
               */
              onSliderMove = function (event, ui) {
                updateSliderLabel(ui.value);

                var $item = getNearestItemByTime(ui.value);
                if ($item) {
                  //$posts.find('.highlight').removeClass('highlight');
                  //$item.addClass('highlight');
                  goToItem($item.attr('id').substr(1));
                }
              },

              /**
               * Update the unreadItemCount prop, and update the badge UI
               */
              updateUnreadItems = function (num) {
                unreadItemCount = num;

                // Update the unread count UI element
                $unreadCount.html('<b>' + num + '</b> new update' + (num !== 1 ? 's' : ''))
                .toggle(num > 0);

                // Show/hide the alert box based on its contents
                if (num > 0) {
                  $alert.slideDown(300);
                } else if (!Boolean(options.tagFilter)) {
                  $alert.slideUp(300);
                }
              },

              /**
               * Clear the tag filter and reset view to show all updates
               */
              clearTagFilter = function () {
                options.tagFilter = '';
                // Use a dummy hash, because '#' alone is equivalent to _top,
                // which scrolls the page
                window.location.hash = '_';
                $this.liveUpdateApi('reset');
                $this.trigger('begin');
              };

            /*
             *  Setup the UI structure
             */

            $this.addClass('lb');

            if (options.toolbarEnabled) {
              $this.append(
                $toolbar = $('<div />', {
                  'class': 'lb-toolbar'
                })
                .append(
                  $('<a />', {
                    'class': 'lb-pause-button lb-button',
                    'text': 'Pause',
                    'title': 'Stop receiving updates'
                  })
                  .bind('click', $.proxy(onPausedButtonClicked, this))
                )
              );
                
              if (options.timelineEnabled) {
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
                )
                .appendTo($toolbar);
              }

              $status = $('<span />', {
                  'class': 'lb-status'
                }
              )
              .hide()
              .appendTo($toolbar);
              
              if ($slider) {
                $slider.slider({
                  slide: onSliderMove,
                  disabled: true
                });
              }
            }

            $alert = $('<div />', {
              'class': 'lb-alert'
            })
            .appendTo($this)
            .append(
              $unreadCount = $('<a />', {
                'class': 'lb-unread-count',
                title: 'Jump to newest update'
              })
              .hide()
              .click(function (event) {
                event.preventDefault();

                if (!options.tagFilter) {
                  $posts.stop().animate({
                    'scrollTop': 0
                  }, {
                    duration: 'fast'
                  });
                } else {
                  clearTagFilter();
                }
              })
            )
            .hide();

            if (options.tagFilter) {
              $alert.show()
              .append(
                $tagFilter = $('<span />', {
                  'class': 'lb-tag-filter',
                  html: 'Showing all updates with the <b>' + options.tagFilter + '</b> tag. '
                })
              );

              $clearTagFilter = $('<a />', {
                href: '#',
                text: 'View all updates'
              })
                .appendTo($tagFilter)
                .bind('click', function (event) {
                  event.preventDefault();

                  clearTagFilter();
                });
            }

            $posts = $('<div />', {
              'class': 'lb-post-container'
            })
            .appendTo($this)
            .scroll($.throttle(250, onContainerScroll));

            if (options.height && options.height > 0) {
              $posts.height(options.height);
            }

            // Bind to API 'update' events
            $this.bind('update', function (event, data) {
              //console.log('update', event, data);
              var hash = window.location.hash,
                newUnreadItems = 0;

              if (data.updates) {
                // Init the begin time if not set yet
                if (beginTime === 0) {
                  beginTime = (new Date()).getTime();
                }

                // Add items to the DOM
                addItems(data.updates);

                // Update the slider's range and position
                initSlider();

                if (receivedFirstUpdate) {
                  // If container is scrolled, record all updates as new
                  if ($posts.scrollTop() > 0) {
                    newUnreadItems = data.updates.length;

                  // If container isn't scrolled but is showing tag filter view,
                  // only record new items not in this view as new
                  } else if (options.tagFilter) {
                    $.each(data.updates, function (i, item) {
                      if (!item.tags || (item.tags && $.inArray(options.tagFilter, item.tags) === -1)) {
                        newUnreadItems += 1;
                      }
                    });
                  }
                  // Update the unread count
                  if (newUnreadItems > 0) {
                    updateUnreadItems(unreadItemCount + newUnreadItems);
                  }
                }
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
                  postPosition = hash.indexOf('p'),
                  $targetItem;

                // If first char is a 'p'
                if (postPosition === 1) {
                  start = postPosition + 1;
                  // Note assumption that the hash ONLY contains an ID
                  id = hash.substring(start, hash.length);

                  $targetItem = goToItem(id);

                  // Scroll post container to top of main window, if permalink was valid
                  if ($targetItem.length) {
                    $(window).scrollTop($posts.offset().top);
                  }
                }
              }

              receivedFirstUpdate = true;
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
            $this.liveUpdateApi('reset');

            // Manually clean up some bindings
            // TODO: separate building UI from event binding
            $this.unbind('end update');

            $this.trigger('begin');
            //$this.find('.lb-post-container').scrollTop('0');
          });

          $this.delegate('img', 'click', function (event) {
            var $currentTarget = $(event.currentTarget),
              fullImageUrl = $currentTarget.attr('data-src'),
              imgSrc = (fullImageUrl) ? fullImageUrl : $currentTarget.attr('src'),
              $loadingContainer = $('<div />', {
                'class': 'lb-img-loading'
              }),
              $loadingMessage = $('<span />', {
                html: 'Loading&hellip;'
              }),
              $img = $('<img />', { src: imgSrc }),
              $imgDisplay = $('<div />')
                .prependTo('body');

            $loadingContainer.insertBefore($currentTarget);
            $currentTarget.detach().appendTo($loadingContainer);

            $loadingMessage.appendTo($loadingContainer)
              .hide()
              .fadeIn('fast');

            // Use images loaded plugin
            // https://github.com/desandro/imagesloaded
            $img.imagesLoaded(function () {
              var $win = $(window),
                windowPadding = 100,
                maxWidth = $win.width() - windowPadding,
                maxHeight = $win.height() - windowPadding;

              // Remove the loading message
              $currentTarget.detach().insertAfter($loadingContainer);
              $loadingContainer.remove();
              // Append the full-size image
              $imgDisplay.append($img);

              // TODO: The following two image resizing blocks aren't very DRY.
              // Think about ways to refactor.

              // If the image is wider than the window
              if ($img.width() > maxWidth) {
                // Restrict its width
                $img.width(maxWidth);

                // If the image is still taller than the window
                if ($img.height() > maxHeight) {
                  // Restrict its height
                  $img.height(maxHeight);
                  // Remove the width restriction, so that the aspect ratio
                  // will be correct
                  $img.width('');
                }
              }

              // If the image is taller than the window
              if ($img.height() > maxHeight) {
                // Restrict its height
                $img.height(maxHeight);

                // If the image is still wider than the window
                if ($img.width() > maxWidth) {
                  // Restrict its width
                  $img.width(maxWidth);
                  // Remove the height restriction, so that the aspect ratio
                  // will be correct
                  $img.height('');
                }
              }

              $imgDisplay.dialog({
                height: 'auto',
                modal: true,
                //title: $currentTarget.attr('alt'),
                width: 'auto',
                dialogClass: 'lb-image-dialog',
                zIndex: 9000
              });

              // If the user clicks outside the dialog, close it
              $('.ui-widget-overlay').bind('click', function (event) {
                $imgDisplay.dialog('destroy');
              });

            });

          });

          // If IE 6 (or lower... oh dear)
          if ($.browser.msie && parseInt($.browser.version, 10) <= 6) {
            // Add .lb-hover class upon hover
            $this.delegate('.lb-button', 'hover', function (event) {
              $(this).toggleClass('lb-hover');
            });
          }

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
          $this.liveUpdateApi(options);

        }

      };

    return this.each(function () {
      customOptions = customOptions || {};
      liveUpdateUi(customOptions);
    });

  };

}(jQuery));
