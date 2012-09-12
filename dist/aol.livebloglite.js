/*
 * aol.livebloglite
 * https://github.com/aol/liveblog-widget
 *
 * by Nate Eagle & Jeremy Jannotta
 */

(function ($) {

    $.fn.liveBlogLiteApi = function (customOptions) {

        var defaultOptions = {
                callbackPrefix: 'lb_',
                url : null,
                postId : null
            },

            $this = $(this),

            liveBlogLiteApi = function (customOptions) {

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
            liveBlogLiteApi(customOptions);
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
                url: null
            },

            $this = $(this),

            liveBlogLiteUi = function (customOptions) {

                if ($.fn.liveBlogLiteApi) {

                    var options = $.extend(true, {}, defaultOptions, customOptions),

                        buildItem = function (item, element) {
                            var data = item.content,
                                type = item.type,
                                id = item.id,
                                caption = item.caption,
                                tags = item.tags,
                                //metaData = item.md,
                                timestamp = item.date,
                                memberId = item.memberId,
                                timestampString = getFormattedDateTime(timestamp) + ' by ' + item.memberName;

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
                                    text: timestampString,
                                    'class': 'lb-post-timestamp'
                                })
                            );

                            if (item.tags && item.tags.length) {
                                var tagsList = $('<ul />', {
                                    'class': 'lb-post-tags'
                                })
                                .appendTo(element);

                                $.each(item.tags, function(i, el){
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

                            var $item = buildItem(item);

                            if ($item) {
                                $item.hide();

                                if (item.type === 'comment' && item.p) {
                                    $item.insertAfter($('#p' + item.p));
                                } else {
                                    $item.prependTo($this);
                                }

                                $item.fadeIn(400);
                            }
                        },

                        updateItem = function (item) {

                            var $item = $('#p' + item.id, $this);

                            if ($item.length) {
                                $item = buildItem(item, $item);

                                if ($item) {
                                    // TODO: Show update animation effect here instead of fadeIn
                                    $item.hide()
                                        .fadeIn(400);
                                }
                            }
                        },

                        deleteItem = function (item) {

                            var $item = $('#p' + item.id, $this);

                            if ($item.length) {
                                $item.fadeOut(400, 'swing', function () {
                                    $item.remove();
                                });
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
                        };

                    $this.liveBlogLiteApi(options);

                    $this.addClass('lb');

                    $this.bind('update', function (event, data) {
                        //console.log('update', event, data);

                        $(data.updates).each(function (i, item) {
                            addItem(item);
                        });

                        $(data.changes).each(function (i, item) {
                            updateItem(item);
                        });

                        $(data.deletes).each(function (i, item) {
                            deleteItem(item);
                        });
                    });

                }

            };

        return this.each(function () {
            customOptions = customOptions || {};
            liveBlogLiteUi(customOptions);
        });

    };

}(jQuery));
