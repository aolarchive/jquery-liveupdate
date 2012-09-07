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
                            var data = item.d,
                                type = item.type,
                                id = item.id,
                                metaData = item.md,
                                timestamp = new Date(item.t * 1000),
                                memberId = item.m,
                                timestampString = timestamp.toString() + ' by ' + memberId;

                            console.log('type', type);

                            if (!element) {
                                element = $('<p />', {
                                    id: 'p'+id,
                                    'class': 'lb-post'
                                });
                            } else {
                                element.empty();
                            }

                            if (type === 1 || type == 4) {
                                element.append(
                                    $('<span />', {
                                        text:data,
                                        'class': 'lb-post-text'
                                    }),
                                    $('<span />', {
                                        text: timestampString,
                                        'class': 'lb-post-timestamp'
                                    })
                                );
                                
                                if (type == 4) {
                                    element.addClass('lb-comment');
                                }

                            } else if (type == 2) {
                                element.append(
                                    $('<span />', {
                                        text: metaData.caption,
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
                                
                                if (item.type == 4 && item.p) {
                                    $item.insertAfter($('#p'+item.p));
                                } else {
                                    $item.prependTo($this);
                                }
                                
                                $item.fadeIn(400);
                            }
                        },

                        updateItem = function (item) {

                            var $item = $('#p'+item.id, $this);

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

                            var $item = $('#p'+item.id, $this);

                            if ($item.length) {
                                $item.fadeOut(400, 'swing', function (){
                                   $item.remove();
                                });
                            }
                        };

                    $this.liveBlogApi(options);

                    $this.bind('update', function (event, data) {
                        console.log('update', event, data);

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
