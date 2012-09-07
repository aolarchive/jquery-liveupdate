(function ($) {

    $.fn.liveBlogUi = function (customOptions) {

        var defaultOptions = {
                postId: null,
                url: null
            },

            $this = $(this),

            liveBlogUi = function (customOptions) {

                if ($.fn.liveBlogApi) {

                    var options = $.extend(true, {}, defaultOptions, customOptions),

                        buildItem = function (item, element) {
                            var data = item.content,
                                type = item.type,
                                id = item.id,
                                caption = item.caption,
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
                                    }),
                                    $('<span />', {
                                        text: timestampString,
                                        'class': 'lb-post-timestamp'
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
                                    }),
                                    $('<span />', {
                                        text: timestampString,
                                        'class': 'lb-post-timestamp'
                                    })
                                );
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

                    $this.liveBlogApi(options);

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
            liveBlogUi(customOptions);
        });

    };

})(jQuery);
