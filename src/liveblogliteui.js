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
        pageSize: 0
      },

      $this = $(this),

      liveBlogLiteUi = function (customOptions) {

        if ($.fn.liveBlogLiteApi) {

          var options = $.extend(true, {}, defaultOptions, customOptions),

            paused = true,
            pageSize = options.pageSize,
            viewSize = pageSize,
            $posts = null,
            $toolbar = null,

            buildItem = function (item, element) {

              var data = item.content,
                type = item.type,
                id = item.id,
                caption = item.caption,
                tags = item.tags,
                timestamp = item.date,
                memberId = item.memberId,
                timestampString = '<a href="#p' + id + '">' + getFormattedDateTime(timestamp) + '</a> by ' + item.memberName;

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

            addItem = function (item) {
              var $item = $('#p' + item.id, $posts);
              
              if (!$item.length) {
                $item = buildItem(item);
  
                if ($item.length) {
                  $item.hide();
  
                  if (item.type === 'comment' && item.p) {
                    $item.insertAfter($('#p' + item.p));
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
              }
            },

            deleteItem = function (item) {
              var $item = $('#p' + item.id, $posts);

              if ($item.length) {
                $item.fadeOut(400, 'swing', function () {
                  $item.remove();
                });
              }
            },            
            
            addItems = function (items, count) {
              console.log(count);
              items = items || [];
              count = count || 0;
              var len = items.length,
                start = 0;
              
              // If count > 0, show only a portion of the items
              if (count > 0) {
                start = Math.max(len - 1 - count, 0);
              }
              
              for (var i = start; i < len; i++) {
                addItem(items[i]);
              }
              
              // Show more button if necessary
              /*
              if (start > 0) {
                $posts.append($('<a />', {
                  'class': 'lb-more-button',
                  text: 'Show more'
                }))
                .bind('click', items, function (event) {
                  event.stopPropagation();
                  $(event.target).remove();
                  
                  viewSize = Math.min(viewSize + pageSize, len);
                  
                  addItems(event.data, viewSize);
                });
              } else {
                $('.lb-more-button', $posts).remove();
              }
              */
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

            onPausedButtonClicked = function (event) {
              var $button = $(event.target);

              if (paused) {
                start();
                $button.text('Pause');
              } else {
                stop();
                $button.text('Play');
              }
            },

            start = function () {
              $this.liveBlogLiteApi('play');
              paused = false;
            },

            stop = function () {
              $this.liveBlogLiteApi('pause');
              paused = true;
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
                .bind('click', $.proxy(onPausedButtonClicked, this))
              )
            );
          }

          $posts = $('<div />', {
            'class': 'lb-post-container'
          })
          .appendTo($this);

          // Bind to API events
          $this.bind('update', function (event, data) {
            //console.log('update', event, data);
            var hash = window.location.hash;

            addItems(data.updates, viewSize);

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
