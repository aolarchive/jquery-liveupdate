/*
 * aol.livebloglite
 * https://github.com/aol/liveblog-widget
 *
 * by Nate Eagle & Jeremy Jannotta
 */

(function ($) {

  $.fn.liveBlogLiteApi = function (method) {

    var $this = this,
      args = arguments,
      defaultOptions = {
        callbackPrefix: 'lb_' + new Date().getTime() + '_',
        // The domain of the blog, i.e. http://aol.com
        url : null,
        // The id of the live blog post, i.e. 20317028
        postId : null
      },
      // Used to store plugin state
      state = $this.data('lbl-state') || {},
      // Save the state object to this element's data
      save = function () {
        $this.data('lbl-state', state);
      },

      methods = {
        init: function (customOptions) {
          state.lastUpdate = state.lastUpdate || 0;
          state.count = state.count || 0;
          state.options = $.extend(true, {}, defaultOptions, customOptions);

          // Save state
          save();

          methods.fetch();
        },

        fetch: function () {
          // Fetch data from API
          var apiUrl,
            state = $this.data('lbl-state'),
            options = state.options,
            callback = options.callbackPrefix + state.count,
            // The API's data has single-letter keys for bandwidth
            // reasons. Let's manually normalize the data into a more
            // human-readable structure.
            normalize = function (data, membersArray) {//{{{
                membersArray = membersArray || [];
                var i, length, item, items, member,
                    members = {},
                    normalizedData = data,
                    // What the update type integer really means
                    types = { 1: 'text', 2: 'image', 4: 'comment' };

                // Create a members object
                for (i = 0, length = membersArray.length; i < length; i += 1) {
                  member = membersArray[i];

                  members[member.m] = {
                    name: member.name,
                    slug: member.slug
                  };
                }

                for (items in normalizedData) {
                  if (normalizedData.hasOwnProperty(items)) {
                    for (i = 0, length = normalizedData[items].length; i < normalizedData[items].length; i += 1) {
                      item = normalizedData[items][i];

                      // Transform m into a member object
                      if (item.m) {
                        item.memberId = item.m;
                        item.memberName = members[item.memberId].name;
                        item.memberSlug = members[item.memberId].slug;
                        delete item.m;
                      }

                      // Transform t (time) into a date object
                      if (item.t) {
                        item.date = new Date(item.t * 1000);
                        delete item.t;
                      }

                      // Give type a meaningful name with a default
                      if (item.type) {
                        item.type = types[item.type] || 'unknown';
                      }

                      // d (data) is our content
                      if (item.d) {
                        item.content = item.d;
                        delete item.d;
                      }

                      // Take caption from md (metadata) and
                      // place it on our item
                      if (item.md && item.md.caption) {
                        item.caption = item.md.caption || '';
                        delete item.md.caption;
                      }

                      // Take tags from md (metadata) and place
                      // them on our item
                      if (item.md && item.md.tags) {
                        item.tags = item.md.tags || [];
                        delete item.md.tags;
                      }
                    }
                  }
                }

                return normalizedData;
              };//}}}

          // Make sure options.url has a trailing slash
          if (options.url.substring(options.url.length - 1) !== '/') {
            options.url += '/';
          }

          // The Blogsmith API uses the 'live-update' pattern,
          // which needs to be defined in the blog's .htaccess
          apiUrl = options.url + 'live-update/' + options.postId + '/' + state.lastUpdate;

          $.ajax({
            dataType: 'jsonp',
            jsonpCallback: callback,
            url: apiUrl,
            success: function (response) {
              state.lastUpdate = response.last_update;

              // Call fetch again after the API-recommended
              // number of seconds
              state.timer = setTimeout(methods.fetch, response.int * 1000);

              state.count += 1;

              if (response.data) {
                $this.trigger('update', normalize(response.data, response.members));
              }

              // Save state
              save();
            },
            error: function (response) {
              // Try to restart things in 10 seconds
              state.timer = setTimeout(methods.fetch, 10000);

              // Save state
              save();
            }
          });
        },

        // Allow updates to be paused or unpaused
        // $('#somediv').liveBlogLiteApi('pause');
        pause: function () {
          state.paused = true;
          clearTimeout(state.timer);

          // Save state
          save();
        },

        play: function () {
          state.paused = false;
          methods.fetch();

          // Save state
          save();
        }

      };

    return this.each(function () {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, args);
      } else {
        $.error('Method ' + method + ' does not exist on jQuery.liveBlogApi.');
      }
    });

  };

}(jQuery));

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

          var options = $.extend(true, {}, defaultOptions, customOptions),

            paused = true,
            pageSize = options.pageSize,
            pendingUpdates = [],
            beginTime = null,
            endTime = null,
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
                tweetText;

              //console.log('type', type);

              if (!element) {
                element = $('<p />', {
                  id: 'p' + id,
                  'class': 'lb-post'
                });
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
                  $('<span />', {
                    text: caption,
                    'class': 'lb-post-caption'
                  }),
                  $('<img />', {
                    src: data,
                    height: 100
                  })
                );
              }

              element.append(
                $('<span />', {
                  html: timestampString,
                  'class': 'lb-post-timestamp'
                })
              );

              if (options.tweetButtons) {
                // Make the tweet button
                tweetText = caption || data;
                $tweetButton = makeTweetButton(id, data);

                // Bind a just-in-time load of the tweet button
                element.bind('mouseenter', function (event) {
                  // Unbind the load event once it's been triggered
                  element.unbind('mouseenter');
                  element.find('.lb-post-timestamp')
                    .append($tweetButton);

                  // Re-render tweet buttons
                  // https://dev.twitter.com/discussions/6860
                  twttr.widgets.load();
                });

              }

              if (item.tags && item.tags.length) {
                var tagsList = $('<ul />', {
                  'class': 'lb-post-tags'
                }).appendTo(element);

                $.each(item.tags, function (i, el) {
                  tagsList.append(
                    $('<li />', {
                      text: el
                    })
                  );
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
                addItem(item);
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
                // Do something to go to the relevant post!
                // Scrollto, etc.
              }
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

            updateSlider = function () {
              if ($slider) {
                $slider.slider('option', {
                  min: beginTime,
                  max: endTime
                });
              }
            },

            updateSliderLabel = function (value) {
              if ($slider) {
                value = value || $slider.slider('value');

                var timeObj = new Date(value),
                  timeStr = getFormattedDateTime(timeObj);

                $('.lb-timeline-label', $toolbar).text(timeStr);
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
                    text: ' '
                  }),
                  $slider = $('<div />', {
                    'class': 'lb-timeline-slider'
                  })
                )
              )
            );

            $slider.slider({
              slide: function (event, ui) {
                updateSliderLabel(ui.value);
              }
            });
          }

          $posts = $('<div />', {
            'class': 'lb-post-container'
          })
          .appendTo($this);

          // Bind to API events
          $this.bind('update', function (event, data) {
            //console.log('update', event, data);
            var hash = window.location.hash;

            if (data.updates) {
              var updates = data.updates,
                updatesLen = data.updates.length;

              addItems(updates);

              // Keep track of the data's begin and end times
              if (!beginTime) {
                beginTime = updates[0].date.getTime();
              }
              endTime = Math.max(endTime || 0, updates[updatesLen - 1].date.getTime());

              updateSlider();
              updateSliderLabel();
            }

            $(data.changes).each(function (i, item) {
              updateItem(item);
            });

            $(data.deletes).each(function (i, item) {
              deleteItem(item);
            });

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

          // Set up show / hide of tweet buttons
          if (options.tweetButtons) {

            // Load Twitter Share JS
            // Script taken from Twitter, but linted
            // https://twitter.com/about/resources/buttons#tweet
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
          paused = false;

        }

      };

    return this.each(function () {
      customOptions = customOptions || {};
      liveBlogLiteUi(customOptions);
    });

  };

}(jQuery));
