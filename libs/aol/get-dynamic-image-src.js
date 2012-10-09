/*! Get Dynamic Image Src - v0.1.0 - 2012-10-09
* Copyright (c) 2012 Dave Artz; Licensed MIT, GPL */

(function ($) {

  "use strict";

  $.getDynamicImageSrc = function (photoSrc, photoWidth, photoHeight, thumbnail, settings) {

    var options, dimensions, action, modifiers;

    photoWidth = photoWidth || '';
    photoHeight = photoHeight || '';

    if (typeof thumbnail === "object") {
      settings = thumbnail;
    }

    $.extend(options = {}, {
      action: 'resize',
      format: null,
      quality: 85
    }, settings);

    dimensions = photoWidth + "x" + photoHeight;
    action = (thumbnail && typeof thumbnail !== "object") ? "thumbnail" : options.action;
    modifiers = "/quality/" + options.quality;

    if (options.crop) {
      dimensions += "+" + (options.crop.x || 0) + "+" + (options.crop.y || 0);
    }

    if (options.format) {
      modifiers += "/format/" + options.format;
    }

    return "http://o.aolcdn.com/dims-global/dims3/GLOB/" + action + "/" + dimensions + modifiers + "/" + photoSrc;
  };

}(jQuery));
