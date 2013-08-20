/**
 * Add some missing behavior, mainly for IE support.
 * 
 * This is needed while our minimum required jQuery version is 1.5.2, 
 * which itself requires older libraries like jQUeryUI 1.8.x, which uses 
 * deprecated or removed items.
 * 
 * And we can't use the jquery-migrate plugin as it requires jq 1.6+.
 * 
 * @todo Remove this shim once our minimum required jq version is 1.6+
 */
(function ($) {
	
	var uaMatch = null;
	
	// Add some missing $.browser properties for IE detection.
	if (!$.browser) {
		uaMatch = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
		
		$.browser = {};
		$.browser.msie = uaMatch.length ? true : false;
		$.browser.version = $.browser.msie ? parseFloat(uaMatch[1], 10) : null;
	}
	
}(jQuery));