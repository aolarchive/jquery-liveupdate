(function ($) {

    $.fn.liveBlogApi = function (customOptions) {

        var defaultOptions = {
                callbackPrefix: 'lb_',
                url : null,
                postId : null
            },

            $this = $(this),

            liveBlogApi = function (customOptions) {

                var lastUpdate = 0,
                    count = 0,
                    options = $.extend(true, {}, defaultOptions, customOptions),

                    fetch = function () {
                        // Fetch data from API
                        var callback = options.callbackPrefix + count,
                            apiUrl = options.url + 'live-update/' + options.postId + '/' + lastUpdate;

                        $.ajax({
                            dataType: 'jsonp',
                            jsonpCallback: callback,
                            url: apiUrl,
                            success: function (response) {
                                lastUpdate = response.last_update;

                                //console.log('response', response);

                                // Call fetch again after the API-recommended
                                // number of seconds
                                setTimeout(fetch, response.int * 1000);

                                // TODO: Figure out why iterating the callback
                                // name is necessary
                                //count += 1;

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

                    normalize = function (data, membersArray) {
                        var i, length, item, items, member,
                            members = {},
                            normalizedData = data,
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

                                    if (item.m) {
                                        item.memberId = item.m;
                                        item.memberName = members[item.memberId].name;
                                        item.memberSlug = members[item.memberId].slug;
                                        delete item.m;
                                    }

                                    if (item.t) {
                                        item.date = new Date(item.t * 1000);
                                        delete item.t;
                                    }

                                    if (item.type) {
                                        item.type = types[item.type] || 'unknown';
                                    }

                                    if (item.d) {
                                        item.content = item.d;
                                        delete item.d;
                                    }

                                    if (item.md && item.md.caption) {
                                        item.caption = item.md.caption || '';
                                        delete item.md.caption;
                                    }

                                    if (item.md && item.md.tags) {
                                        item.tags = item.md.tags || [];
                                        delete item.md.tags;
                                    }
                                }
                            }
                        }

                        //console.log('normalizing', normalizedData);
                        return normalizedData;
                    };

                fetch();
            };

        return this.each(function () {
            customOptions = customOptions || {};
            liveBlogApi(customOptions);
        });

    };

})(jQuery);
