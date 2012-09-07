(function ($) {

    $.fn.liveBlogApi = function (customOptions) {

        var defaultOptions = {
                callbackPrefix: 'lb_',
                url : null,
                postId : null
            },

            $this = $(this),

            liveBlogApi = function (customOptions) {

                var state = {},
                    lastUpdate = 0,
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

                                if (response.data) {

                                    updateState(response.data);
                                    console.log('State:', state);

                                    //$this.trigger('update', state);
                                    $this.trigger('update', response.data);
                                }
                            }
                        });
                    },

                    alterState = function (data, difference) {
                        var types = { 1: "text", 2: "image", 4: "comment" };

                        for (i = 0, length = data.length; i < length; i += 1) {
                            update = data[i];

                            // Normalize the property names
                            normalizedUpdate = {
                                memberId: update.m,
                                date: new Date(update.t * 1000),
                                difference: difference,
                                type: types[update.type] || 'unknown',
                                content: update.d,
                                tags: update.md && update.md.tags || []
                            };

                            state[update.id] = normalizedUpdate;
                        }
                    },

                    updateState = function (data) {
                        var i, length, item, deletedItem, update, normalizedUpdate;

                        // Reset the difference labels
                        for (item in state) {
                            if (state.hasOwnProperty(item)) {
                                // If the item has been marked for deletion, delete it
                                if (state[item].difference && state[item].difference === 'deleted') {
                                    delete state[item];
                                } else {
                                    delete state[item].difference;
                                }
                            }
                        }

                        // Add new updates
                        if (data.updates && $.isArray(data.updates)) {
                            alterState(data.updates, 'new');
                        }

                        // Make changes
                        if (data.changes && $.isArray(data.changes)) {
                            alterState(data.changes, 'changed');
                        }

                        // Delete updates
                        if (data.deletes && $.isArray(data.deletes)) {
                            for (i = 0, length = data.deletes.length; i < length; i += 1) {
                                deletedItem = data.deletes[i].id;

                                if (state.hasOwnProperty(deletedItem)) {
                                    state[deletedItem].difference = 'deleted';
                                }
                            }
                        }
                    };

                fetch();
            };

        return this.each(function () {
            customOptions = customOptions || {};
            liveBlogApi(customOptions);
        });

    };

})(jQuery);
