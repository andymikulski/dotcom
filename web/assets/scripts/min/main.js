/**
        * requestAnimationFrame shim
        * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
        * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
        * MIT license
        */

var __extends;define("core/logger",["require","exports"],function(){var t;return function(t){function o(){var t,o=[];for(t=0;t<arguments.length-0;t++)o[t]=arguments[t+0];s.push(o),window.console&&window.console.log&&c&&window.console.log(Array.prototype.slice.call(o))}function n(){return s}function e(){for(var t in s)s.hasOwnProperty(t)&&window.console.log(s[t])}function i(t){if(t===!0){if(window&&window.console){window.debug_log.hasOwnProperty("ogLog")||(window.debug_log.ogLog=window.console.log);var o=window.console.log;window.console.log=function(){var t,n=new Error;return n&&n.stack?(t=[].slice.apply(arguments).concat(["\n	"+n.stack.split(/\n/)[3].trim()]),o.apply(this,t)):o(arguments)}}}else window.debug_log.hasOwnProperty("ogLog")&&(window.console.log=window.debug_log.ogLog)}var r,s=[],a=$(document.body),c=a.attr("data-debug")&&"true"===a.attr("data-debug")?!0:!1,d=a.attr("data-debug-lines")&&"true"===a.attr("data-debug-lines")?!0:!1,l=0;t.log=o,t.getHistory=n,t.printHistory=e,function(t){function n(){return u?(ga?(o("Analytics : init : UA-58463-9"),ga("create","UA-58463-9","auto"),ga("send","pageview"),s()):o("Analytics : init - no ga!"),void(f=!0)):void o("Analytics : IS_ENABLED is false, not init'ing")}function e(t,e,i,r){if(u){if(f||n(),o("Analytics : track",t,e,i,r),"boolean"==typeof r&&r===!0&&i){var s=encodeURIComponent(t+e+i),a=d[s];d.hasOwnProperty(s)?(a=parseInt(a,10)+1,r=a):(d[s]=1,r=1)}o("Analytics : track variables",t,e,i,r),ga&&t&&e&&(i&&r?ga("send","event",t,e,i,r):i&&!r?ga("send","event",t,e,i):ga("send","event",t,e))}}function i(){u&&(f||n(),ga&&(o("Analytics : pageview",window.location),ga("send","pageview")))}function r(){return s()}function s(){u&&$("[data-analytics]").not("[data-analytics-count]").on("click",a).attr("data-analytics-count",0)}function a(t){var n=$(t.currentTarget),i=parseInt(n.attr("data-analytics-count"),10),r=(n.attr("data-analytics")||"").replace(/\n/g," ").split("|"),s=!1;switch(i+=1,r.length){default:o("Analytics : Fragment click has less than two or more than four tracking parameters",t.currentTarget,r),s=!0;break;case 2:e(r[0],r[1]);break;case 3:e(r[0],r[1],r[2]);break;case 4:e(r[0],r[1],r[2],i)}s||n.attr("data-analytics-count",i)}function c(t,o,n,i){return l+=1,e("dev","error",o+n+(n?" - "+n+(i?" - "+i:""):""),l),!1}var d={},u=("true"===$(document.body).attr("data-enable-analytics")?!0:!1)||!1,f=!1;t.init=n,t.track=e,t.pageview=i,t.refresh=r,t.bindClickFragments=s,t.onFragmentClick=a,t.logError=c}(t.Analytics||(t.Analytics={})),r=t.Analytics,window.debug_log=window.debug_log||{printHistory:e,historyLog:s,force:function(t,o){"undefined"==typeof o&&(o=!1),c=t,o===!0&&t===!0?i(o):(t===!1||o===!1)&&i(!1)}},window.onerror=function(t,o,n,e,i){return r.logError(t,o,n,e,i)},i(d),o("Logger : Constructor")}(t||(t={})),t}),define("core/windowController",["require","exports","core/logger"],function(t,o,n){var e;return function(t){function o(){p("WindowController : init"),e(),i(),v=b=!0,r()}function e(){h.on("scroll",function(){v=!0}),h[0].onorientationchange=function(){b=!0,v=!0},h[0].orientationchange=function(){b=!0,v=!0},h.on("resize",function(){v&&"ontouchstart"in window?(v=!0,b=!0):(b=!0,v=!0)})}function i(){var t,o=0,n=["ms","moz","webkit","o"];for(t=0;t<n.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[n[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n[t]+"CancelAnimationFrame"]||window[n[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=+new Date,e=Math.max(0,16-(n-o)),i=window.setTimeout(function(){t(n+e)},e);return o=n+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}function r(){s(),window.requestAnimationFrame(r)}function s(t){if(t||b||v){if(C=null,E=null,_=h.scrollTop(),S=h.width(),x=h.height(),A=S*x,!t&&m===_&&y===A)return void(v=b=!1);for(var o=g.length;o>0;--o)C=g[o-1],E=C.type,("scroll"===E&&(t||v&&_!==m)||"resize"===E&&(t||b&&A!==y))&&C.fn.apply(C.context,[{winWidth:S,winHeight:x,scrollTop:_,scrollBottom:_+x}]);(t||m!==_)&&(m=_),(t||y!==A)&&(y=A),v=b=!1}}function a(t,o,n){var e=(+new Date+99999*Math.random()).toFixed(0);return p("WindowController : bind",t,n,e),g.push({type:t,fn:o,context:n,id:e}),f&&clearTimeout(f),f=setTimeout(function(){s(!0)},w),e}function c(t,o,n){return a(t,o,n)}function d(t){var o,n;if("undefined"!=typeof t){for(n=g.length;n>0;--n)if(o=g[n-1],o.id===t)return g.splice(n-1,1),p("WindowController : unbind",!0),!0;return p("WindowController : unbind",!1,t,g),!1}}function l(t){return d(t)}function u(t){switch(p("WindowController : trigger",t),t){case"resize":b=!0;break;case"scroll":v=!0}s(!0)}var f,p=n.log,h=$(window),g=[],w=100,m=-1,y=-1,v=!1,b=!1,C=null,_=null,S=null,x=null,E=null,A=null;t.init=o,t.bind=a,t.on=c,t.unbind=d,t.off=l,t.trigger=u,p("WindowController : Constructor")}(e||(e={})),e}),define("core/walt",["require","exports","core/logger"],function(t,o,n){var e,i;!function(t){var o,n;!function(t){function o(t,o,n){var e,i,r=parseFloat(n);return 1/0===r||-1>=r||isNaN(r)?-1:(e=parseFloat(t),t.indexOf("ms")>0||t.indexOf("ms")<0&&t.indexOf("s")<0||t.indexOf("s")>0&&(e*=1e3),i=parseFloat(o),o.indexOf("ms")>0||o.indexOf("ms")<0&&o.indexOf("s")<0||o.indexOf("s")>0&&(i*=1e3),parseInt(e,10)+parseInt(i,10))}t.realAnimTime=o}(t.Math||(t.Math={})),o=t.Math,function(t){function o(){var t,o,n=document.body||document.documentElement,e=n.style,i="animation";if("string"==typeof e[i])return!0;for(t=["moz","Moz","webkit","Webkit","ms","Ms"],i=i.charAt(0).toUpperCase()+i.substr(1),o=0;o<t.length;o++)if("string"==typeof e[t[o]+i])return!0;return!1}function n(t,o){var n=e("delay",t.delay?t.delay:o.delay),r=e("duration",t.duration?t.duration:o.duration),s=e("direction",t.direction?t.direction:o.direction),a=e("iteration-count",t.count?t.count:o.count),c=e("fill-mode",t.fill?t.fill:o.fill),d=e("timing-function",t.timing?t.timing:o.timing);return i(n,r,s,a,c,d)}function e(t,o){var n,e,i;for("fill-mode"!==t&&"direction"!==t&&"timing-function"!==t&&o.indexOf("s")<0&&o.indexOf("ms")<0&&(o+="ms"),n={},e=["moz","webkit","ms"],n["animation-"+t]=o,i=0;i<e.length;i++)n["-"+e[i]+"-animation-"+t]=o;return n}function i(){var t,o,n,e,i,r=[];for(t=0;t<arguments.length-0;t++)r[t]=arguments[t+0];for(o={},e=0;e<r.length;e++){n=r[e];for(i in n)n.hasOwnProperty(i)&&!o.hasOwnProperty(i)&&(o[i]=n[i])}return o}t.supportsAnimations=o,t.createCSS=n}(t.CSS||(t.CSS={})),n=t.CSS}(e||(e={})),function(t){function o(){return d}function i(o){var n,e,i,s;return o.hasOwnProperty("el")?(n=o.el instanceof $?o.el:$(o.el),o.hasOwnProperty("animation")&&""!==o.animation?(e=c.CSS.createCSS(o,t.DEFAULTS),o.hasOwnProperty("onBefore")&&o.onBefore(n),i=l.hasClass("no-focus"),navigator.userAgent.indexOf("Safari")>-1&&navigator.userAgent.indexOf("Chrome")<=-1&&(i=!1),!d||i?o.hasOwnProperty("fallback")?o.fallback(n,function(){return r(n,o)}):(n.addClass(i?"walt-animate "+o.animation:"walt-animate"),r(n,o)):n.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){return r(n,o)}).css(e).addClass("walt-animate "+o.animation),void(o.hasOwnProperty("useTimeout")&&o.useTimeout===!0&&(s=c.Math.realAnimTime(o.duration||t.DEFAULTS.duration,o.delay||t.DEFAULTS.delay,o.count||t.DEFAULTS.count),s>=0&&window.setTimeout(function(){return r(n,o)},1.15*s)))):void console.warn("Walt - no Animation provided in animate")):void console.warn("Walt - no El provided in animate")}function r(t,o){t.off("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd"),t.hasClass("walt-animate")&&(t.removeClass("walt-animate").removeClass(o.animation),o.hasOwnProperty("onComplete")&&o.onComplete(t))}function s(){function t(t){var e="no-focus",i="in-focus",r={focus:e,focusin:e,pageshow:e,blur:i,focusout:i,pagehide:i};t=t||window.event,t.type in r?(o.removeClass(e+" "+i),o.addClass(r[t.type])):(o.removeClass(e+" "+i),o.addClass(this[n]?e:i))}var o,n;"ontouchstart"in window||(o=$(document.body),n="hidden",n in document?document.addEventListener("visibilitychange",t):(n="mozHidden")in document?document.addEventListener("mozvisibilitychange",t):(n="webkitHidden")in document?document.addEventListener("webkitvisibilitychange",t):(n="msHidden")in document?document.addEventListener("msvisibilitychange",t):"onfocusin"in document?document.onfocusin=document.onfocusout=t:window.onpageshow=window.onpagehide=window.onfocus=window.onblur=t)}var a=n.log,c=e,d=c.CSS.supportsAnimations(),l=$(document.body);t.DEFAULTS={el:$(document.body||document.documentElement),animation:"",delay:"0s",duration:"1s",count:"0",fill:"both",direction:"normal",timing:"ease",useTimeout:!1},t.supportsAnimations=o,t.animate=i,s(),a("Walt : Constructor")}(o.Walt||(o.Walt={})),i=o.Walt}),__extends=this.__extends||function(t,o){function n(){this.constructor=t}for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);n.prototype=o.prototype,t.prototype=new n},define("core/base",["require","exports","core/logger","core/windowController","core/walt"],function(t,o,n,e,i){var r,s,a=function(){function t(){this.log=n.log,this.Analytics=n.Analytics}return t}();o.Loggable=a,r=function(t){function o(o){t.call(this),this.$html=$("html"),this.$window=$(window),this.$body=$(document.body),this.WindowController=e,this.WINDOW_BINDINGS=[],this.Walt=i.Walt,o&&o.length&&(this.$root=o)}return __extends(o,t),o.prototype.unbindWindow=function(){for(var t=this.WINDOW_BINDINGS.length;t>0;--t)this.WindowController.unbind(this.WINDOW_BINDINGS.pop())},o.prototype.bindWindowEvent=function(t,o){this.WINDOW_BINDINGS.push(this.WindowController.on(t,o,this))},o.prototype.dispose=function(){this.unbindWindow()},o}(a),o.SiteObject=r,s=function(t){function o(o){t.call(this,o),this.EVENT_BINDINGS={},this.$root.data("app-widget")||this.$root.data("app-widget",this)}return __extends(o,t),o.prototype.bind=function(t,o){this.EVENT_BINDINGS.hasOwnProperty(t)?this.EVENT_BINDINGS[t].push(o):this.EVENT_BINDINGS[t]=[o]},o.prototype.on=function(t,o){return this.bind(t,o)},o.prototype.onEvents=function(t,o){if(this.EVENT_BINDINGS.hasOwnProperty(t))for(var n=0;n<this.EVENT_BINDINGS[t].length;n++)this.EVENT_BINDINGS[t][n](o)},o.prototype.emit=function(t,o){return this.onEvents(t,o)},o.prototype.dispose=function(){t.prototype.dispose.call(this),this&&this.$root&&(this.$root.find("*").unbind(),this.$root.unbind())},o}(r),o.Widget=s}),__extends=this.__extends||function(t,o){function n(){this.constructor=t}for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);n.prototype=o.prototype,t.prototype=new n},define("widgets/ContentList",["require","exports","core/base"],function(t,o,n){var e=function(t){function o(o){t.call(this,o),this.log("ContentList : Constructor"),this.init()}return __extends(o,t),o.prototype.init=function(){var t=this;t.log("ContentList : Init"),$(".filler").height(t.$window.height()),t.bindWindowEvent("resize",t.onResizeEvent)},o.prototype.onResizeEvent=function(){$(".filler").height(this.$window.height())},o}(n.Widget);return e}),__extends=this.__extends||function(t,o){function n(){this.constructor=t}for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);n.prototype=o.prototype,t.prototype=new n},define("widgets/ContentItem",["require","exports","core/base"],function(t,o,n){var e=function(t){function o(o){t.call(this,o),this.log("ContentItem : Constructor"),this.init()}return __extends(o,t),o.prototype.init=function(){var t=this,n=t.$window.height();return t.log("ContentItem : Init"),t.$root.css("background-color","rgb("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+")"),t.$root.css("max-height",n),window.hasOwnProperty("ontouchstart")?void t.$root.height(n):(t.offset=t.$root.offset().top,t.offsetBottom=t.offset+t.$root.height(),t.originalHeight=t.$root.height(),t.MAX_HEIGHT=n>o.DEFAULT_MAX_HEIGHT?.9*n:o.DEFAULT_MAX_HEIGHT,t.PEAK_RATIO=.1,t.bindWindowEvent("resize",t.onResizeEvent),t.bindWindowEvent("resize",t.onScrollEvent),void t.bindWindowEvent("scroll",t.onScrollEvent))},o.prototype.onResizeEvent=function(){this.offset=this.$root.offset().top,this.offsetBottom=this.offset+this.$root.height()},o.prototype.onScrollEvent=function(t){var o=this,n=o.$root.height();t.scrollBottom>=o.offset&&o.$root.height(t.scrollBottom>=o.offsetBottom?n<=o.MAX_HEIGHT?n+(t.scrollBottom-o.offsetBottom):o.MAX_HEIGHT:n>o.originalHeight?n+(t.scrollBottom-o.offsetBottom):o.originalHeight),o.offset=o.$root.offset().top*(1-o.PEAK_RATIO),o.offsetBottom=(o.offset+o.$root.height())*(1+o.PEAK_RATIO)},o.DEFAULT_MAX_HEIGHT=500,o}(n.Widget);return e}),__extends=this.__extends||function(t,o){function n(){this.constructor=t}for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);n.prototype=o.prototype,t.prototype=new n},define("widgets/SplashTitle",["require","exports","core/base"],function(t,o,n){var e=function(t){function o(o){t.call(this,o),this.log("SplashTitle : Constructor"),this.init()}return __extends(o,t),o.prototype.init=function(){var t=this;t.rootHeight=t.$window.height()/1.5,t.textSpeed=-150,window.hasOwnProperty("ontouchstart")||t.bindWindowEvent("scroll",t.onScrollEvent)},o.prototype.onScrollEvent=function(t){var o=this,n=t.scrollTop/(.9*o.rootHeight);return n>=1?void o.$root.hide():void o.$root.show().css({opacity:1-n,"-webkit-transform":"translateY("+n*o.textSpeed+"px)","-moz-transform":"translateY("+n*o.textSpeed+"px)",transform:"translateY("+n*o.textSpeed+"px)"})},o}(n.Widget);return e}),__extends=this.__extends||function(t,o){function n(){this.constructor=t}for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);n.prototype=o.prototype,t.prototype=new n},define("widgets/StickyThing",["require","exports","core/base"],function(t,o,n){var e=function(t){function o(o){t.call(this,o),this.log("StickyThing : Constructor"),this.init()}return __extends(o,t),o.prototype.init=function(){var t=this;t.$clone=t.$root.clone(!1),t.$clone.addClass("sticky-thing__clone"),t.$root.after(t.$clone),t.$offsetParent=t.$root.offsetParent(),t.offsetTop=t.$root.offset().top,window.hasOwnProperty("ontouchstart")||t.bindWindowEvent("scroll",t.onScrollEvent)},o.prototype.onScrollEvent=function(t){var o=this;o.$root.css("opacity",t.scrollTop/(1.1*o.offsetTop)),o.$clone.css("opacity",t.scrollTop/(1.1*o.offsetTop)),t.scrollTop>o.$offsetParent.offset().top+o.$offsetParent.height()-o.$root.height()?o.$clone.addClass("is-bottom"):t.scrollTop>o.offsetTop?(o.$root.css("visibility","hidden"),o.$clone.show().removeClass("is-bottom")):(o.$root.css("visibility","visibile"),o.$clone.hide())},o}(n.Widget);return e}),__extends=this.__extends||function(t,o){function n(){this.constructor=t}for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);n.prototype=o.prototype,t.prototype=new n},define("widgets/CodeSample",["require","exports","core/base"],function(t,o,n){var e=function(t){function o(o){t.call(this,o),this.log("CodeSample : Constructor"),this.init()}return __extends(o,t),o.prototype.init=function(){var t=this,o=this;o.sidebar=new i(o.$root.find('[sub-widget*="sidebar"]')),o.bindUIButtons(),o.highlightCode(),o.$root.find("code").on("change input focus mousedown keydown",function(){return t.updateCaret()})},o.prototype.highlightCode=function(){if(window.hasOwnProperty("hljs")&&hljs.highlight){var t=this.$root.find("code");t.html(hljs.highlight("javascript",t.text()).value)}},o.prototype.updateCaret=function(){var t,o=0,n=this.$root.find("code")[0];return document.selection?(n.focus(),t=document.selection.createRange(),t.moveStart("character",-n.value.length),o=t.text.length):(n.selectionStart||0===n.selectionStart)&&(o=n.selectionStart),this.log("caret",o),o},o.prototype.bindUIButtons=function(){var t=this;this.$root.find(".buttons .close").unbind().on("click",function(o){return t.onUIButton(o,"close")}),this.$root.find(".buttons .minimize").unbind().on("click",function(o){return t.onUIButton(o,"minimize")}),this.$root.find(".buttons .maximize").unbind().on("click",function(o){return t.onUIButton(o,"maximize")})},o.prototype.onUIButton=function(t,o){var n=this;switch(t&&t.preventDefault&&t.preventDefault(),o){case"close":n.dispose();break;case"minimize":n.$root.hasClass("is-minimized")?n.$root.removeClass("is-minimized"):(n.$root.removeClass("is-maximized").addClass("is-minimized"),n.$body.css("overflow","inherit"));break;case"maximize":n.$root.hasClass("is-maximized")?(n.$root.removeClass("is-maximized"),n.$body.css("overflow","inherit")):(n.$root.removeClass("is-minimized").addClass("is-maximized"),n.$body.css("overflow","hidden"))}},o.prototype.dispose=function(){this.$root.remove(),t.prototype.dispose.call(this)},o}(n.Widget),i=function(t){function o(o){t.call(this,o),this.log("CodeSampleSidebar : Constructor"),this.init()}return __extends(o,t),o.prototype.init=function(){var t=this;t.log("CodeSampleSidebar : init"),t.bindDirectories()},o.prototype.bindDirectories=function(){var t=this;this.log("CodeSampleSidebar : bindDirectories"),this.$root.find(".dir").unbind().on("click",function(o){return t.onDirectoryClick(o)}),this.$root.find(".file").unbind().on("click",function(o){return t.onFileClick(o)})},o.prototype.onDirectoryClick=function(t){t&&t.preventDefault&&t.preventDefault(),t&&t.stopPropagation&&t.stopPropagation(),this.log("CodeSampleSidebar : onDirectoryClick");var o=$(t.target);o.hasClass("dir")||(o=$(t.target).closest(".dir")),o.hasClass("expanded")?o.removeClass("expanded"):o.addClass("expanded")},o.prototype.onFileClick=function(t){t&&t.preventDefault&&t.preventDefault(),t&&t.stopPropagation&&t.stopPropagation(),this.log("CodeSampleSidebar : onFileClick");$(t.currentTarget)},o}(n.Widget);return e}),define("core/factory",["require","exports","core/logger","widgets/ContentList","widgets/ContentItem","widgets/SplashTitle","widgets/StickyThing","widgets/CodeSample"],function(t,o,n,e,i,r,s,a){!function(t){function o(t){p("Factory : init"),f=t||document.body,l()}function c(t,o){$(f).find('[widget="'+o+'"]').each(function(o,n){var e=$(n);e.length&&!e.data("app-widget")?t.init?(t.init(e),e.data("app-widget",t)):e.data("app-widget",new t(e)):e.length&&e.data("app-widget")&&e.data("app-widget")&&e.data("app-widget").refresh&&e.data("app-widget").refresh()})}function d(t){t&&"object"!=typeof t?h[t]&&c(h[t],t):t&&"object"!=typeof t||l()}function l(){p("Factory : initWidgets");for(var t in h)h.hasOwnProperty(t)&&d(t)}function u(t){p("Factory : removeWidgets");$(t||f).find("[widget]").each(function(t,o){var n=$(o),e=n.data("app-widget");e&&e.dispose&&e.dispose()})}var f,p=n.log,h={contentList:e,contentItem:i,splashTitle:r,stickyThing:s,codeSample:a};p("Factory : Constructor"),t.init=o,t.refresh=d,t.removeWidgets=u}(o.Factory||(o.Factory={}));o.Factory}),__extends=this.__extends||function(t,o){function n(){this.constructor=t}for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);n.prototype=o.prototype,t.prototype=new n},define("app",["require","exports","core/base","core/factory"],function(t,o,n,e){var i=function(t){function o(){t.call(this),this.log("App : Constructor")}return __extends(o,t),o.prototype.init=function(){this.log("App : init"),this.checkUserAgent(),this.Analytics.init(),this.Factory=e.Factory,this.Factory.init(),this.WindowController.init()},o.prototype.checkUserAgent=function(){var t,o=this.$html,n=this.$body,e=o.attr("data-ua")||"";(/MSIE/i.test(e)||/Trident\/[0-9\.]+/i.test(e)||window.hasOwnProperty("MSStream"))&&(o.addClass("ie"),/IEMobile/i.test(e)&&o.addClass("ie-mobile")),t=n.attr("data-debug")&&"true"===n.attr("data-debug")?!0:!1,t||(console.time=console.timeEnd=function(){}),"ontouchstart"in window&&o.addClass("is-touch")},o}(n.SiteObject);return i}),define("main",["require","exports","app"],function(t,o,n){var e=function(){function t(){var t=new n;t.init()}return t}();new e});