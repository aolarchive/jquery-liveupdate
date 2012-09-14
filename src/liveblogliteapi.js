/*
 * aol.livebloglite
 * https://github.com/aol/liveblog-widget
 *
 * by Nate Eagle & Jeremy Jannotta
 */

(function ($) {

  $.fn.liveBlogLiteApi = function (customOptions) {

    var defaultOptions = {
      callbackPrefix: 'lb_' + new Date().getTime() + '_',
      // The domain of the blog, i.e. http://aol.com
      url : null,
      // The id of the live blog post, i.e. 20317028
      postId : null
    },

      // Store a cached version of our jQuery object
      $this = $(this),

      liveBlogLiteApi = function (customOptions) {

        var lastUpdate = 0,
          count = 0,
          options = $.extend(true, {}, defaultOptions, customOptions),

          fetch = function () {
            // Fetch data from API
            var apiUrl,
              callback = options.callbackPrefix + count;

            // Make sure options.url has a trailing /
            if (options.url.substring(options.url.length - 1) !== '/') {
              options.url += '/';
            }

            // The Blogsmith API uses the 'live-update' pattern,
            // which needs to be defined in the blog's .htaccess
            apiUrl = options.url + 'live-update/' + options.postId + '/' + lastUpdate;

            $.ajax({
              dataType: 'jsonp',
              jsonpCallback: callback,
              url: apiUrl,
              success: function (response) {
                lastUpdate = response.last_update;

                // Call fetch again after the API-recommended
                // number of seconds
                setTimeout(fetch, response.int * 1000);

                count += 1;

                if (response.data && response.members) {
                  $this.trigger('update', normalize(response.data, response.members));
                }
              },
              error: function (response) {
                // Try to restart things in 10 seconds
                setTimeout(fetch, 10000);
              }
            });
          },

          // The API's data has single-letter keys for bandwidth
          // reasons. Let's manually normalize the data into a more
          // human-readable structure.
          normalize = function (data, membersArray) {
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
            };

        fetch();
      };

    return this.each(function () {
      customOptions = customOptions || {};
      liveBlogLiteApi(customOptions);
    });

  };

}(jQuery));
