var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var SplashTitle = (function (_super) {
        __extends(SplashTitle, _super);
        function SplashTitle(_el) {
            _super.call(this, _el);
            this.log('SplashTitle : Constructor');
            this.init();
        }
        SplashTitle.prototype.init = function () {
            var self = this;

            self.thisWidgetRoot = self.$root.attr('widget-root') === 'this';
            self.rootHeight = self.thisWidgetRoot ? self.$root.height() : self.$window.height() / 1.5;
            self.useOpacity = self.$root.attr('widget-opacity') === 'no' ? false : true;

            self.textSpeed = self.$root.attr('widget-speed') ? parseInt(self.$root.attr('widget-speed'), 10) : -100;

            if (!window.hasOwnProperty('ontouchstart')) {
                self.bindWindowEvent('scroll', self.onScrollEvent);
                self.bindWindowEvent('resize', self.onScrollEvent);
            }
        };

        SplashTitle.prototype.onScrollEvent = function (e) {
            var self = this, scrollPercent = e.scrollTop / (((self.thisWidgetRoot ? self.$root.offset().top : 0) + (self.thisWidgetRoot ? self.$root.height() : self.$window.height() / 1.5)) * 0.9);
            if (scrollPercent >= 1) {
                scrollPercent = 1;
            }

            if (self.thisWidgetRoot) {
                var translate = (scrollPercent * self.textSpeed) + 85;
                if (translate < 0) {
                    translate = 0;
                }

                self.$root.show().css({
                    '-webkit-transform': 'translateY(' + translate + '%)',
                    '-moz-transform': 'translateY(' + translate + '%)',
                    'transform': 'translateY(' + translate + '%)'
                });
            } else {
                self.$root.show().css({
                    'opacity': (self.useOpacity ? 1 - scrollPercent : 1),
                    '-webkit-transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)',
                    '-moz-transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)',
                    'transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)'
                });
            }
        };
        return SplashTitle;
    })(Base.Widget);
    return SplashTitle;
});
