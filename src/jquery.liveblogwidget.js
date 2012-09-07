(function ($) {

    $.fn.liveBlogWidget = function (customOptions) {

        var defaultOptions = {
                postId: null,
                url: null
            },
            
            $this = $(this),

            liveBlogWidget = function (customOptions) {
                
                if ($.fn.liveBlog) {
                
                    var options = $.extend(true, {}, defaultOptions, customOptions),
                
                        createItem = function (item) {
                            var data = item.d,
                                type = item.type,
                                id = item.id,
                                $item = null;
        
                            console.log('type', type);
                            if (type === 1) {
                                $item = $('<p />', {
                                    text: data,
                                    id: 'p'+id
                                });
                            }
                            
                            if ($item) {
                                $item.hide()
                                    .prependTo($this)
                                    .fadeIn(400);
                            }
                        },
                        
                        updateItem = function (item) {
                            var data = item.d,
                                type = item.type,
                                id = item.id,
                                $item = $('#p'+id, $this);
                            
                            if ($item.length) {
                                if (type === 1) {
                                    $item.html(data);
                                }
                                
                                if ($item) {
                                    // TODO: Show update animation effect here instead of fadeIn
                                    $item.hide()
                                        .fadeIn(400);
                                }
                            }
                        };
    
                    $this.liveBlog(options);
    
                    $this.bind('update', function (event, data) {
                        console.log('update', event, data);
                        
                        $(data.updates).each(function (i, item) {
                            createItem(item);
                        });
                        
                        $(data.changes).each(function (i, item) {
                            updateItem(item);
                        });
                    });
                    
                }
                
            };

        return this.each(function () {
            customOptions = customOptions || {};
            liveBlogWidget(customOptions);
        });

    };

})(jQuery);
