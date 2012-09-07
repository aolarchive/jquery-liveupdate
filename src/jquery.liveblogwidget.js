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
                        
                        buildItem = function (item, element) {
                            var data = item.d,
                                type = item.type,
                                id = item.id,
                                metaData = item.md;

                            console.log('type', type);
                            
                            if (!element) {
                                element = $('<p />', {id: 'p'+id});
                            } else {
                                element.empty();
                            }
                            
                            if (type === 1 || type == 4) {
                                element.append( 
                                    $('<span />', {
                                        text:data, 
                                        'class': 'lb-post-text'
                                    }) 
                                );
                                
                            } else if (type == 2) {
                                element.append( 
                                    $('<span />', {
                                        text: metaData.caption, 
                                        'class': 'lb-post-text'
                                    }), 
                                    $('<img />', {
                                        src: data
                                    }) 
                                );
                            }
                            
                            return element;
                        },
                        
                        addItem = function (item) {
                            
                            var $item = buildItem(item);
                            
                            if ($item) {
                                $item.hide()
                                    .prependTo($this)
                                    .fadeIn(400);
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
    
                    $this.liveBlog(options);
    
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
            liveBlogWidget(customOptions);
        });

    };

})(jQuery);
