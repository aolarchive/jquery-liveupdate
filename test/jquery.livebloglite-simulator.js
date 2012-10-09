/**
 * AOL Liveblog Lite Simulator
 *
 * @fileOverview Collection of fetch functions to simulate different data 
 * patterns without requiring the Blogsmith back-end. Mainly useful for 
 * testing the widget's UI and user experience.
 * 
 * Example usage:
 * $('#myLiveBlog').liveBlogLiteUi({
 *   fetch: $.liveBlogLiteSimulator('fetchOne')
 * });
 *
 * @see https://github.com/aol/liveblog-widget
 * @requires jQuery 1.5.2+, LiveBlogLite
 */
(function ($) {

  $.liveBlogLiteSimulator = function (method) {
      
    var simulatorId = 1000000000,
      simulatorName = 'LiveBlogLite Simulator',
      simulatorSlug = 'livebloglite-simulator',
      
      methods = {
        fetchOne : function (state, onSuccess, onError) {
          var lastUpdate = state.lastUpdate + 1,
            data = {
              int: 3,
              status: 'ok',
              last_update: lastUpdate,
              data: {
                updates: [
                  {
                    id: lastUpdate,
                    t: parseInt((new Date()).getTime() / 1000, 10),
                    m: simulatorId,
                    type: 1,
                    d: 'This is a test of the LiveBlogLite Simulator.',
                    md: {
                      tags: []
                    }
                  }
                ]
              },
              members: [
                {
                  m: simulatorId,
                  name: simulatorName,
                  slug: simulatorSlug
                }
              ]
            };
          onSuccess(data);
        }
      };
    
    if (method && methods[method]) {
      return methods[method];
    } else {
      return null;
    }
  };
  
}(jQuery));