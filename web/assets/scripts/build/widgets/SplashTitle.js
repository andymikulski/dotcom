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

            self.rootHeight = self.$window.height() / 1.5;
            self.textSpeed = -150;

            if (!window.hasOwnProperty('ontouchstart')) {
                self.bindWindowEvent('scroll', self.onScrollEvent);
            }
        };

        SplashTitle.prototype.onScrollEvent = function (e) {
            var self = this, scrollPercent = e.scrollTop / (self.rootHeight * 0.9);
            if (scrollPercent >= 1) {
                self.$root.hide();
                return;
            }

            self.$root.show().css({
                'opacity': 1 - scrollPercent,
                '-webkit-transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)',
                '-moz-transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)',
                'transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)'
            });
        };
        return SplashTitle;
    })(Base.Widget);
    return SplashTitle;
});
