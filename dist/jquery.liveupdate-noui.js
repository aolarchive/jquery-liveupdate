/*! Get Dynamic Image Src - v0.1.0 - 2012-10-09
* Copyright (c) 2012 Dave Artz; Licensed MIT, GPL */

(function ($) {

  "use strict";

  $.getDynamicImageSrc = function (photoSrc, photoWidth, photoHeight, thumbnail, settings) {

    var options, dimensions, action, modifiers;

    photoWidth = photoWidth || '';
    photoHeight = photoHeight || '';

    if (typeof thumbnail === "object") {
      settings = thumbnail;
    }

    $.extend(options = {}, {
      action: 'resize',
      format: null,
      quality: 85
    }, settings);

    dimensions = photoWidth + "x" + photoHeight;
    action = (thumbnail && typeof thumbnail !== "object") ? "thumbnail" : options.action;
    modifiers = "/quality/" + options.quality;

    if (options.crop) {
      dimensions += "+" + (options.crop.x || 0) + "+" + (options.crop.y || 0);
    }

    if (options.format) {
      modifiers += "/format/" + options.format;
    }

    return "http://o.aolcdn.com/dims-global/dims3/GLOB/" + action + "/" + dimensions + modifiers + "/" + photoSrc;
  };

}(jQuery));

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
/*!
 * jQuery imagesLoaded plugin v2.1.0
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

;(function($, undefined) {
'use strict';

// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

})(jQuery);
/**
 * AOL Live Update API Widget
 *
 * @fileOverview A slim API to fetch data from AOL liveblogs.
 *
 * @see https://github.com/aol/jquery-liveupdate
 * @author Nate Eagle, Jeremy Jannotta
 * @requires jQuery 1.5.2+
 */

