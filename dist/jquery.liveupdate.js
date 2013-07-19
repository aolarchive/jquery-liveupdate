/*! Live Update - v0.2 - 2013-07-19, 2:30PM EDT
* https://github.com/aol/jquery-liveupdate
* Copyright (c) 2013 Nate Eagle and Jeremy Jannotta; Licensed BSD */
/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.24",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.curCSS||(a.curCSS=a.css),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;return i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1],this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]===e)return;var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0},top:function(b,c){if(c.at[1]===e)return;var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];return!c||!c.ownerDocument?null:b?a.isFunction(b)?this.each(function(c){a(this).offset(b.call(this,c,a(this).offset()))}):this.each(function(){a.offset.setOffset(this,b)}):h.call(this)}),a.curCSS||(a.curCSS=a.css),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);;/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.dialog.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",d={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},e={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({zIndex:d.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(c){d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(a){b.moveToTop(!1,a)}),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")},function(){j.removeClass("ui-state-hover")}).focus(function(){j.addClass("ui-state-focus")}).blur(function(){j.removeClass("ui-state-focus")}).click(function(a){return b.close(a),!1}).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;return a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle),a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1===c._trigger("beforeClose",b))return;return c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d),c},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options,f;return e.modal&&!b||!e.stack&&!e.modal?d._trigger("focus",c):(e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c),d)},open:function(){if(this._isOpen)return;var b=this,c=b.options,d=b.uiDialog;return b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){if(b.keyCode!==a.ui.keyCode.TAB)return;var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");if(b.target===e[0]&&!b.shiftKey)return d.focus(1),!1;if(b.target===d[0]&&b.shiftKey)return e.focus(1),!1}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open"),b},_createButtons:function(b){var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),f=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var e=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(f);a.each(d,function(a,b){if(a==="click")return;a in e?e[a](b):e.attr(a,b)}),a.fn.button&&e.button()}),e.appendTo(c.uiDialog))},_makeDraggable:function(){function f(a){return{position:a.position,offset:a.offset}}var b=this,c=b.options,d=a(document),e;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,g){e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))},drag:function(a,c){b._trigger("drag",a,f(c))},stop:function(g,h){c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function h(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:g,start:function(b,c){a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))},resize:function(a,b){d._trigger("resize",a,h(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var c=this,f={},g=!1;a.each(b,function(a,b){c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,d){var e=this,f=e.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":e._createButtons(d);break;case"closeText":e.uiDialogTitlebarCloseText.text(""+d);break;case"dialogClass":f.removeClass(e.options.dialogClass).addClass(c+d);break;case"disabled":d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case"draggable":var g=f.is(":data(draggable)");g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();break;case"position":e._position(d);break;case"resizable":var h=f.is(":data(resizable)");h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);break;case"title":a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))}a.Widget.prototype._setOption.apply(e,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();var f=this.element.css("height","auto").height();e||this.uiDialog.hide(),this.element.height(Math.max(f,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.24",uuid:0,maxZ:0,getTitleId:function(a){var b=a.attr("id");return b||(this.uuid+=1,b=this.uuid),"ui-dialog-title-"+b},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});return a.fn.bgiframe&&c.bgiframe(),this.instances.push(c),c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;return a.browser.msie&&a.browser.version<7?(b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),b<c?a(window).height()+"px":b+"px"):a(document).height()+"px"},width:function(){var b,c;return a.browser.msie?(b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),b<c?a(window).width()+"px":b+"px"):a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.slider.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=5;a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var b=this,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=d.values&&d.values.length||1,h=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(d.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),d.range&&(d.range===!0&&(d.values||(d.values=[this._valueMin(),this._valueMin()]),d.values.length&&d.values.length!==2&&(d.values=[d.values[0],d.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(d.range==="min"||d.range==="max"?" ui-slider-range-"+d.range:"")));for(var i=e.length;i<g;i+=1)h.push(f);this.handles=e.add(a(h.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){d.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){d.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"))}).blur(function(){a(this).removeClass("ui-state-focus")}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)}),this.handles.keydown(function(d){var e=a(this).data("index.ui-slider-handle"),f,g,h,i;if(b.options.disabled)return;switch(d.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:d.preventDefault();if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),f=b._start(d,e);if(f===!1)return}}i=b.options.step,b.options.values&&b.options.values.length?g=h=b.values(e):g=h=b.value();switch(d.keyCode){case a.ui.keyCode.HOME:h=b._valueMin();break;case a.ui.keyCode.END:h=b._valueMax();break;case a.ui.keyCode.PAGE_UP:h=b._trimAlignValue(g+(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(g-(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g===b._valueMax())return;h=b._trimAlignValue(g+i);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g===b._valueMin())return;h=b._trimAlignValue(g-i)}b._slide(d,e,h)}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,d),b._change(c,d),a(this).removeClass("ui-state-active"))}),this._refreshValue(),this._animateOff=!1},destroy:function(){return this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options,d,e,f,g,h,i,j,k,l;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),d={x:b.pageX,y:b.pageY},e=this._normValueFromMouse(d),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b)}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i])),j=this._start(b,i),j===!1?!1:(this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),k=g.offset(),l=!a(b.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:b.pageX-k.left-g.width()/2,top:b.pageY-k.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e),this._animateOff=!0,!0))},_mouseStart:function(a){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1},_mouseStop:function(a){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;return this.orientation==="horizontal"?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),this.orientation==="vertical"&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};return this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c,!0))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);return}return this._value()},values:function(b,c){var d,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);return}if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();d=this.options.values,e=arguments[0];for(f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()},_setOption:function(b,c){var d,e=0;a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(d=0;d<e;d+=1)this._change(null,d);this._animateOff=!1}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a),a},_values:function(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b),b;c=this.options.values.slice();for(d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return Math.abs(c)*2>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,d=this,e=this._animateOff?!1:c.animate,f,g={},h,i,j,k;this.options.values&&this.options.values.length?this.handles.each(function(b,i){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",a(this).stop(1,1)[e?"animate":"css"](g,c.animate),d.options.range===!0&&(d.orientation==="horizontal"?(b===0&&d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({width:f-h+"%"},{queue:!1,duration:c.animate})):(b===0&&d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({height:f-h+"%"},{queue:!1,duration:c.animate}))),h=f}):(i=this.value(),j=this._valueMin(),k=this._valueMax(),f=k!==j?(i-j)/(k-j)*100:0,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",this.handle.stop(1,1)[e?"animate":"css"](g,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[e?"animate":"css"]({width:100-f+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[e?"animate":"css"]({height:100-f+"%"},{queue:!1,duration:c.animate}))}}),a.extend(a.ui.slider,{version:"1.8.24"})})(jQuery);;/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery.effects||function(a,b){function c(b){var c;return b&&b.constructor==Array&&b.length==3?b:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))?[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)]:(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))?[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))?[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)]:(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))?[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)]:(c=/rgba\(0, 0, 0, 0\)/.exec(b))?e.transparent:e[a.trim(b).toLowerCase()]}function d(b,d){var e;do{e=(a.curCSS||a.css)(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function h(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]]){var e=a.length;while(e--)c=a[e],typeof a[c]=="string"&&(d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b[d]=a[c])}else for(c in a)typeof a[c]=="string"&&(b[c]=a[c]);return b}function i(b){var c,d;for(c in b)d=b[c],(d==null||a.isFunction(d)||c in g||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))&&delete b[c];return b}function j(a,b){var c={_:0},d;for(d in b)a[d]!=b[d]&&(c[d]=b[d]);return c}function k(b,c,d,e){typeof b=="object"&&(e=c,d=null,c=b,b=c.effect),a.isFunction(c)&&(e=c,d=null,c={});if(typeof c=="number"||a.fx.speeds[c])e=d,d=c,c={};return a.isFunction(d)&&(e=d,d=null),c=c||{},d=d||c.duration,d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,e=e||c.complete,[b,c,d,e]}function l(b){return!b||typeof b=="number"||a.fx.speeds[b]?!0:typeof b=="string"&&!a.effects[b]?!0:!1}a.effects={},a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){a.colorInit||(a.start=d(a.elem,e),a.end=c(a.end),a.colorInit=!0),a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,e){return a.isFunction(d)&&(e=d,d=null),this.queue(function(){var g=a(this),k=g.attr("style")||" ",l=i(h.call(this)),m,n=g.attr("class")||"";a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),m=i(h.call(this)),g.attr("class",n),g.animate(j(l,m),{queue:!1,duration:c,easing:d,complete:function(){a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),typeof g.attr("style")=="object"?(g.attr("style").cssText="",g.attr("style").cssText=k):g.attr("style",k),e&&e.apply(this,arguments),a.dequeue(this)}})})},a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}}),a.extend(a.effects,{version:"1.8.24",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){return b=="toggle"&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e=document.activeElement;try{e.id}catch(f){e=document.body}return b.wrap(d),(b[0]===e||a.contains(b[0],e))&&a(e).focus(),d=b.parent(),b.css("position")=="static"?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),d.css(c).show()},removeWrapper:function(b){var c,d=document.activeElement;return b.parent().is(".ui-effects-wrapper")?(c=b.parent().replaceWith(b),(b[0]===d||a.contains(b[0],d))&&a(d).focus(),c):b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(b,c,d,e){var f=k.apply(this,arguments),g={options:f[1],duration:f[2],callback:f[3]},h=g.options.mode,i=a.effects[b];return a.fx.off||!i?h?this[h](g.duration,g.callback):this.each(function(){g.callback&&g.callback.call(this)}):i.call(this,g)},_show:a.fn.show,show:function(a){if(l(a))return this._show.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="show",this.effect.apply(this,b)},_hide:a.fn.hide,hide:function(a){if(l(a))return this._hide.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="hide",this.effect.apply(this,b)},__toggle:a.fn.toggle,toggle:function(b){if(l(b)||typeof b=="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);var c=k.apply(this,arguments);return c[1].mode="toggle",this.effect.apply(this,c)},cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}});var m={};a.each(["Quad","Cubic","Quart","Quint","Expo"],function(a,b){m[b]=function(b){return Math.pow(b,a+2)}}),a.extend(m,{Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a){return a===0||a===1?a:-Math.pow(2,8*(a-1))*Math.sin(((a-1)*80-7.5)*Math.PI/15)},Back:function(a){return a*a*(3*a-2)},Bounce:function(a){var b,c=4;while(a<((b=Math.pow(2,--c))-1)/11);return 1/Math.pow(4,3-c)-7.5625*Math.pow((b*3-2)/22-a,2)}}),a.each(m,function(b,c){a.easing["easeIn"+b]=c,a.easing["easeOut"+b]=function(a){return 1-c(1-a)},a.easing["easeInOut"+b]=function(a){return a<.5?c(a*2)/2:c(a*-2+2)/-2+1}})}(jQuery);;/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.highlight.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.highlight=function(b){return this.queue(function(){var c=a(this),d=["backgroundImage","backgroundColor","opacity"],e=a.effects.setMode(c,b.options.mode||"show"),f={backgroundColor:c.css("backgroundColor")};e=="hide"&&(f.opacity=0),a.effects.save(c,d),c.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(f,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),e=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;
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

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
/*!
 * jQuery imagesLoaded plugin v2.1.0
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

;(function($, undefined) {
'use strict';

// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

})(jQuery);
/**
 * AOL Live Update API Widget
 *
 * @fileOverview A slim API to fetch data from AOL liveblogs.
 *
 * @see https://github.com/aol/jquery-liveupdate
 * @author Nate Eagle, Jeremy Jannotta
 * @requires jQuery 1.5.2+
 */

(function ($) {

  $.fn.liveUpdateApi = function (method) {

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
        // Probably shouldn't be changed
        callbackPrefix: 'LB_U',

        // The domain of the blog, i.e. http://aol.com
        url: null,

        // The id of the live blog post, i.e. 20317028
        postId: null,

        // Send image beacon calls to Blogsmith to track traffic
        trafficPing: true,

        // Reference to alternate function to execute the fetch, for simulating data, for instance
        fetch: null,

        // Manually specify an interval for polling in seconds - it unset, takes the
        // recommendation from Blogsmith, which is 3 seconds
        pollInterval: null,

        // If jQuery Sonar is present, pause update polls if the container
        // is off-screen.
        sonar: true
      },

      // Used to store plugin state
      state = $this.data('lbl-state') || {},

      /**
       * Save the state object to this element's data
       */
      save = function () {
        $this.data('lbl-state', state);
      },

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
      },

      /**
       * Success handler for all fetch requests
       * @param {Object} response The raw data object returned in the fetch request
       */
      onFetchSuccess = function (response) {
        // Set the default delay to 3 seconds
        var delay = 3 * 1000,
          now = new Date(),
          postStatus = null;

        // Determine postStatus based on response
        if (String(response.status).toLowerCase() === 'error') {
          postStatus = 'disabled';
        } else if (response.int === 0 && response.last_update === 0) {
          postStatus = 'notstarted';
        } else if (response.int === 0 && response.last_update > 0) {
          postStatus = 'completed';
        } else {
          postStatus = 'live';
        }
        
        // Trigger a 'status' event whenever postStatus changes
        if (state.postStatus !== postStatus) {
          state.postStatus = postStatus;
          $this.trigger({ type: 'status', status: postStatus });
        }
        
        if (state.options.pollInterval) {
          delay = state.options.pollInterval * 1000;
        } else {
          // If response.int is greater than zero, use it as the
          // recommended number of seconds to delay the poll
          if (response.int > 0) {
            delay = response.int * 1000;
          }
        }

        if (response.last_update === state.lastUpdate) {
          state.count += 1;
        } else if (response.last_update > state.lastUpdate) {
          state.lastUpdate = response.last_update;
          state.count = 0;
        }

        // Call fetch again after the API-recommended
        // number of seconds
        if (state.options.alive) {
          if (!state.options.end || state.options.end > now) {

            state.timer = setTimeout(methods.fetch, delay);

          } else {
            if (state.options.end && state.options.end <= now) {
              state.options.alive = false;
              $this.trigger('end');
            }
          }
        }

        if (response.data) {
          // If this is the first update, trigger the begin event
          if (state.first === true) {
            delete state.first;
            $this.trigger('begin');
          }

          $this.trigger('update', normalize(response.data, response.members));
        }

        // Save state
        save();
      },

      /**
       * Error handler for all fetch requests
       * @param {Object} response The raw data object returned in the fetch request
       */
      onFetchError = function (response) {
        // Try to restart things in 10 seconds
        if (state.options.alive) {
          state.timer = setTimeout(methods.fetch, 10000);
        }

        // Save state
        save();
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
            if (state.options.url && state.options.url.substring(state.options.url.length - 1) !== '/') {
              state.options.url += '/';
            }

            if (state.options.sonar) {
              $this.bind('scrollin', function (event) {
                // Turn polling on when the element is visible
                methods.live();
              });

              $this.bind('scrollout', function (event) {
                // Turn polling off when the element is offscreen
                methods.die();
              });
            }

            // Save state
            save();

            timeToBegin = function () {
              var now = new Date();

              if (state.options.begin) {
                if (state.options.begin < now) {
                  //$this.trigger('begin');
                  state.first = true;
                  methods.trafficPing();
                  methods.fetch();
                } else {
                  // Wait 10 seconds, then check again
                  state.timer = setTimeout(timeToBegin, 10000);
                }
              } else {
                state.first = true;
                //$this.trigger('begin');
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
          clearTimeout(state.timer);
          methods.fetch();
        },

        /**
         * Hit the Blogsmith liveupdates API and trigger an update event with
         * the returned data
         **/
        fetch: function () {
          // Fetch data from API
          var apiUrl,
            state = $this.data('lbl-state'),
            options = state.options,
            callback = options.callbackPrefix + state.lastUpdate + '_C' + state.count;

          // If the trafficPing option is set to true and there's not currently
          // a setInterval stored on the state object, start pinging
          if (options.trafficPing && !state.trafficPing) {
            methods.trafficPing();
          }

          if (!options.fetch) {
            // The Blogsmith API uses the 'live-update' pattern in the URL which
            // needs to be defined in the blog's .htaccess
            apiUrl = options.url + 'live-update/' + options.postId + '/' + state.lastUpdate;

            $.ajax({
              cache: true,
              dataType: 'jsonp',
              jsonpCallback: callback,
              url: apiUrl,
              success: onFetchSuccess,
              error: onFetchError
            });
          } else {
            options.fetch(state, onFetchSuccess, onFetchError);
          }
        },

        /**
         * Pause updates
         * @example $('#somediv').liveUpdateApi('pause');
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
         * @example $('#somediv').liveUpdateApi('play');
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
 * AOL Live Update UI Widget
 *
 * @fileOverview A slim UI widget to publish data from AOL liveblogs.
 *
 * @see https://github.com/aol/jquery-liveupdate
 * @author Nate Eagle, Jeremy Jannotta
 * @requires $.fn.liveUpdateApi
 */

(function ($) {

  $.fn.liveUpdateUi = function (customOptions) {

    var defaultOptions = {
        /**
         * Whether to show the toolbar UI.
         * @type Boolean
         * @default false
         */
        toolbarEnabled: false,
        /**
         * Whether to show the timeline slider and label UI in the toolbar.
         * @type Boolean
         * @default true
         */
        timelineEnabled: true,
        /**
         * Number of items to show for pagination. If 0 or not a positive integer, pagination is disabled.
         * @type Number
         * @default 0
         */
        pageSize: 0,
        /**
         * Whether to show the tweet buttons on posts.
         * @type Boolean
         * @default true
         */
        tweetButtons: true,
        /**
         * Height of the post container, required for the timeline slider to
         * function. Must be a positive integer.
         * @type Number
         * @default 0
         */
        height: 0,
        /**
         * Optional URL params to append to all outgoing links within the post
         * text; for link tracking, etc. Ex: 'icid=aol123'
         * @type String
         * @default null
         */
        linkParams: null,
        /**
         * Whether to show the 75 x 75 thumbnail version of images . If set to
         * false, will show the full image. In our default CSS, the image is
         * scaled down to 100px height and proportionally determined width.
         * @type Boolean
         * @default true
         */
        thumbnails: true,
        /**
         * Whether to use DIMS for thumbnails
         * @type Boolean
         * @default true
         */
        dims: true,
        /**
         * Dimension restrictions for thumbnail images. If dims is true, uses  
         * this for resizing; else if thumbnails is false, uses this for setting 
         * max-width and max-height CSS.
         * @type Object
         */
        thumbnailDimensions: {
          height: 100,
          width: null
        },
        /**
         * Filter of which files to exclude from thumbnail generation - only
         * applicable when thumbnails is true. Should be a comma-separated list
         * of file patterns, that when matched against an image url, will not
         * generate a thumbnail.
         * @type String
         * @default null
         */
        thumbnailExcludeFilter: null,
        /**
         * Display only the recent n posts
         * @type Number
         */
        postLimit: null,
        /**
         * Set various options for how bloggers are rendered, based on each
         * memberId sent from the server.
         *
         * Example:
         * {
         *   '987654321': {
         *     profileImage: 'http://www.gravatar.com/avatar/some-hash.png',
         *     featured: true
         *   }
         * }
         *
         * @type Object
         */
        memberSettings: null,
        /**
         * Image URL to use as placeholder image before the original image is loaded.
         * @type String
         */
        placeholderImage: 'http://o.aolcdn.com/js/x.gif'
      },
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

      $this = $(this),

      liveUpdateUi = function (customOptions) {

        if ($.fn.liveUpdateApi) {

          var options = $.extend(true, {}, defaultOptions, customOptions),
            scrolling = false,
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

          // Make sure linkParams don't begin with a delimiter
          if (options.linkParams && (options.linkParams.charAt(0) === '?' || options.linkParams.charAt(0) === '&')) {
            options.linkParams = options.linkParams.substr(1);
          }

          // Normalize the thumbnail exclude filter
          if (options.thumbnailExcludeFilter) {
            options.thumbnailExcludeFilter = $.trim(options.thumbnailExcludeFilter);
          }
          
          // Preload the placeholder image
          if (options.placeholderImage) {
            var placeholderImage = new Image();
            placeholderImage.src = options.placeholderImage;
          }
          
          // Dynamically set dimensions for images, based on thumbnailDimensions
          if (options.thumbnailDimensions) {
            var imgHeight = options.thumbnailDimensions.height ? 'height:' + options.thumbnailDimensions.height + 'px;' : '',
              imgWidth = options.thumbnailDimensions.width ? 'width:' + options.thumbnailDimensions.width + 'px;' : '';
              
            $('<style id="lb-style">.lb .lb-post img { ' + imgWidth + imgHeight + ' }</style>')
              .appendTo('head');
          }

          // Listen to 'begin' event from API, to initialize and build the widget
          $this.bind('begin', function (event) {

            $this.empty();

            var paused = true,
              pageSize = options.pageSize,
              pendingUpdates = [],
              beginTime = 0,
              endTime = 0,
              $alert = null,
              $tagFilter = null,
              $clearTagFilter = null,
              $posts = null,
              $toolbar = null,
              $slider = null,
              $status = null,
              $unreadCount,
              unreadItemCount = 0,
              receivedFirstUpdate = false,
              pauseOnUpdate = false,

              /**
               * Create DOM element for post item from the given data item. If
               * element is provided then replaces content of that element,
               * else creates new one.
               * @param {Object} item The data item used as source.
               * @param {Object|null} element The optional jQuery object to modify, instead of creating new one.
               * @returns {Object} The jQuery object built from the data, not yet added to the DOM.
               */
              buildItem = function (item, element) {

                var data = item.content,
                  type = item.type,
                  id = item.id,
                  caption = item.caption,
                  tags = item.tags,
                  timestamp = item.date,
                  memberId = item.memberId,
                  timestampString,
                  imageUrl,
                  fullImageUrl,
                  $image,
                  $tweetButton,
                  tweetText,
                  $postInfo,
                  $commentIcon,
                  $postAuthorTab,
                  $profileImage,
                  isNew = !element,
                  memberSettings = $.extend({
                    profileImage: null,
                    featured: false
                  }, options.memberSettings && options.memberSettings[memberId]);

                // Construct the timestamp
                timestampString = '<a href="#p' + id + '">' + getFormattedDateTime(timestamp) + '</a>';

                // If this author is not featured, add the credit to the timestamp
                if (!memberSettings.featured) {
                  timestampString += ' by <span class="lb-blogger-name">' + item.memberName + '</span>';
                }

                //console.log('type', type);

                // If there is a tag filter present...
                if (options.tagFilter) {
                  // If the item doesn't have a tag or the tag is not present
                  // in this item, don't build it
                  if (!tags || $.inArray(options.tagFilter, tags) === -1) {
                    // Return an empty array
                    return [];
                  }
                }

                if (isNew) {
                  element = $('<p />', {
                    id: 'p' + id,
                    'class': 'lb-post'
                  })
                  .data('date', item.date.getTime())
                  .toggleClass('lb-featured', memberSettings.featured || false);
                } else {
                  element.empty()
                    .addClass('lb-edited');

                  timestampString = timestampString + ' - edited';
                }
                
                // Default imagesLoaded to false so knows to load images in post item
                element.data('imagesLoaded', false);

                if (type === 'text' || type === 'comment') {
                  element.append(
                    buildTextElement(data, 'lb-post-text')
                  );

                  if (type === 'comment') {
                    element.addClass('lb-comment');

                    element.prepend(
                      $commentIcon = $('<div class="lb-comment-icon"/>')
                        .append(
                          $('<div class="lb-comment-icon-dot"/>')
                        )
                    );
                  } else {
                    // Initialize item's comments to 0
                    if (!element.data('comments')) {
                      element.data('comments', 0);
                    }
                  }

                } else if (type === 'image') {
                  if (options.thumbnails && imageThumbnailAllowed(data)) {
                    // Store a reference to the full-sized image
                    fullImageUrl = data;
                    if (options.dims) {
                      // Use the getDynamicImageSrc plugin to fetch a proper
                      // DIMS URL
                      imageUrl = $.getDynamicImageSrc(data, options.thumbnailDimensions.width, options.thumbnailDimensions.height);
                    } else {
                      // Otherwise, use the Blogsmith CDN way of fetching a
                      // standard 75x75 thumbnail
                      imageUrl = data.replace(/(\.gif|\.jpg|\.jpeg|\.png)$/, '_thumbnail$1');
                    }
                  } else {
                    imageUrl = data;
                  }

                  element.append(
                    $image = $('<img />', {
                      src: options.placeholderImage, // Placeholder image
                      'data-src': imageUrl || '', // Store url for thumbnail version of the image
                      'data-full-src': fullImageUrl || '', // Store the url for full sized image
                      alt: '',
                      title: 'Click to view larger',
                      'class': 'lb-pending'
                    }),
                    buildTextElement(caption, 'lb-post-caption')
                  );
                  
                  if (options.thumbnailDimensions && (!options.thumbnails || imageUrl === data)) {
                    $image.css('max-width', options.thumbnailDimensions.width || null);
                    $image.css('max-height', options.thumbnailDimensions.height || null);
                  }
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

                if (memberSettings.profileImage || memberSettings.featured) {
                  $postAuthorTab = $('<span/>', {
                    'class': 'lb-post-author-tab'
                  });

                  // Use a profile image if one has been provided in the settings
                  if (memberSettings.profileImage) {
                    $profileImage = $('<img/>', {
                      'class': 'lb-profile-image lb-pending',
                      src: options.placeholderImage,  // Placeholder image
                      'data-src': memberSettings.profileImage, // Store url for original image
                      alt: '',
                      title: item.memberName
                    }).appendTo($postAuthorTab);
                  }

                  if (memberSettings.featured) {
                    $postAuthorTab.append('<span class="lb-blogger-name">' + item.memberName + '</span>');
                  }
                  
                  if ($commentIcon) {
                    $postAuthorTab.insertAfter($commentIcon);
                  } else {
                    element.prepend($postAuthorTab);
                  }
                }

                if (item.tags && item.tags.length) {
                  var tagsList = $('<ul />', {
                    'class': 'lb-post-tags'
                  }).appendTo($postInfo);

                  $.each(item.tags, function (i, el) {
                    tagsList.append(
                      $('<li />', {
                        html: '<a href="#tag=' + encodeURIComponent(el) + '" class="tag" title="Show only updates with this tag">' + el + '</a>',
                        'class': ((i === 0) ? 'lb-first' : null)
                      })
                    );
                  });
                }

                if (options.tweetButtons) {
                  // Make the tweet button
                  tweetText = caption || data;
                  $tweetButton = makeTweetButton(id, tweetText);

                  // Bind a just-in-time load of the tweet button
                  element.bind('mouseenter', function (event) {
                    // Unbind the load event once it's been triggered
                    element.unbind('mouseenter');
                    $postInfo.append($tweetButton);

                    // Re-render tweet buttons
                    // https://dev.twitter.com/discussions/6860
                    // NOTE: Must pass in element to re-render, otherwise scans entire document
                    twttr.widgets.load(element.get(0));
                  });

                }

                return element;
              },

              /**
               * Create jQuery element for the text portion of a post item.
               *   Does extra processing to remove unwanted tags, and format others.
               * @param {String} text The text data from the API.
               * @param {String|null} className The className for this element.
               * @returns {Object} The new jQuery object.
               */
              buildTextElement = function (text, className) {
                className = className || 'lb-post-text';
                var $el;

                if (text) {
                  // Strip out all undesirable tags before they become DOM elements
                  // TODO: Decide if we want to prevent local script tags
                  //  - we do need to allow scripts srcs for embedded tweets, etc.
                  //text = text.replace(/<script[^>]*>.*?<\/script>/ig, '');
                }

                // Build element
                $el = $('<span />', {
                  html: text,
                  'class': className
                });

                // Make sure all links target a new window
                $el.find('a').attr('target', '_blank');

                // If linkParams are provided, append to all links, in appropriate place
                if (options.linkParams) {
                  $el.find('a[href]').each(function (i, el) {
                    var $link = $(el),
                      href = $link.attr('href'),
                      hashPos = href.indexOf('#'),
                      params = (href.indexOf('?') === -1 ? '?' : '&') + options.linkParams;

                    if (hashPos !== -1) {
                      href = href.substring(0, hashPos) + params + href.substring(hashPos);
                    } else {
                      href += params;
                    }

                    $link.attr('href', href);
                  });
                }

                // Remove undesirable elements
                $el.find('object, embed, applet, iframe, frame, input, select, textarea').remove();

                return $el;
              },

              /**
               * Add data item into the DOM.
               * @param {Object} item The item to add.
               * @param {Boolean} addToTop Whether to add item to top of posts, vs. bottom; default is true.
               * @param {Object|null} afterElement The optional jQuery object after which to position the new item.
               */
              addItem = function (item, addToTop, afterElement) {
                addToTop = addToTop != null ? addToTop : true;
                
                var $item = $('#p' + item.id, $posts),
                  $parent = null,
                  height = 0,
                  scrollTop = $posts.scrollTop(),
                  $commentsLabel,
                  $commentsList,
                  
                  /*
                   * Update comment and parent's meta data, after adding comment to DOM
                   */
                  updateCommentUponAdd = function ($comment, $parentPost) {
                    // Give comment the timestamp of its parent post, for navigation
                    $item.data('date', $parentPost.data('date'));
              
                    // Add class to last comment in a row
                    $comment.next('.lb-comment').andSelf()
                      .last().addClass('lb-comment-last')
                      .prev().removeClass('lb-comment-last');

                    // Increment the parent's comments count
                    $parentPost.data('comments', $parentPost.data('comments') + 1);

                    // Add the comments label to parent item, if needed
                    if ($parentPost.data('comments') > 0) {
                      $commentsLabel = $parentPost.find('.lb-post-comments-label');
                      if (!$commentsLabel.length) {
                        $parentPost.append(
                          $commentsLabel = $('<span />', {
                            'class': 'lb-post-comments-label',
                            'text': 'Comments'
                          })
                        );
                      }
                    }
                  };

                if (!$item.length) {
                  $item = buildItem(item);

                  if ($item.length) {
                    //$item.hide();
                    if (receivedFirstUpdate) {
                      $item.addClass('lb-hidden');
                    }

                    // Add an item after it's parent post, if parent provided
                    if (item.p) {
                      $parent = $('#p' + item.p, $posts);

                      if ($parent.length) {
                        if (item.type === 'comment') {
                          
                          // Insert comment at the appropriate location, sorted by date
                          if ($parent.data('comments') > 0) {
                            $commentsList = $parent.nextUntil(':not(.lb-comment)', '.lb-comment');
                            $commentsList.each(function (i, el) {
                              var $el = $(el),
                                elId = Number($el.attr('id').substr(1));
                                
                              // Add comment directly before the latest comment
                              if (item.id > elId) {
                                $item.insertBefore($el);
                                return false;
                              
                              // If last comment, and not newer, add after it 
                              } else if (i === $commentsList.length - 1) {
                                $item.insertAfter($el);
                                return false;
                              }
                            });
                          // Just insert if it's the first comment
                          } else {
                            $item.insertAfter($parent);
                          }
                        
                          updateCommentUponAdd($item, $parent);
                          
                        } else {
                          // For all other types, add directly before its parent
                          $item.insertBefore($parent); 
                        }

                      } else {
                        // Parent post doesn't exist, so add item to
                        // pendingUpdates array for processing later
                        pendingUpdates.push(item);
                      }
                    
                    // Add item after a given element, if provided 
                    } else if (afterElement && afterElement.length) {
                      $item.insertAfter(afterElement);

                    // Add item to bottom of post container
                    } else if (addToTop === false) {
                      $item.appendTo($posts);
                    
                    // Add item to top of post container
                    } else {
                      $item.prependTo($posts);
                    }

                    // Adjust scroll position so doesn't shift after adding an item
                    height = $item.outerHeight();
                    if (height && scrollTop) {
                      $posts.scrollTop(scrollTop + height);
                    }

                    //$item.fadeIn(400);
                    //$item.show();
                    if (receivedFirstUpdate) {
                      $item.removeClass('lb-hidden');
                    }
                  }
                }
              },

              /**
               * Update data item in the DOM with new one.
               * @param {Object} item The new item to use.
               */
              updateItem = function (item) {
                var $item = $('#p' + item.id, $posts),
                  beforeHeight = 0,
                  afterHeight = 0,
                  diffHeight = 0,
                  scrollTop = $posts.scrollTop();

                if ($item.length) {
                  beforeHeight = $item.outerHeight();
                  $item = buildItem(item, $item);

                  if ($item) {
                    afterHeight = $item.outerHeight();
                    diffHeight = afterHeight - beforeHeight;

                    // Adjust scroll position so doesn't shift after editing an item
                    if (diffHeight && scrollTop) {
                      $posts.scrollTop(scrollTop + diffHeight);
                    }

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
              deleteItem = function (item) {
                var $item = $('#p' + item.id, $posts),
                  height = 0,
                  scrollTop = $posts.scrollTop(),
                  $parent = null;

                if ($item.length) {
                  height = $item.outerHeight();

                  $item.fadeOut(400, 'swing', function () {
                    // If deleting last comment in a row, shift class to prev comment
                    if ($item.hasClass('lb-comment-last')) {
                      $item.prev('.lb-comment').addClass('lb-comment-last');
                    }

                    // Decrement the parent's comments count
                    if ($item.hasClass('lb-comment')) {
                      $parent = $item.prevAll('.lb-post:not(.lb-comment):first');
                      $parent.data('comments', $parent.data('comments') - 1);

                      // Remove the comments label, if not needed
                      if ($parent.data('comments') === 0) {
                        $parent.find('.lb-post-comments-label').remove();
                      }
                    }

                    $item.remove();

                    // Adjust scroll position so doesn't shift after removing an item
                    if (height && scrollTop) {
                      $posts.scrollTop(scrollTop - height);
                    }
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
               * @param {Function|null} completeCallback An optional callback to call when complete
               */
              addItems = function (items, completeCallback) {
                items = items || [];

                var len = items.length,
                  self = this,
                  chunkSize = 10,
                  chunksTotal = Math.ceil(len / chunkSize),
                  chunkNum = 0,
                  
                  /* 
                   * On first update, add from top-down, so can see 
                   * posts right away. After first update, add from 
                   * bottom-up as usual. 
                   */
                  addToTop = receivedFirstUpdate,
                  
                  /*
                   * Add one item to the DOM
                   */
                  addOne = function (i, item) {    
                    // Add item to the DOM
                    addItem(item, addToTop);
  
                    // Update the begin and end times
                    if (item.type !== 'comment' && item.date) {
                      var timestamp = item.date.getTime();
                      beginTime = Math.min(beginTime, timestamp);
                      endTime = Math.max(endTime, timestamp);
                    }
                  },
                  
                  /*
                   * Add a chunk of items to the DOM at a time, based on 
                   * chunkSize. Fire off completeCallback when 
                   * all chunks have been added.
                   */
                  addChunk = function () {
                    
                    $(items.splice(0, chunkSize)).each($.proxy(addOne, self));
                    
                    /*
                     * Load images after adding the first chunk, if is first 
                     * update, so can see content as soon as possible.
                     */ 
                    if (chunkNum === 0 && !receivedFirstUpdate) {
                      onLoadImages();
                    }
                    
                    // Add next chunk
                    if (items.length) {
                      setTimeout(addChunk, 0);
                      //addChunk();
                    
                    // No more items left, execute calback  
                    } else if (completeCallback) {
                      completeCallback();
                    }
                    
                    chunkNum++;
                  };

                // Queue up older updates, if pagination enabled and post
                // container is empty
                if (pageSize > 0 && len > pageSize && !pendingUpdates.length && !$posts.children('.lb-post').length) {

                  pendingUpdates = items.splice(0, len - pageSize);

                  $posts.append($('<a />', {
                    'class': 'lb-more-button lb-button',
                    text: 'Show earlier posts'
                  }))
                  .click($.proxy(onMoreButtonClicked, this));
                }
                
                // If first update, load items top-down, to see content sooner
                if (!receivedFirstUpdate) {
                  items.reverse();
                }
                
                // Add first chunk. Executes in setTimeout so loading large 
                // datasets won't block other UI from loading.
                setTimeout(addChunk, 0);
              },
              
              /**
               * Add all pending updates to the DOM
               */
              addPendingUpdates = function () {
                var len = pendingUpdates.length;
                if (len) {
                  $(pendingUpdates).each(function (i, item) {
                    addItem(item);
                  });
                }
              },

              /**
               * The 'more' button was clicked, to show the next page of paginated items.
               * @param {Event} event
               */
              onMoreButtonClicked = function (event) {
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
              },

              /**
               * Scroll the post container to position the given post item at the top.
               * @param {String} id The id of post item to scroll to.
               * @returns {Object} The jQuery object for the target item.
               */
              goToItem = function (id) {
                var $post = $('#p' + id, $posts);

                scrolling = true;

                if ($post.length) {
                  // Scroll to top of this post
                  $posts.stop().animate({
                    'scrollTop': $post.get(0).offsetTop
                  }, {
                    duration: 'fast',
                    complete: function () {
                      scrolling = false;
                    }
                  });
                }

                return $post;
              },

              /**
               * Find the post item nearest to the given timestamp.
               * @param {Number} timestamp The timestamp to compare, as generated from Date.getTime()
               * @returns {Object|null} The jQuery object found with the nearest
               *   match to the given timestamp, or null if not found.
               */
              getNearestItemByTime = function (timestamp) {
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
              },

              /**
               * Formats a Date object into a simple string; ex: "9/27/2012, 10:44am"
               * @param {Date} dateObj The Date object to format.
               * @returns {String} Formatted date/time string.
               */
              getFormattedDateTime = function (dateObj) {
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
              },

              /**
               * Return a Tweet Button according to the specs here:
               * @see https://twitter.com/about/resources/buttons#tweet
               * @param {String} id The post item id
               * @param {String} text The text to include in the tweet
               */
              makeTweetButton = function (id, text) {
                var href = window.location.href.replace(/\#.*$/, ''),

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
              },

              /**
               * Return boolean whether the given image url is allowed
               * thumbnail generation, based on options.thumbnailExlcudeFilter.
               * @param {String} url The thumbnail image url
               * @returns {Boolean} Whether to allow thumbnail generation for image
               */
              imageThumbnailAllowed = function (url) {
                var allow = true,
                  filters, pattern;

                if (url && options.thumbnailExcludeFilter) {
                  filters = String(options.thumbnailExcludeFilter).split(/\s*,\s*/i);

                  $.each(filters, function (i, filter) {
                    if (filter) {
                      pattern = new RegExp(filter, 'i');
                      if (pattern.test(url)) {
                        allow = false;
                        return false;
                      }
                    }
                  });
                }

                return allow;
              },

              /**
               * Modify the pendingUpdates array. If item is provided, replaces
               *   existing with that item; if item not provided then deletes item from list.
               *
               * @param {String} id The post item id of the item to modify
               * @param {Object|null} item The new item to use, or null to remove it
               */
              modifyPendingUpdate = function (id, item) {
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
              },

              /**
               * Pause button was clicked
               * @param {Event} event
               */
              onPausedButtonClicked = function (event) {
                var $button = $(event.target);

                if (paused) {
                  start();
                  $button.text('Pause').attr('title', 'Stop receiving updates');
                  $toolbar.removeClass('lb-status-paused');
                } else {
                  stop();
                  $button.text('Resume').attr('title', 'Resume receiving updates');
                  $toolbar.addClass('lb-status-paused');
                }

                updateStatusLabel();
              },
              
              /**
               * Hide the pause button, update status label
               * @param {Boolean} enabled Whether the status label is enabled; default is null
               */
              hidePauseButton = function (enabled) {
                $('.lb-pause-button', $this).hide();
                updateStatusLabel(enabled);
              },
              
              /**
               * Show the pause button, update status label
               */
              showPauseButton = function () {
                $('.lb-pause-button', $this).show();
                updateStatusLabel();
              },

              /**
               * Start/resume the API, so polls for updates
               */
              start = function () {
                $this.liveUpdateApi('play');
                paused = false;
              },

              /**
               * Pause the API, so no polling occurs
               */
              stop = function () {
                $this.liveUpdateApi('pause');
                paused = true;
              },

              /**
               * Update the blog status indicator based on its paused state.
               * @param {Boolean} enabled Whether the status should be visible or not.
               */
              updateStatusLabel = function (enabled) {
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
              },

              /**
               * Setup the slider controls parameters, update position
               */
              initSlider = function () {
                if ($slider) {
                  // Set the min and max values
                  $slider.slider('option', {
                    min: beginTime,
                    max: endTime,
                    disabled: false
                  });
                  // Update the slider based on latest scroll position
                  onContainerScroll(null);
                }
              },

              /**
               * Update the slider label's text
               */
              updateSliderLabel = function (value) {
                if ($slider) {
                  value = value || $slider.slider('value');

                  var timeObj = new Date(value),
                    timeStr = getFormattedDateTime(timeObj);

                  $('.lb-timeline-label', $toolbar).text(timeStr);
                }
              },

              /**
               * Set the slider's value, which sets its position, and update the label
               */
              setSliderValue = function (value) {
                if ($slider) {
                  $slider.slider('value', value);
                  updateSliderLabel();
                }
              },

              /**
               * Return the top most visible post item in the scrollable container
               * @returns {Object|null} jQuery object of top most visible item, or null if not found
               */
              getTopVisibleItem = function (container) {
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
              },
              
              /**
               * Check whether a post item is visible in the scroll container.
               * 
               * @param {Element} item The element for the post item
               * @param {Boolean} full Whether to require an item's full 
               *   height to check if visible, versus any part of it; default is false
               * @param {Number} distance The distance in pixels of an item 
               *   to check if visible; only useful if full is false; default is 0
               * @returns {Boolean} Whether the item is considered visible
               */
              isItemVisible = function (item, full, distance) {
                item = $(item);
                full = full != null ? full : false;
                distance = distance != null ? distance : 0;
                
                var containerHeight = $posts.height(),
                  height = item.height(),
                  positionTop = item.position().top,
                  positionBottom = positionTop + height;
                  
                if (full === true) {
                  distance = height;
                }
                /*
                console.log({
                  id: item.attr('id'),
                  height: height,
                  positionTop: positionTop,
                  positionBottom: positionBottom,
                  containerHeight: containerHeight,
                  distance: distance
                });
                */
               
                return (positionBottom > distance && positionTop < (containerHeight - distance));
              },

              /**
               * On container scroll event, set slider value based on the top most visible post item
               */
              onContainerScroll = function (event) {
                var $topItem = getTopVisibleItem($posts);

                if ($topItem) {
                  if (!$topItem.hasClass('lb-top')) {
                    $posts.children('.lb-top').removeClass('lb-top');
                    $topItem.addClass('lb-top');
                  }

                  if (!scrolling) {
                    setSliderValue($topItem.data('date'));
                  }
                }

                if ($posts.scrollTop() === 0) {
                  updateUnreadItems(0);
                }
              },

              /**
               * As slider is moving, update the label and scroll position
               */
              onSliderMove = function (event, ui) {
                updateSliderLabel(ui.value);

                var $item = getNearestItemByTime(ui.value);
                if ($item) {
                  //$posts.find('.highlight').removeClass('highlight');
                  //$item.addClass('highlight');
                  goToItem($item.attr('id').substr(1));
                }
              },

              /**
               * Update the unreadItemCount prop, and update the badge UI
               */
              updateUnreadItems = function (num) {
                unreadItemCount = num;

                // Update the unread count UI element
                $unreadCount.html('<b>' + num + '</b> new update' + (num !== 1 ? 's' : ''))
                .toggle(num > 0);

                // Show/hide the alert box based on its contents
                if (num > 0) {
                  $alert.slideDown(300);
                } else if (!Boolean(options.tagFilter)) {
                  $alert.slideUp(300);
                }
              },

              /**
               * Clear the tag filter and reset view to show all updates
               */
              clearTagFilter = function () {
                options.tagFilter = '';
                // Use a dummy hash, because '#' alone is equivalent to _top,
                // which scrolls the page
                window.location.hash = '_';
                $this.liveUpdateApi('reset');
                $this.unbind('end update');
                $this.trigger('begin');
              },
              
              /**
               * Load all images under a DOM container, by setting their 'src' 
               * attributes to the 'data-src' value.
               * 
               * @param {jQuery} container Optional DOM element to serach under 
               *   for images; defaults to .lb-post-container
               */
              loadImages = function (container) {
                container = $(container || $posts);
                
                container.find('img[data-src]').each(function (i, img) {
                  var $img = $(img);
                  $img.attr('src', $img.attr('data-src'))
                    .removeAttr('data-src')
                    .removeClass('lb-pending');
                });
              },
              
              /**
               * Iterate over all post items, and load their images, if they 
               * haven't already loaded.
               */
              onLoadImages = function (event) {
                var lastVisible = false;
                
                $posts.children('.lb-post').each(function (i, item) {
                  var $item = $(item);
                  
                  if (!$item.data('imagesLoaded')) {
                    // Load images if item is visible
                    if (isItemVisible($item, false, -500)) {
                      loadImages($item);
                      $item.data('imagesLoaded', true);
                      lastVisible = true;
                    
                    // Exit loop if encounter first invisible item  
                    } else if (lastVisible) {
                      return false;
                    }
                  }
                });
              },
              
              /**
               * Callback executed after all items have been added to DOM.
               * Processes new items in DOM, and acts on change and delete events.
               * Once completed, then loads images.
               * 
               * @param {Object} data The data sent from the server
               */
              onAddItemsComplete = function (data) {
                var hash = window.location.hash,
                  newUnreadItems = 0;
  
                if (data.updates) {
                  if (options.postLimit) {
                    var posts = $posts.find('.lb-post');
  
                    if (posts.length > options.postLimit) {
                      var numberToRemove = posts.length - options.postLimit;
                      posts.slice(-numberToRemove).remove();
                    }
                  }
  
                  // Update the slider's range and position
                  initSlider();
  
                  if (receivedFirstUpdate) {
                    // If container is scrolled, record all updates as new
                    if ($posts.scrollTop() > 0) {
                      newUnreadItems = data.updates.length;
  
                    // If container isn't scrolled but is showing tag filter view,
                    // only record new items not in this view as new
                    } else if (options.tagFilter) {
                      $.each(data.updates, function (i, item) {
                        if (!item.tags || (item.tags && $.inArray(options.tagFilter, item.tags) === -1)) {
                          newUnreadItems += 1;
                        }
                      });
                    }
                    // Update the unread count
                    if (newUnreadItems > 0) {
                      updateUnreadItems(unreadItemCount + newUnreadItems);
                    }
                  
                  // Add pending updates: if first update, AND pendingUpdates exist, AND pagination is disabled
                  } else if (pendingUpdates.length && pageSize === 0) {
                    addPendingUpdates();
                  }
                }
  
                if (data.changes) {
                  $(data.changes).each(function (i, item) {
                    updateItem(item);
                  });
                }
  
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
                    startPosition,
                    postPosition = hash.indexOf('p'),
                    $targetItem;
  
                  // If first char is a 'p'
                  if (postPosition === 1) {
                    startPosition = postPosition + 1;
                    // Note assumption that the hash ONLY contains an ID
                    id = hash.substring(startPosition, hash.length);
  
                    $targetItem = goToItem(id);
  
                    // Scroll post container to top of main window, if permalink was valid
                    if ($targetItem.length) {
                      $(window).scrollTop($posts.offset().top);
                    }
                  }
                }
                
                setTimeout(function () {
                  onLoadImages();
                }, 0);
  
                receivedFirstUpdate = true;
                
                // Start polling again, if previously marked to pausedOnUpdate
                if (paused && pauseOnUpdate) {
                  pauseOnUpdate = false;
                  start();
                  showPauseButton();
                }
              };

            /*
             *  Setup the UI structure
             */

            $this.addClass('lb');

            if (options.toolbarEnabled) {
              $this.append(
                $toolbar = $('<div />', {
                  'class': 'lb-toolbar'
                })
                .append(
                  $('<a />', {
                    'class': 'lb-pause-button lb-button',
                    'text': 'Pause',
                    'title': 'Stop receiving updates'
                  })
                  .bind('click', $.proxy(onPausedButtonClicked, this))
                )
              );

              if (options.timelineEnabled) {
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
                )
                .appendTo($toolbar);
              }

              $status = $('<span />', {
                  'class': 'lb-status'
                }
              )
              .hide()
              .appendTo($toolbar);

              if ($slider) {
                $slider.slider({
                  slide: onSliderMove,
                  disabled: true
                });
              }
            }

            $alert = $('<div />', {
              'class': 'lb-alert'
            })
            .appendTo($this)
            .append(
              $unreadCount = $('<a />', {
                'class': 'lb-unread-count',
                title: 'Jump to newest update'
              })
              .hide()
              .click(function (event) {
                event.preventDefault();

                if (!options.tagFilter) {
                  $posts.stop().animate({
                    'scrollTop': 0
                  }, {
                    duration: 'fast'
                  });
                } else {
                  clearTagFilter();
                }
              })
            )
            .hide();

            if (options.tagFilter) {
              $alert.show()
              .append(
                $tagFilter = $('<span />', {
                  'class': 'lb-tag-filter',
                  html: 'Showing all updates with the <b>' + options.tagFilter + '</b> tag. '
                })
              );

              $clearTagFilter = $('<a />', {
                href: '#',
                text: 'View all updates'
              })
                .appendTo($tagFilter)
                .bind('click', function (event) {
                  event.preventDefault();

                  clearTagFilter();
                });
            }

            $posts = $('<div />', {
              'class': 'lb-post-container'
            })
            .appendTo($this)
            .scroll($.throttle(250, onContainerScroll))
            .scroll($.debounce(100, onLoadImages));

            if (options.height && options.height > 0) {
              $posts.height(options.height);
            }

            // Bind to API 'update' events
            $this.bind('update', function (event, data) {
              
              // If is first update, and not paused, temporarily stop polling
              if (!receivedFirstUpdate && !paused) {
                pauseOnUpdate = true;
                stop();
                hidePauseButton();
              }
              
              //console.log('update', event, data);
              if (data.updates) {

                if (options.postLimit) {
                  if (options.postLimit < data.updates.length) {
                    data.updates.splice(0, data.updates.length - options.postLimit);
                  }
                }

                // Init the begin time if not set yet
                if (beginTime === 0) {
                  beginTime = (new Date()).getTime();
                }

                // Add items to the DOM
                addItems(data.updates, function () { 
                  onAddItemsComplete(data);
                });
              } else {
                onAddItemsComplete(data);
              }
            });

            // API fires 'end' event when the set time is reached to stop polling
            $this.bind('end', function (event) {
              hidePauseButton(false);
            });

            // If not alive, or already reached end time
            if (options.alive === false || (options.end && options.end <= new Date())) {
              hidePauseButton(false);

            // else is alive and kickin'
            } else {
              paused = false;
              updateStatusLabel();
            }

          });

          $this.delegate('.tag', 'click', function (event) {
            options.tagFilter = $(event.currentTarget).text();
            $this.liveUpdateApi('reset');

            // Manually clean up some bindings
            // TODO: separate building UI from event binding
            $this.unbind('end update');

            $this.trigger('begin');
            //$this.find('.lb-post-container').scrollTop('0');
          });

          $this.delegate('img:not(.lb-profile-image)', 'click', function (event) {
            var $currentTarget = $(event.currentTarget),
              fullImageUrl = $currentTarget.attr('data-full-src'),
              imgSrc = (fullImageUrl) ? fullImageUrl : $currentTarget.attr('src'),
              $loadingContainer = $('<div />', {
                'class': 'lb-img-loading'
              }),
              $loadingMessage = $('<span />', {
                html: 'Loading&hellip;'
              }),
              $img = $('<img />', { src: imgSrc }),
              $imgDisplay = $('<div />')
                .prependTo('body');

            $loadingContainer.insertBefore($currentTarget);
            $currentTarget.detach().appendTo($loadingContainer);

            $loadingMessage.appendTo($loadingContainer)
              .hide()
              .fadeIn('fast');

            // Use images loaded plugin
            // https://github.com/desandro/imagesloaded
            $img.imagesLoaded(function () {
              var $win = $(window),
                windowPadding = 100,
                maxWidth = $win.width() - windowPadding,
                maxHeight = $win.height() - windowPadding;

              // Remove the loading message
              $currentTarget.detach().insertAfter($loadingContainer);
              $loadingContainer.remove();
              // Append the full-size image
              $imgDisplay.append($img);

              // TODO: The following two image resizing blocks aren't very DRY.
              // Think about ways to refactor.

              // If the image is wider than the window
              if ($img.width() > maxWidth) {
                // Restrict its width
                $img.width(maxWidth);

                // If the image is still taller than the window
                if ($img.height() > maxHeight) {
                  // Restrict its height
                  $img.height(maxHeight);
                  // Remove the width restriction, so that the aspect ratio
                  // will be correct
                  $img.width('');
                }
              }

              // If the image is taller than the window
              if ($img.height() > maxHeight) {
                // Restrict its height
                $img.height(maxHeight);

                // If the image is still wider than the window
                if ($img.width() > maxWidth) {
                  // Restrict its width
                  $img.width(maxWidth);
                  // Remove the height restriction, so that the aspect ratio
                  // will be correct
                  $img.height('');
                }
              }

              $imgDisplay.dialog({
                height: 'auto',
                modal: true,
                //title: $currentTarget.attr('alt'),
                width: 'auto',
                dialogClass: 'lb-image-dialog',
                zIndex: 9000
              });

              // If the user clicks outside the dialog, close it
              $('.ui-widget-overlay').bind('click', function (event) {
                $imgDisplay.dialog('destroy');
              });

            });

          });

          // If IE 6 (or lower... oh dear)
          if ($.browser.msie && parseInt($.browser.version, 10) <= 6) {
            // Add .lb-hover class upon hover
            $this.delegate('.lb-button', 'hover', function (event) {
              $(this).toggleClass('lb-hover');
            });
          }

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
          $this.liveUpdateApi(options);

        }

      };

    return this.each(function () {
      customOptions = customOptions || {};
      liveUpdateUi(customOptions);
    });

  };

}(jQuery));
