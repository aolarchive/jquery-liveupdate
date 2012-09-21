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
        // Set a time for your liveblog to begin
        begin: null,
        // Set a time for your liveblog to end
        end: null,
        // Manually tell your liveblog to be live or not
        // (Does not poll if it's not live)
        alive: true,
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

        live: function () {
          if (state.options.alive === false) {
            methods.fetch();
          }
          state.options.alive = true;
          save();
        },

        die: function () {
          state.options.alive = false;
          save();
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
              // Set the default delay to 3 seconds
              var delay = 3 * 1000;

              // If response.int is greater than zero, use it as the
              // recommended number of seconds to delay the poll
              if (response.int > 0) {
                delay = response.int * 1000;
              }

              state.lastUpdate = response.last_update;

              // Call fetch again after the API-recommended
              // number of seconds
              if (state.options.alive) {
                state.timer = setTimeout(methods.fetch, delay);
              }

              state.count += 1;

              if (response.data) {
                $this.trigger('update', normalize(response.data, response.members));
              }

              // Save state
              save();
            },
            error: function (response) {
              // Try to restart things in 10 seconds
              if (state.options.alive) {
                state.timer = setTimeout(methods.fetch, 10000);
              }

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
