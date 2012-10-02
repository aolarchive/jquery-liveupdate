/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.23",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.curCSS||(a.curCSS=a.css),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.slider.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=5;a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var b=this,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=d.values&&d.values.length||1,h=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(d.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),d.range&&(d.range===!0&&(d.values||(d.values=[this._valueMin(),this._valueMin()]),d.values.length&&d.values.length!==2&&(d.values=[d.values[0],d.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(d.range==="min"||d.range==="max"?" ui-slider-range-"+d.range:"")));for(var i=e.length;i<g;i+=1)h.push(f);this.handles=e.add(a(h.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){d.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){d.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"))}).blur(function(){a(this).removeClass("ui-state-focus")}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)}),this.handles.keydown(function(d){var e=a(this).data("index.ui-slider-handle"),f,g,h,i;if(b.options.disabled)return;switch(d.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:d.preventDefault();if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),f=b._start(d,e);if(f===!1)return}}i=b.options.step,b.options.values&&b.options.values.length?g=h=b.values(e):g=h=b.value();switch(d.keyCode){case a.ui.keyCode.HOME:h=b._valueMin();break;case a.ui.keyCode.END:h=b._valueMax();break;case a.ui.keyCode.PAGE_UP:h=b._trimAlignValue(g+(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(g-(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g===b._valueMax())return;h=b._trimAlignValue(g+i);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g===b._valueMin())return;h=b._trimAlignValue(g-i)}b._slide(d,e,h)}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,d),b._change(c,d),a(this).removeClass("ui-state-active"))}),this._refreshValue(),this._animateOff=!1},destroy:function(){return this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options,d,e,f,g,h,i,j,k,l;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),d={x:b.pageX,y:b.pageY},e=this._normValueFromMouse(d),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b)}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i])),j=this._start(b,i),j===!1?!1:(this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),k=g.offset(),l=!a(b.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:b.pageX-k.left-g.width()/2,top:b.pageY-k.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e),this._animateOff=!0,!0))},_mouseStart:function(a){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1},_mouseStop:function(a){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;return this.orientation==="horizontal"?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),this.orientation==="vertical"&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};return this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c,!0))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);return}return this._value()},values:function(b,c){var d,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);return}if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();d=this.options.values,e=arguments[0];for(f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()},_setOption:function(b,c){var d,e=0;a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(d=0;d<e;d+=1)this._change(null,d);this._animateOff=!1}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a),a},_values:function(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b),b;c=this.options.values.slice();for(d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return Math.abs(c)*2>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,d=this,e=this._animateOff?!1:c.animate,f,g={},h,i,j,k;this.options.values&&this.options.values.length?this.handles.each(function(b,i){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",a(this).stop(1,1)[e?"animate":"css"](g,c.animate),d.options.range===!0&&(d.orientation==="horizontal"?(b===0&&d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({width:f-h+"%"},{queue:!1,duration:c.animate})):(b===0&&d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({height:f-h+"%"},{queue:!1,duration:c.animate}))),h=f}):(i=this.value(),j=this._valueMin(),k=this._valueMax(),f=k!==j?(i-j)/(k-j)*100:0,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",this.handle.stop(1,1)[e?"animate":"css"](g,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[e?"animate":"css"]({width:100-f+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[e?"animate":"css"]({height:100-f+"%"},{queue:!1,duration:c.animate}))}}),a.extend(a.ui.slider,{version:"1.8.23"})})(jQuery);;
/**
 * AOL Liveblog Lite UI Widget
 *
 * @fileOverview A slim API to fetch data from AOL liveblogs.
 *
 * @see https://github.com/aol/liveblog-widget
 * @author Nate Eagle, Jeremy Jannotta
 * @requires jQuery 1.5.2+
 */

