/*
 * aol.livebloglite
 * https://github.com/aol/liveblog-widget
 *
 * by Nate Eagle & Jeremy Jannotta
 */

(function ($) {

  $.fn.liveBlogLiteUi = function (customOptions) {

    var defaultOptions = {
        postId: null,
        url: null,
        toolbarEnabled: false,
        pageSize: 0,
        tweetButtons: true
      },

      $this = $(this),

      liveBlogLiteUi = function (customOptions) {

        if ($.fn.liveBlogLiteApi) {

          var options = $.extend(true, {}, defaultOptions, customOptions);

          $this.bind('begin', function (event) {

            $this.empty();

            var paused = true,
              pageSize = options.pageSize,
              pendingUpdates = [],
              beginTime = 0,
              endTime = 0,
              $posts = null,
              $toolbar = null,
              $slider = null,

              buildItem = function (item, element) {

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
                      text: data,
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
                      text: caption,
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
                        text: el,
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
              },

              addItem = function (item, afterElement) {
                var $item = $('#p' + item.id, $posts),
                  $parent = null;

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

                    $item.fadeIn(400);
                  }
                }
              },

              updateItem = function (item) {
                var $item = $('#p' + item.id, $posts);

                if ($item.length) {
                  $item = buildItem(item, $item);

                  if ($item) {
                    // TODO: Show update animation effect here instead of fadeIn
                    $item.hide().fadeIn(400);
                  }
                } else {
                  // If item is pending, overwrite its object
                  modifyPendingUpdate(item.id, item);
                }
              },

              deleteItem = function (item) {
                var $item = $('#p' + item.id, $posts);

                if ($item.length) {
                  $item.fadeOut(400, 'swing', function () {
                    $item.remove();
                  });
                } else {
                  // If item is pending, delete it from the list
                  modifyPendingUpdate(item.id, null);
                }
              },

              addItems = function (items) {

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
              },

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

              goToItem = function (id) {
                var $post = $('#p' + id, $posts);

                if ($post.length) {
                  // Scroll to top of this post
                  $posts.scrollTop($post.get(0).offsetTop);
                }
              },

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

              /* Return a Tweet Button according to the specs here:
               * https://twitter.com/about/resources/buttons#tweet
               */
              makeTweetButton = function (id, text) {
                var href = options.url + window.location.pathname.substring(1, window.location.pathname.length),
                  $tweetButton = $('<a />', {
                    'data-count': 'none',
                    'data-text': '"' + text + '"',
                    'data-url': href + '#p' + id,
                    'href': 'https://twitter.com/share',
                    'class': 'twitter-share-button'
                  });

                return $tweetButton;
              },

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

              onPausedButtonClicked = function (event) {
                var $button = $(event.target);

                if (paused) {
                  start();
                  $button.text('Pause');
                } else {
                  stop();
                  $button.text('Resume');
                }
              },

              start = function () {
                $this.liveBlogLiteApi('play');
                paused = false;
              },

              stop = function () {
                $this.liveBlogLiteApi('pause');
                paused = true;
              },

              /**
               * Setup the slider controls parameters, update position
               */
              initSlider = function () {
                if ($slider) {
                  // Set the min and max values
                  $slider.slider('option', {
                    min: beginTime,
                    max: endTime
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
               * Set the slider's value, which set's its position, and update the label
               */
              setSliderValue = function (value) {
                if ($slider) {
                  $slider.slider('value', value);
                  updateSliderLabel();
                }
              },

              /**
               * Return the top most visible post item in the scrollable container
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

                  setSliderValue($topItem.data('date'));
                }
              },

              /**
               * As slider is moving, update the label and scroll position
               */
              onSliderMove = function (event, ui) {
                updateSliderLabel(ui.value);

                var $item = getNearestItemByTime(ui.value);
                if ($item) {
                  goToItem($item.attr('id').substr(1));
                }
              };

            // Setup the UI structure

            $this.addClass('lb');

            if (options.toolbarEnabled) {
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
                      text: 'Calculating...'
                    }),
                    $slider = $('<div />', {
                      'class': 'lb-timeline-slider'
                    })
                  )
                )
              );

              $slider.slider({
                slide: onSliderMove
              });
            }

            $posts = $('<div />', {
              'class': 'lb-post-container'
            })
            .appendTo($this)
            .scroll(onContainerScroll);

            // Bind to API events
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
            });
            
            // If not alive, or reached end time
            if (options.alive === false || (options.end && options.end <= new Date())) {
              $('.lb-pause-button', $this).hide();
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

            paused = false;

          });

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
