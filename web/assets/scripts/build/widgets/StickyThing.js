var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var StickyThing = (function (_super) {
        __extends(StickyThing, _super);
        function StickyThing(_el) {
            _super.call(this, _el);
            this.log('StickyThing : Constructor');
            this.init();
        }
        StickyThing.prototype.init = function () {
            var self = this;

            self.$clone = self.$root.clone(false);
            self.$clone.addClass('sticky-thing__clone');
            self.$root.after(self.$clone);

            self.$offsetParent = self.$root.offsetParent();

            self.offsetTop = self.$root.offset().top;

            if (!window.hasOwnProperty('ontouchstart')) {
                self.bindWindowEvent('scroll', self.onScrollEvent);
            }
        };

        StickyThing.prototype.onScrollEvent = function (e) {
            var self = this;
            self.$root.css('opacity', e.scrollTop / (self.offsetTop * 1.1));
            self.$clone.css('opacity', e.scrollTop / (self.offsetTop * 1.1));

            if (e.scrollTop > self.$offsetParent.offset().top + self.$offsetParent.height() - self.$root.height()) {
                self.$clone.addClass('is-bottom');
            } else if (e.scrollTop > self.offsetTop) {
                self.$root.css('visibility', 'hidden');
                self.$clone.show().removeClass('is-bottom');
            } else {
                self.$root.css('visibility', 'visibile');
                self.$clone.hide();
            }
        };
        return StickyThing;
    })(Base.Widget);
    return StickyThing;
});