(function ($) {

  $.fn.liveBlogLiteApi = function (method) {

    var $this = this,
      args = arguments,
      defaultOptions = {
        // Set a time for your liveblog to begin
        // Should be a valid JavaScript Date object
        begin: null,

        // Set a time for your liveblog to end
        // Should be a valid JavaScript Date object
        end: null,

        // Manually tell your liveblog to be live or not
        // (Does not poll if it's not live)
        alive: true,

        // Callback prefix to use for the JSONP call
        callbackPrefix: 'lb_' + new Date().getTime() + '_',

        // The domain of the blog, i.e. http://aol.com
        url: null,

        // The id of the live blog post, i.e. 20317028
        postId: null,

        // Send image beacon calls to Blogsmith to track traffic
        trafficPing: true
      },

      // Used to store plugin state
      state = $this.data('lbl-state') || {},

      /**
       * Save the state object to this element's data
       */
      save = function () {
        $this.data('lbl-state', state);
      },

      methods = {
        /**
         * Initialize the liveblog api
         * @param {Object} customOptions Custom plugin options
         */
        init: function (customOptions) {
          var timeToBegin;

          // Only initialize this object once
          if (typeof($this.data('lbl-state')) === 'undefined') {

            state.lastUpdate = state.lastUpdate || 0;
            state.count = state.count || 0;
            state.options = $.extend(true, {}, defaultOptions, customOptions);

            // Make sure options.url has a trailing slash
            if (state.options.url.substring(state.options.url.length - 1) !== '/') {
              state.options.url += '/';
            }

            // Save state
            save();

            timeToBegin = function () {
              var now = new Date();

              if (state.options.begin) {
                if (state.options.begin < now) {
                  $this.trigger('begin');
                  methods.trafficPing();
                  methods.fetch();
                } else {
                  // Wait 10 seconds, then check again
                  state.timer = setTimeout(timeToBegin, 10000);
                }
              } else {
                $this.trigger('begin');
                methods.fetch();
              }
            };

            timeToBegin();
          }
        },

        /**
         * Resume updating from the liveBlogApi
         */
        live: function () {
          if (state.options.alive === false) {
            methods.fetch();
          }
          state.options.alive = true;
          save();
        },

        /**
         * Kill all updating from the liveBlogApi
         */
        die: function () {
          state.options.alive = false;
          // Turn off traffic pinging
          methods.trafficPing(false);
          save();
        },

        /**
         * Reset the API to refetch all the data
         */
        reset: function () {
          state.count = 0;
          state.lastUpdate = 0;
          state.options.callbackPrefix = 'lb_' + new Date().getTime() + '_';
          clearTimeout(state.timer);
          console.log(state.timer);
          methods.fetch();
        },

        /**
         * Hit the Blogsmith liveupdates API and trigger an update event with
         * the returned data
         **/
        fetch: function () {
          console.log('fetch');
          // Fetch data from API
          var apiUrl,
            now = new Date(),
            state = $this.data('lbl-state'),
            options = state.options,
            callback = options.callbackPrefix + state.count,
            /**
             * The API's data has single-letter keys for bandwidth reasons. We
             * manually normalize the data into a more human-readable
             * structure.
             * @param {Object} data Object data from the API
             * @param {Array} membersArray An array of members (bloggers) from
             * the API
             */
            normalize = function (data, membersArray) {
                membersArray = membersArray || [];
                var i, length, item, items, member,
                    members = {},
                    normalizedData = data,
                    // What the update type integer really means
                    types = { 1: 'text', 2: 'image', 4: 'comment' };

                // Create a members object
                for (i = 0, length = membersArray.length; i < length; i += 1) {
                  member = membersArray[i];

                  members[member.m] = {
                    name: member.name,
                    slug: member.slug
                  };
                }

                for (items in normalizedData) {
                  if (normalizedData.hasOwnProperty(items)) {
                    for (i = 0, length = normalizedData[items].length; i < normalizedData[items].length; i += 1) {
                      item = normalizedData[items][i];

                      // Transform m into a member object
                      if (item.m) {
                        item.memberId = item.m;
                        item.memberName = members[item.memberId].name;
                        item.memberSlug = members[item.memberId].slug;
                        delete item.m;
                      }

                      // Transform t (time) into a date object
                      if (item.t) {
                        item.date = new Date(item.t * 1000);
                        delete item.t;
                      }

                      // Give type a meaningful name with a default
                      if (item.type) {
                        item.type = types[item.type] || 'unknown';
                      }

                      // d (data) is our content
                      if (item.d) {
                        item.content = item.d;
                        delete item.d;
                      }

                      // Take caption from md (metadata) and
                      // place it on our item
                      if (item.md && item.md.caption) {
                        item.caption = item.md.caption || '';
                        delete item.md.caption;
                      }

                      // Take tags from md (metadata) and place
                      // them on our item
                      if (item.md && item.md.tags) {
                        item.tags = item.md.tags || [];
                        delete item.md.tags;
                      }
                    }
                  }
                }

                return normalizedData;
              };

          // If the trafficPing option is set to true and there's not currently
          // a setInterval stored on the state object, start pinging
          if (options.trafficPing && !state.trafficPing) {
            methods.trafficPing();
          }

          // The Blogsmith API uses the 'live-update' pattern in the URL which
          // needs to be defined in the blog's .htaccess
          apiUrl = options.url + 'live-update/' + options.postId + '/' + state.lastUpdate;

          $.ajax({
            dataType: 'jsonp',
            jsonpCallback: callback,
            url: apiUrl,
            success: function (response) {
              // Set the default delay to 3 seconds
              var delay = 3 * 1000;

              // If response.int is greater than zero, use it as the
              // recommended number of seconds to delay the poll
              if (response.int > 0) {
                delay = response.int * 1000;
              }

              state.lastUpdate = response.last_update;

              // Call fetch again after the API-recommended
              // number of seconds
              if (options.alive) {
                if (!options.end || options.end > now) {

                  state.timer = setTimeout(methods.fetch, delay);

                } else {
                  if (options.end && options.end <= now) {
                    options.alive = false;
                    $this.trigger('end');
                  }
                }
              }

              state.count += 1;

              if (response.data) {
                $this.trigger('update', normalize(response.data, response.members));
              }

              // Save state
              save();
            },
            error: function (response) {
              // Try to restart things in 10 seconds
              if (state.options.alive) {
                state.timer = setTimeout(methods.fetch, 10000);
              }

              // Save state
              save();
            }
          });
        },

        /**
         * Pause updates
         * @example $('#somediv').liveBlogLiteApi('pause');
         */
        pause: function () {
          state.paused = true;
          clearTimeout(state.timer);
          methods.trafficPing(false);

          // Save state
          save();
        },

        /**
         * Resume updates
         * @example $('#somediv').liveBlogLiteApi('play');
         */
        play: function () {
          state.paused = false;
          methods.fetch();

          // Save state
          save();
        },

        /**
         * Start / stop regular pinging of a traffic URL for analytics
         * @param {Boolean} start True by default. False stops traffic beacon.
         */
        trafficPing: function (start) {
          // Ping the traffic URL every thirty seconds
          var imageBeacon,
            interval = 30 * 1000,
            postId = state.options.postId,
            postUrl = encodeURIComponent(window.location.pathname);

          // Turn pinger on (true) or off (false)
          if (start !== false) {
            start = true;
          }

          if (start === true && !state.trafficPing) {
            state.trafficPing = setInterval(function () {
              imageBeacon = new Image();

              // Fire a beacon without Ajax! h/t Dave Artz
              imageBeacon.src = state.options.url + 'traffic/?t=js&bv=&os=' + postId + '&tz=&lg=&rv=&rsv=&pw=' + postUrl + '&cb=';

            }, interval);
          } else if (start === false) {
            clearInterval(state.trafficPing);
            delete state.trafficPing;
          }
        }

      };

    return this.each(function () {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, args);
      } else {
        $.error('Method ' + method + ' does not exist on jQuery.liveBlogApi.');
      }
    });

  };

}(jQuery));

