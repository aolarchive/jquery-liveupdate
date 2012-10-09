/**
 * AOL Liveblog Lite UI Widget
 *
 * @fileOverview A slim API to fetch data from AOL liveblogs.
 *
 * @see https://github.com/aol/liveblog-widget
 * @author Nate Eagle, Jeremy Jannotta
 * @requires jQuery 1.5.2+
 */

(function ($) {

  $.fn.liveBlogLiteApi = function (method) {

    var $this = this,
      args = arguments,
      defaultOptions = {
        // Set a time for your liveblog to begin
        // Should be a valid JavaScript Date object
        begin: null,

        // Set a time for your liveblog to end
        // Should be a valid JavaScript Date object
        end: null,

        // Manually tell your liveblog to be live or not
        // (Does not poll if it's not live)
        alive: true,

        // Callback prefix to use for the JSONP call
        callbackPrefix: 'lb_' + new Date().getTime() + '_',

        // The domain of the blog, i.e. http://aol.com
        url: null,

        // The id of the live blog post, i.e. 20317028
        postId: null,

        // Send image beacon calls to Blogsmith to track traffic
        trafficPing: true,
        
        // Reference to alternate function to execute the fetch, for simulating data, for instance
        fetch: null
      },

      // Used to store plugin state
      state = $this.data('lbl-state') || {},

      /**
       * Save the state object to this element's data
       */
      save = function () {
        $this.data('lbl-state', state);
      },
      
      /**
       * The API's data has single-letter keys for bandwidth reasons. We
       * manually normalize the data into a more human-readable
       * structure.
       * @param {Object} data Object data from the API
       * @param {Array} membersArray An array of members (bloggers) from
       * the API
       */
      normalize = function (data, membersArray) {
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
      },
      
      /**
       * Success handler for all fetch requests
       * @param {Object} response The raw data object returned in the fetch request 
       */
      onFetchSuccess = function (response) {
        // Set the default delay to 3 seconds
        var delay = 3 * 1000,
          now = new Date();

        // If response.int is greater than zero, use it as the
        // recommended number of seconds to delay the poll
        if (response.int > 0) {
          delay = response.int * 1000;
        }

        state.lastUpdate = response.last_update || 0;

        // Call fetch again after the API-recommended
        // number of seconds
        if (state.options.alive) {
          if (!state.options.end || state.options.end > now) {

            state.timer = setTimeout(methods.fetch, delay);

          } else {
            if (state.options.end && state.options.end <= now) {
              state.options.alive = false;
              $this.trigger('end');
            }
          }
        }

        state.count += 1;

        if (response.data) {
          // If this is the first update, trigger the begin event
          if (state.first === true) {
            delete state.first;
            $this.trigger('begin');
          }

          $this.trigger('update', normalize(response.data, response.members));
        }

        // Save state
        save();
      },
      
      /**
       * Error handler for all fetch requests
       * @param {Object} response The raw data object returned in the fetch request 
       */
      onFetchError = function (response) {
        // Try to restart things in 10 seconds
        if (state.options.alive) {
          state.timer = setTimeout(methods.fetch, 10000);
        }

        // Save state
        save();
      },

      methods = {
        /**
         * Initialize the liveblog api
         * @param {Object} customOptions Custom plugin options
         */
        init: function (customOptions) {
          var timeToBegin;

          // Only initialize this object once
          if (typeof($this.data('lbl-state')) === 'undefined') {

            state.lastUpdate = state.lastUpdate || 0;
            state.count = state.count || 0;
            state.options = $.extend(true, {}, defaultOptions, customOptions);

            // Make sure options.url has a trailing slash
            if (state.options.url && state.options.url.substring(state.options.url.length - 1) !== '/') {
              state.options.url += '/';
            }

            // Save state
            save();

            timeToBegin = function () {
              var now = new Date();

              if (state.options.begin) {
                if (state.options.begin < now) {
                  //$this.trigger('begin');
                  state.first = true;
                  methods.trafficPing();
                  methods.fetch();
                } else {
                  // Wait 10 seconds, then check again
                  state.timer = setTimeout(timeToBegin, 10000);
                }
              } else {
                state.first = true;
                //$this.trigger('begin');
                methods.fetch();
              }
            };

            timeToBegin();
          }
        },

        /**
         * Resume updating from the liveBlogApi
         */
        live: function () {
          if (state.options.alive === false) {
            methods.fetch();
          }
          state.options.alive = true;
          save();
        },

        /**
         * Kill all updating from the liveBlogApi
         */
        die: function () {
          state.options.alive = false;
          // Turn off traffic pinging
          methods.trafficPing(false);
          save();
        },

        /**
         * Reset the API to refetch all the data
         */
        reset: function () {
          state.count = 0;
          state.lastUpdate = 0;
          state.options.callbackPrefix = 'lb_' + new Date().getTime() + '_';
          clearTimeout(state.timer);
          methods.fetch();
        },

        /**
         * Hit the Blogsmith liveupdates API and trigger an update event with
         * the returned data
         **/
        fetch: function () {
          // Fetch data from API
          var apiUrl,
            state = $this.data('lbl-state'),
            options = state.options,
            callback = options.callbackPrefix + state.count;

          // If the trafficPing option is set to true and there's not currently
          // a setInterval stored on the state object, start pinging
          if (options.trafficPing && !state.trafficPing) {
            methods.trafficPing();
          }
          
          if (!options.fetch) {
            // The Blogsmith API uses the 'live-update' pattern in the URL which
            // needs to be defined in the blog's .htaccess
            apiUrl = options.url + 'live-update/' + options.postId + '/' + state.lastUpdate;
  
            $.ajax({
              dataType: 'jsonp',
              jsonpCallback: callback,
              url: apiUrl,
              success: onFetchSuccess,
              error: onFetchError
            });
          } else {
            options.fetch(state, onFetchSuccess, onFetchError);
          }
        },

        /**
         * Pause updates
         * @example $('#somediv').liveBlogLiteApi('pause');
         */
        pause: function () {
          state.paused = true;
          clearTimeout(state.timer);
          methods.trafficPing(false);

          // Save state
          save();
        },

        /**
         * Resume updates
         * @example $('#somediv').liveBlogLiteApi('play');
         */
        play: function () {
          state.paused = false;
          methods.fetch();

          // Save state
          save();
        },

        /**
         * Start / stop regular pinging of a traffic URL for analytics
         * @param {Boolean} start True by default. False stops traffic beacon.
         */
        trafficPing: function (start) {
          // Ping the traffic URL every thirty seconds
          var imageBeacon,
            interval = 30 * 1000,
            postId = state.options.postId,
            postUrl = encodeURIComponent(window.location.pathname);

          // Turn pinger on (true) or off (false)
          if (start !== false) {
            start = true;
          }

          if (start === true && !state.trafficPing) {
            state.trafficPing = setInterval(function () {
              imageBeacon = new Image();

              // Fire a beacon without Ajax! h/t Dave Artz
              imageBeacon.src = state.options.url + 'traffic/?t=js&bv=&os=' + postId + '&tz=&lg=&rv=&rsv=&pw=' + postUrl + '&cb=';

            }, interval);
          } else if (start === false) {
            clearInterval(state.trafficPing);
            delete state.trafficPing;
          }
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
