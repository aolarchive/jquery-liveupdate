(function ($) {

    $.fn.liveBlog = function (customOptions) {

        var defaultOptions = {
                callbackPrefix: 'lb_',
                url : null,
                postId : null
            },

            $this = $(this),

            liveBlog = function (customOptions) {

                var lastUpdate = 0,
                    count = 0,
                    options = $.extend(true, {}, defaultOptions, customOptions),
                    fetch = function () {
                        // Fetch data from API
                        var callback = 'foobar_' + count,
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

                                if (response.data) {
                                    $this.trigger('update', response.data);
                                }
                            }
                        });
                    };

                fetch();
            };

        return this.each(function () {
            customOptions = customOptions || {};
            liveBlog(customOptions);
        });

    };

})(jQuery);
