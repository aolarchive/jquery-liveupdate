(function ($) {

    $.fn.liveBlogWidget = function (customOptions) {  

        var defaultOptions = {
            
            url : null,
            postId : null,
            pollInterval : 1000
            
        };
        
        var liveBlogWidget = function (customOptions) {
            
            var $this = $(this);
            var options = $.extend(true, {}, defaultOptions, customOptions);
		      
            var fetch = function () {
                // Fetch data from API
            };
            
        };
        
        return this.each(function () {
            
            customOptions = customOptions || {};
            liveBlogWidget(customOptions);
            
        });

    };

})(jQuery);