/**
 * AOL Liveblog Lite UI Widget
 *
 * @fileOverview A slim UI widget to publish data from AOL liveblogs.
 *
 * @see https://github.com/aol/liveblog-widget
 * @author Nate Eagle, Jeremy Jannotta
 * @requires $.fn.liveBlogLiteApi
 */

(function ($) {

  $.fn.liveBlogLiteUi = function (customOptions) {

    var defaultOptions = {
        postId: null,
        url: null,
        toolbarEnabled: false,
        pageSize: 0,
        tweetButtons: true,
        height: 0
      },

      $this = $(this),

      liveBlogLiteUi = function (customOptions) {

        if ($.fn.liveBlogLiteApi) {

          var options = $.extend(true, {}, defaultOptions, customOptions),
            hash = window.location.hash;

          // Check the hash for the presence of a tag filter
          // Only one tag may be filtered at a time (currently)
          if (hash.length) {
            var tag,
              start,
              tagPosition = hash.indexOf('tag=');

            if (tagPosition > -1) {
              start = tagPosition + 4;
              tag = hash.substring(start, hash.length);
              tag = decodeURIComponent(tag);

              options.tagFilter = tag;
            }
          }

          // Listen to 'begin' event from API, to initialize and build the widget
          $this.bind('begin', function (event) {

            $this.empty();

            var paused = true,
              pageSize = options.pageSize,
              pendingUpdates = [],
              beginTime = 0,
              endTime = 0,
              $tagAlert = null,
              $clearTagFilter = null,
              $posts = null,
              $toolbar = null,
              $slider = null,
              $status = null,

              /**
               * Create DOM element for post item from the given data item. If
               * element is provided then replaces content of that element,
               * else creates new one.
               * @param {Object} item The data item used as source.
               * @param {Object|null} element The optional jQuery object to modify, instead of creating new one.
               * @returns {Object} The jQuery object built from the data, not yet added to the DOM.
               */
              buildItem = function (item, element) {//{{{

                var data = item.content,
                  type = item.type,
                  id = item.id,
                  caption = item.caption,
                  tags = item.tags,
                  timestamp = item.date,
                  memberId = item.memberId,
                  timestampString = '<a href="#p' + id + '">' + getFormattedDateTime(timestamp) + '</a> by ' + item.memberName,
                  $tweetButton,
                  tweetText,
                  $postInfo;

                //console.log('type', type);

                // If there is a tag filter present...
                if (options.tagFilter && tags) {
                  // If the tag is not present in this item, don't build it
                  if ($.inArray(options.tagFilter, tags) === -1) {
                    // Return an empty array
                    return [];
                  }
                }

                if (!element) {
                  element = $('<p />', {
                    id: 'p' + id,
                    'class': 'lb-post'
                  })
                  .data('date', item.date.getTime());
                } else {
                  element.empty();
                }

                if (type === 'text' || type === 'comment') {
                  element.append(
                    $('<span />', {
                      html: data,
                      'class': 'lb-post-text'
                    })
                  );

                  if (type === 'comment') {
                    element.addClass('lb-comment');
                  }

                } else if (type === 'image') {
                  element.append(
                    $('<img />', {
                      src: data
                    }),
                    $('<span />', {
                      html: caption,
                      'class': 'lb-post-caption'
                    })
                  );
                }

                element.append(
                  $postInfo = $('<span />', {
                    'class': 'lb-post-info'
                  })
                  .append(
                    $('<span />', {
                      html: timestampString,
                      'class': 'lb-post-timestamp'
                    })
                  )
                );

                if (item.tags && item.tags.length) {
                  var tagsList = $('<ul />', {
                    'class': 'lb-post-tags'
                  }).appendTo($postInfo);

                  $.each(item.tags, function (i, el) {
                    tagsList.append(
                      $('<li />', {
                        html: '<a href="#tag=' + encodeURIComponent(el) + '" class="tag">' + el + '</a>',
                        'class': ((i === 0) ? 'lb-first' : null)
                      })
                    );
                  });
                }

                if (options.tweetButtons) {
                  // Make the tweet button
                  tweetText = caption || data;
                  $tweetButton = makeTweetButton(id, data);

                  // Bind a just-in-time load of the tweet button
                  element.bind('mouseenter', function (event) {
                    // Unbind the load event once it's been triggered
                    element.unbind('mouseenter');
                    $postInfo.append($tweetButton);

                    // Re-render tweet buttons
                    // https://dev.twitter.com/discussions/6860
                    twttr.widgets.load();
                  });

                }

                return element;
              },//}}}

              /**
               * Add data item into the DOM.
               * @param {Object} item The item to add.
               * @param {Object|null} afterElement The optional jQuery object after which to position the new item.
               */
              addItem = function (item, afterElement) {//{{{
                var $item = $('#p' + item.id, $posts),
                  $parent = null;

                if (!$item.length) {
                  $item = buildItem(item);

                  if ($item.length) {
                    $item.hide();

                    if (item.type === 'comment' && item.p) {
                      $parent = $('#p' + item.p, $posts);

                      if ($parent.length) {
                        // Give comment the timestamp of its parent post, for navigation
                        $item.data('date', $parent.data('date'));

                        // Append comment directly after its parent post
                        $item.insertAfter($parent);
                      } else {
                        // Parent post doesn't exist, so add comment to
                        // pendingUpdates array for processing in next page
                        pendingUpdates.push(item);
                      }

                    } else if (afterElement && afterElement.length) {
                      $item.insertAfter(afterElement);

                    } else {
                      $item.prependTo($posts);
                    }

                    $item.fadeIn(400);
                  }
                }
              },//}}}

              /**
               * Update data item in the DOM with new one.
               * @param {Object} item The new item to use.
               */
              updateItem = function (item) {//{{{
                var $item = $('#p' + item.id, $posts);

                if ($item.length) {
                  $item = buildItem(item, $item);

                  if ($item) {
                    // TODO: Show update animation effect here instead of fadeIn
                    $item.hide().fadeIn(400);
                  }
                } else {
                  // If item is pending, overwrite its object
                  modifyPendingUpdate(item.id, item);
                }
              },//}}}

              /**
               * Remove data item from the DOM.
               * @param {Object} item The item to remove; requires item.id for reference.
               */
              deleteItem = function (item) {//{{{
                var $item = $('#p' + item.id, $posts);

                if ($item.length) {
                  $item.fadeOut(400, 'swing', function () {
                    $item.remove();
                  });
                } else {
                  // If item is pending, delete it from the list
                  modifyPendingUpdate(item.id, null);
                }
              },//}}}

              /**
               * Add data items from API into the DOM. IF pagination is enabled,
               *   only shows n items at a time, and remainder goes into pendingUpdates array.
               * @param {Array} items An array of post items from the API to add to the view.
               */
              addItems = function (items) {//{{{

                items = items || [];

                var len = items.length,
                  start = 0;

                // Queue up older updates, if pagination enabled and post
                // container is empty
                if (pageSize > 0 && len > pageSize && !pendingUpdates.length && !$posts.children('.lb-post').length) {

                  pendingUpdates = items.splice(0, len - pageSize);

                  $posts.append($('<a />', {
                    'class': 'lb-more-button',
                    text: 'Show earlier posts'
                  }))
                  .click($.proxy(onMoreButtonClicked, this));
                }

                $(items).each(function (i, item) {
                  // Add item to the DOM
                  addItem(item);

                  // Update the begin and end times
                  if (item.type !== 'comment' && item.date) {
                    var timestamp = item.date.getTime();
                    beginTime = Math.min(beginTime, timestamp);
                    endTime = Math.max(endTime, timestamp);
                  }
                });
              },//}}}

              /**
               * The 'more' button was clicked, to show the next page of paginated items.
               * @param {Event} event
               */
              onMoreButtonClicked = function (event) {//{{{
                var button = $(event.target),
                  len = pendingUpdates.length,
                  lastItem = null,
                  start = 0,
                  nextPage = null;

                if (len) {
                  lastItem = $posts.children('.lb-post:last');

                  start = Math.max(len - pageSize, 0);
                  nextPage = pendingUpdates.splice(start, pageSize);

                  $(nextPage).each(function (i, item) {
                    addItem(item, lastItem);
                  });
                }

                if (!pendingUpdates.length) {
                  button.remove();
                }
              },//}}}

              /**
               * Scroll the post container to position the given post item at the top.
               * @param {String} id The id of post item to scroll to.
               */
              goToItem = function (id) {//{{{
                var $post = $('#p' + id, $posts);

                if ($post.length) {
                  // Scroll to top of this post
                  $posts.scrollTop($post.get(0).offsetTop);
                }
              },//}}}

              /**
               * Find the post item nearest to the given timestamp.
               * @param {Number} timestamp The timestamp to compare, as generated from Date.getTime()
               * @returns {Object|null} The jQuery object found with the nearest
               *   match to the given timestamp, or null if not found.
               */
              getNearestItemByTime = function (timestamp) {//{{{
                var $item = null;

                $posts.children('.lb-post:not(.lb-comment)').each(function (i, el) {
                  var $el = $(el);

                  if ($el.data('date') === timestamp ||
                      ($el.data('date') < timestamp && $el.prev().data('date') > timestamp)) {
                    $item = $el;
                    return false;
                  }
                });

                return $item;
              },//}}}

              /**
               * Formats a Date object into a simple string; ex: "9/27/2012, 10:44am"
               * @param {Date} dateObj The Date object to format.
               * @returns {String} Formatted date/time string.
               */
              getFormattedDateTime = function (dateObj) {//{{{
                dateObj = new Date(dateObj);

                var ampm = 'am',
                  hours = dateObj.getHours(),
                  minutes = dateObj.getMinutes(),
                  timeStr = '',
                  dateStr = '',
                  dateTimeStr = '',
                  now = new Date(),
                  yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                if (hours >= 12) {
                  ampm = 'pm';
                }

                if (hours === 0) {
                  hours = 12;
                } else if (hours > 12) {
                  hours = hours - 12;
                }

                if (minutes < 10) {
                  minutes = '0' + minutes;
                }

                timeStr = hours + ':' + minutes + ampm;

                dateStr = (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

                if (dateObj.getTime() >= yesterday.getTime()) {
                  dateTimeStr = timeStr;
                } else {
                  dateTimeStr = dateStr + ', ' + timeStr;
                }

                return dateTimeStr;
              },//}}}

              /**
               * Return a Tweet Button according to the specs here:
               * @see https://twitter.com/about/resources/buttons#tweet
               * @param {String} id The post item id
               * @param {String} text The text to include in the tweet
               */
              makeTweetButton = function (id, text) {//{{{
                var href = window.location.href.replace(/\#.*$/, ''),
                  /**
                   * Simple way to strip html tags
                   * @see http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
                   * @param {string} html Text with html tags
                   */
                  stripHtml = function (html) {
                    var tmp = document.createElement('DIV');
                    tmp.innerHTML = html;
                    return tmp.textContent || tmp.innerText;
                  },

                  $tweetButton = $('<a />', {
                    'data-count': 'none',
                    'data-text': '"' + stripHtml(text) + '"',
                    'data-url': href + '#p' + id,
                    'href': 'https://twitter.com/share',
                    'class': 'twitter-share-button'
                  }),
                  tmp = document.createElement('DIV');

                tmp.innerHtml = text;

                return $tweetButton;
              },//}}}

              /**
               * Modify the pendingUpdates array. If item is provided, replaces
               *   existing with that item; if item not provided then deletes item from list.
               *
               * @param {String} id The post item id of the item to modify
               * @param {Object|null} item The new item to use, or null to remove it
               */
              modifyPendingUpdate = function (id, item) {//{{{
                if (pendingUpdates.length) {
                  for (var i = 0; i < pendingUpdates.length; i++) {
                    if (pendingUpdates[i].id === id) {
                      if (item) {
                        // Update item
                        pendingUpdates[i] = item;
                      } else {
                        // Delete item
                        pendingUpdates[i] = null;
                        pendingUpdates.splice(i, 1);
                      }
                      break;
                    }
                  }
                }
              },//}}}

              /**
               * Pause button was clicked
               * @param {Event} event
               */
              onPausedButtonClicked = function (event) {//{{{
                var $button = $(event.target);

                if (paused) {
                  start();
                  $button.text('Pause');
                  $toolbar.removeClass('lb-status-paused');
                } else {
                  stop();
                  $button.text('Resume');
                  $toolbar.addClass('lb-status-paused');
                }

                updateStatusLabel();
              },//}}}

              /**
               * Start/resume the API, so polls for updates
               */
              start = function () {
                $this.liveBlogLiteApi('play');
                paused = false;
              },

              /**
               * Pause the API, so no polling occurs
               */
              stop = function () {
                $this.liveBlogLiteApi('pause');
                paused = true;
              },

              /**
               * Update the blog status indicator based on its paused state.
               * @param {Boolean} enabled Whether the status should be visible or not.
               */
              updateStatusLabel = function (enabled) {//{{{
                if ($status) {
                  $status.removeClass('lb-status-live');

                  if (enabled === false) {
                    $status.text('')
                      .hide();
                  } else {
                    if (paused) {
                      $status.text('Paused');
                    } else {
                      $status.text('Live!')
                        .addClass('lb-status-live');
                    }
                    $status.show();
                  }
                }
              },//}}}

              /**
               * Setup the slider controls parameters, update position
               */
              initSlider = function () {//{{{
                if ($slider) {
                  // Set the min and max values
                  $slider.slider('option', {
                    min: beginTime,
                    max: endTime,
                    disabled: false
                  });
                  // Update the slider based on latest scroll position
                  $posts.scroll();
                }
              },//}}}

              /**
               * Update the slider label's text
               */
              updateSliderLabel = function (value) {//{{{
                if ($slider) {
                  value = value || $slider.slider('value');

                  var timeObj = new Date(value),
                    timeStr = getFormattedDateTime(timeObj);

                  $('.lb-timeline-label', $toolbar).text(timeStr);
                }
              },//}}}

              /**
               * Set the slider's value, which sets its position, and update the label
               */
              setSliderValue = function (value) {//{{{
                if ($slider) {
                  $slider.slider('value', value);
                  updateSliderLabel();
                }
              },//}}}

              /**
               * Return the top most visible post item in the scrollable container
               * @returns {Object|null} jQuery object of top most visible item, or null if not found
               */
              getTopVisibleItem = function (container) {//{{{
                var $container = $(container || window),
                  $topItem = null;

                $container.children('.lb-post').each(function (i, el) {
                  var $el = $(el),
                    height = $el.height(),
                    positionTop = $el.position().top,
                    positionBottom = positionTop + height;

                  if (positionTop <= 0 && positionBottom > 0) {
                    $topItem = $el;
                    //console.log('Top scrolled item: (' + positionTop + ') ' + $el.find('.lb-post-text,.lb-post-caption').text());
                    return false;
                  }
                });

                return $topItem;
              },//}}}

              /**
               * On container scroll event, set slider value based on the top most visible post item
               */
              onContainerScroll = function (event) {//{{{
                var $topItem = getTopVisibleItem($posts);

                if ($topItem) {
                  if (!$topItem.hasClass('lb-top')) {
                    $posts.children('.lb-top').removeClass('lb-top');
                    $topItem.addClass('lb-top');
                  }

                  setSliderValue($topItem.data('date'));
                }
              },//}}}

              /**
               * As slider is moving, update the label and scroll position
               */
              onSliderMove = function (event, ui) {//{{{
                updateSliderLabel(ui.value);

                var $item = getNearestItemByTime(ui.value);
                if ($item) {
                  goToItem($item.attr('id').substr(1));
                }
              };//}}}

            /*
             *  Setup the UI structure
             */

            $this.addClass('lb');

            if (options.toolbarEnabled) {//{{{
              $this.append(
                $toolbar = $('<div />', {
                  'class': 'lb-toolbar'
                })
                .append(
                  $('<a />', {
                    'class': 'lb-pause-button',
                    'text': 'Pause'
                  })
                  .bind('click', $.proxy(onPausedButtonClicked, this)),

                  $('<div />', {
                    'class': 'lb-timeline'
                  })
                  .append(
                    $('<p />', {
                      'class': 'lb-timeline-label',
                      text: 'Waiting for updates...'
                    }),
                    $slider = $('<div />', {
                      'class': 'lb-timeline-slider'
                    })
                  ),

                  $status = $('<span />', {
                      'class': 'lb-status'
                    })
                )
              );

              $slider.slider({
                slide: onSliderMove,
                disabled: true
              });
            }//}}}

            if (options.tagFilter) {
              $tagAlert = $('<div />', {
                'class': 'lb-tag-alert',
                html: 'Showing all updates with the <b>' + options.tagFilter + '</b> tag. '
              }).appendTo($this);

              $clearTagFilter = $('<a />', {
                href: '#',
                text: 'View all updates'
              })
                .appendTo($tagAlert)
                .bind('click', function (event) {
                  event.preventDefault();

                  options.tagFilter = '';
                  $this.liveBlogLiteApi('reset');
                  $this.trigger('begin');
                });
            }

            $posts = $('<div />', {
              'class': 'lb-post-container'
            })
            .appendTo($this)
            .scroll(onContainerScroll);

            if (options.height && options.height > 0) {
              $posts.height(options.height);
            }

            // Bind to API 'update' events
            $this.bind('update', function (event, data) {
              //console.log('update', event, data);
              var hash = window.location.hash;

              if (data.updates) {
                // Init the begin time if not set yet
                if (beginTime === 0) {
                  beginTime = (new Date()).getTime();
                }

                // Add items to the DOM
                addItems(data.updates);

                // Update the slider's range and position
                initSlider();
              }

              $(data.changes).each(function (i, item) {
                updateItem(item);
              });

              if (data.deletes) {
                $(data.deletes).each(function (i, item) {
                  var $item = $('#p' + item.id),
                    timestamp,
                    nextItem;

                  // Adjust the begin or end time, if this item was the first or last item
                  if ($item.length && !$item.hasClass('lb-comment')) {
                    timestamp = $item.data('date');

                    // Item was first, assign beginTime to prev item's date
                    if (timestamp === beginTime) {
                      nextItem = $item.prev(':not(.lb-comment)');
                      if (nextItem.length) {
                        beginTime = nextItem.data('date');
                      }
                    }
                    // Item was last, assign endTime to next item's date
                    if (timestamp === endTime) {
                      nextItem = $item.next(':not(.lb-comment)');
                      if (nextItem.length) {
                        endTime = nextItem.data('date');
                      }
                    }
                    // Update the slider
                    initSlider();
                  }

                  // Remove the item from the DOM
                  deleteItem(item);
                });
              }

              // Allow permalinks to individual updates
              // ie, #p19923
              if (hash.length) {
                var id,
                  start,
                  postPosition = hash.indexOf('p');

                if (postPosition > -1) {
                  start = postPosition + 1;
                  // Note assumption that the hash ONLY contains an ID
                  id = hash.substring(start, hash.length);

                  goToItem(id);
                }
              }

            });

            // API fires 'end' event when the set time is reached to stop polling
            $this.bind('end', function (event) {
              $('.lb-pause-button', $this).hide();
              updateStatusLabel(false);
            });

            // If not alive, or already reached end time
            if (options.alive === false || (options.end && options.end <= new Date())) {
              $('.lb-pause-button', $this).hide();
              updateStatusLabel(false);

            // else is alive and kickin'
            } else {
              paused = false;
              updateStatusLabel();
            }

          });

          $this.delegate('.tag', 'click', function (event) {
            options.tagFilter = $(event.currentTarget).text();
            $this.liveBlogLiteApi('reset');

            // Manually clean up some bindings
            // TODO: separate building UI from event binding
            $this.unbind('end update');

            $this.trigger('begin');
            //$this.find('.lb-post-container').scrollTop('0');
          });


          // Set up show / hide of tweet buttons
          if (options.tweetButtons) {

            // Load Twitter Share JS
            // Script taken from Twitter, but linted
            // https://twitter.com/about/resources/buttons#tweet
            if (typeof twttr === 'undefined') {
              (function (d, s, id) {
                var js,
                  fjs = d.getElementsByTagName(s)[0];

                if (!d.getElementById(id)) {
                  js = d.createElement(s);
                  js.id = id;
                  js.src = 'http://platform.twitter.com/widgets.js';
                  fjs.parentNode.insertBefore(js, fjs);
                }
              }(document, 'script', 'twitter-wjs'));
            }

            $this.delegate('.lb-post', 'mouseenter', function (event) {
              $(event.currentTarget)
                .find('.twitter-share-button')
                .fadeIn('fast');
            });

            $this.delegate('.lb-post', 'mouseleave', function (event) {
              $(event.currentTarget)
                .find('.twitter-share-button')
                .fadeOut('fast');
            });
          }

          // Begin polling the API
          $this.liveBlogLiteApi(options);

        }

      };

    return this.each(function () {
      customOptions = customOptions || {};
      liveBlogLiteUi(customOptions);
    });

  };

}(jQuery));