(function ($) {

  $.fn.liveUpdateApi = function (method) {

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
        // Probably shouldn't be changed
        callbackPrefix: 'LB_U',

        // The domain of the blog, i.e. http://aol.com
        url: null,

        // The id of the live blog post, i.e. 20317028
        postId: null,

        // Send image beacon calls to Blogsmith to track traffic
        trafficPing: true,

        // Reference to alternate function to execute the fetch, for simulating data, for instance
        fetch: null,

        // Manually specify an interval for polling in seconds - it unset, takes the
        // recommendation from Blogsmith, which is 3 seconds
        pollInterval: null,

        // If jQuery Sonar is present, pause update polls if the container
        // is off-screen.
        sonar: true
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
          now = new Date(),
          postStatus = null;

        // Determine postStatus based on response
        if (String(response.status).toLowerCase() === 'error') {
          postStatus = 'disabled';
        } else if (response.int === 0 && response.last_update === 0) {
          postStatus = 'notstarted';
        } else if (response.int === 0 && response.last_update > 0) {
          postStatus = 'completed';
        } else {
          postStatus = 'live';
        }
        
        // Trigger a 'status' event whenever postStatus changes
        if (state.postStatus !== postStatus) {
          state.postStatus = postStatus;
          $this.trigger({ type: 'status', status: postStatus });
        }
        
        if (state.options.pollInterval) {
          delay = state.options.pollInterval * 1000;
        } else {
          // If response.int is greater than zero, use it as the
          // recommended number of seconds to delay the poll
          if (response.int > 0) {
            delay = response.int * 1000;
          }
        }

        if (response.last_update === state.lastUpdate) {
          state.count += 1;
        } else if (response.last_update > state.lastUpdate) {
          state.lastUpdate = response.last_update;
          state.count = 0;
        }

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

            if (state.options.sonar) {
              $this.bind('scrollin', function (event) {
                // Turn polling on when the element is visible
                methods.live();
              });

              $this.bind('scrollout', function (event) {
                // Turn polling off when the element is offscreen
                methods.die();
              });
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
            callback = options.callbackPrefix + state.lastUpdate + '_C' + state.count;

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
              cache: true,
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
         * @example $('#somediv').liveUpdateApi('pause');
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
         * @example $('#somediv').liveUpdateApi('play');
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
         * Dimension restrictions for thumbnail images. If dims is true, uses  
         * this for resizing; else if thumbnails is false, uses this for setting 
         * max-width and max-height CSS.
         * @type Object
         */
        thumbnailDimensions: {
          height: 100,
          width: null
        },
        /**
         * Filter of which files to exclude from thumbnail generation - only
         * applicable when thumbnails is true. Should be a comma-separated list
         * of file patterns, that when matched against an image url, will not
         * generate a thumbnail.
         * @type String
         * @default null
         */
        thumbnailExcludeFilter: null,
        /**
         * Display only the recent n posts
         * @type Number
         */
        postLimit: null,
        /**
         * Set various options for how bloggers are rendered, based on each
         * memberId sent from the server.
         *
         * Example:
         * {
         *   '987654321': {
         *     profileImage: 'http://www.gravatar.com/avatar/some-hash.png',
         *     featured: true
         *   }
         * }
         *
         * @type Object
         */
        memberSettings: null,
        /**
         * Image URL to use as placeholder image before the original image is loaded.
         * @type String
         */
        placeholderImage: 'http://o.aolcdn.com/js/x.gif'
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

          // Normalize the thumbnail exclude filter
          if (options.thumbnailExcludeFilter) {
            options.thumbnailExcludeFilter = $.trim(options.thumbnailExcludeFilter);
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
                  timestampString,
                  imageUrl,
                  fullImageUrl,
                  $image,
                  $tweetButton,
                  tweetText,
                  $postInfo,
                  $commentIcon,
                  $postAuthorTab,
                  $profileImage,
                  isNew = !element,
                  memberSettings = $.extend({
                    profileImage: null,
                    featured: false
                  }, options.memberSettings && options.memberSettings[memberId]);

                // Construct the timestamp
                timestampString = '<a href="#p' + id + '">' + getFormattedDateTime(timestamp) + '</a>';

                // If this author is not featured, add the credit to the timestamp
                if (!memberSettings.featured) {
                  timestampString += ' by <span class="lb-blogger-name">' + item.memberName + '</span>';
                }

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
                  .data('date', item.date.getTime())
                  .toggleClass('lb-featured', memberSettings.featured || false);
                } else {
                  element.empty()
                    .addClass('lb-edited');

                  timestampString = timestampString + ' - edited';
                }
                
                // Default imagesLoaded to false so knows to load images in post item
                element.data('imagesLoaded', false);

                if (type === 'text' || type === 'comment') {
                  element.append(
                    buildTextElement(data, 'lb-post-text')
                  );

                  if (type === 'comment') {
                    element.addClass('lb-comment');

                    element.prepend(
                      $commentIcon = $('<div class="lb-comment-icon"/>')
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
                  if (options.thumbnails && imageThumbnailAllowed(data)) {
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
                    $image = $('<img />', {
                      src: options.placeholderImage, // Placeholder image
                      'data-src': imageUrl || '', // Store url for thumbnail version of the image
                      'data-full-src': fullImageUrl || '', // Store the url for full sized image
                      alt: (caption) ? stripHtml(caption) : '',
                      title: 'Click to view larger',
                      'class': 'lb-pending'
                    }),
                    buildTextElement(caption, 'lb-post-caption')
                  );
                  
                  if (options.thumbnailDimensions && (!options.thumbnails || imageUrl === data)) {
                    $image.css('max-width', options.thumbnailDimensions.width || null);
                    $image.css('max-height', options.thumbnailDimensions.height || null);
                  }
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

                if (memberSettings.profileImage || memberSettings.featured) {
                  $postAuthorTab = $('<span/>', {
                    'class': 'lb-post-author-tab'
                  });

                  // Use a profile image if one has been provided in the settings
                  if (memberSettings.profileImage) {
                    $profileImage = $('<img/>', {
                      'class': 'lb-profile-image lb-pending',
                      src: options.placeholderImage,  // Placeholder image
                      'data-src': memberSettings.profileImage, // Store url for original image
                      alt: '',
                      title: item.memberName
                    }).appendTo($postAuthorTab);
                  }

                  if (memberSettings.featured) {
                    $postAuthorTab.append('<span class="lb-blogger-name">' + item.memberName + '</span>');
                  }
                  
                  if ($commentIcon) {
                    $postAuthorTab.insertAfter($commentIcon);
                  } else {
                    element.prepend($postAuthorTab);
                  }
                }

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
                    // NOTE: Must pass in element to re-render, otherwise scans entire document
                    twttr.widgets.load(element.get(0));
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
               * Return boolean whether the given image url is allowed
               * thumbnail generation, based on options.thumbnailExlcudeFilter.
               * @param {String} url The thumbnail image url
               * @returns {Boolean} Whether to allow thumbnail generation for image
               */
              imageThumbnailAllowed = function (url) {
                var allow = true,
                  filters, pattern;

                if (url && options.thumbnailExcludeFilter) {
                  filters = String(options.thumbnailExcludeFilter).split(/\s*,\s*/i);

                  $.each(filters, function (i, filter) {
                    if (filter) {
                      pattern = new RegExp(filter, 'i');
                      if (pattern.test(url)) {
                        allow = false;
                        return false;
                      }
                    }
                  });
                }

                return allow;
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
               * Check whether a post item is visible in the scroll container.
               * 
               * @param {Element} item The element for the post item
               * @param {Boolean} full Whether to require an item's full 
               *   height to check if visible, versus any part of it; default is false
               * @param {Number} distance The distance in pixels of an item 
               *   to check if visible; only useful if full is false; default is 0
               * @returns {Boolean} Whether the item is considered visible
               */
              isItemVisible = function (item, full, distance) {
                item = $(item);
                full = full != null ? full : false;
                distance = distance != null ? distance : 0;
                
                var containerHeight = $posts.height(),
                  height = item.height(),
                  positionTop = item.position().top,
                  positionBottom = positionTop + height;
                  
                if (full === true) {
                  distance = height;
                }
                /*
                console.log({
                  id: item.attr('id'),
                  height: height,
                  positionTop: positionTop,
                  positionBottom: positionBottom,
                  containerHeight: containerHeight,
                  distance: distance
                });
                */
               
                return (positionBottom > distance && positionTop < (containerHeight - distance));
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
              },
              
              /**
               * Load all images under a DOM container, by setting their 'src' 
               * attributes to the 'data-src' value.
               * 
               * @param {jQuery} container Optional DOM element to serach under 
               *   for images; defaults to .lb-post-container
               */
              loadImages = function (container) {
                container = $(container || $posts);
                
                container.find('img[data-src]').each(function (i, img) {
                  var $img = $(img);
                  $img.attr('src', $img.attr('data-src'))
                    .removeAttr('data-src')
                    .removeClass('lb-pending');
                });
              },
              
              /**
               * Iterate over all post items, and load their images, if they 
               * haven't already loaded.
               */
              onLoadImages = function (event) {
                // Exit if event wasn't initiated by user
                if (event && !event.originalEvent) {
                  return;
                }
                
                $posts.children('.lb-post').each(function (i, item) {
                  var $item = $(item);
                  
                  if (!$item.data('imagesLoaded') && isItemVisible($item)) {
                    loadImages($item);
                    $item.data('imagesLoaded', true);
                  }
                });
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
            .scroll($.throttle(250, onContainerScroll))
            .scroll($.throttle(500, onLoadImages));

            if (options.height && options.height > 0) {
              $posts.height(options.height);
            }

            // Bind to API 'update' events
            $this.bind('update', function (event, data) {
              //console.log('update', event, data);
              var hash = window.location.hash,
                newUnreadItems = 0;

              if (data.updates) {

                if (options.postLimit) {
                  if (options.postLimit < data.updates.length) {
                    data.updates.splice(0, data.updates.length - options.postLimit);
                  }
                }

                // Init the begin time if not set yet
                if (beginTime === 0) {
                  beginTime = (new Date()).getTime();
                }

                // Add items to the DOM
                addItems(data.updates);

                if (options.postLimit) {
                  var posts = $posts.find('.lb-post');

                  if (posts.length > options.postLimit) {
                    var numberToRemove = posts.length - options.postLimit;
                    posts.slice(-numberToRemove).remove();
                  }
                }

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
              
              onLoadImages();

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

          $this.delegate('img:not(.lb-profile-image)', 'click', function (event) {
            var $currentTarget = $(event.currentTarget),
              fullImageUrl = $currentTarget.attr('data-full-src'),
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
