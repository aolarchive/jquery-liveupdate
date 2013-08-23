(function ($) {
	
	$(document).ready(function () {
		
		var config = window._lbconfig || {},
		
			$uacLiveBlog = $('#uacLiveBlog')
			
			.width(Math.max(100, config.width))
			
			.liveUpdateUi({
				postId: config.postId,
				url: config.updateUrl,
				toolbarEnabled: false,
				tweetButtons: false,
				tagsEnabled: false,
				imageExpandEnabled: false,
				thumbnailDimensions: {
					height: 100,
					width: 100
				},
				postLimit: 3,
				pollInterval: 5,
				linkParams: config.trackingCode,
				height: Math.max(100, config.height)
			});
			
	});

}(jQuery));