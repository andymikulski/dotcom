var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var ContentItem = (function (_super) {
        __extends(ContentItem, _super);
        function ContentItem(_el) {
            _super.call(this, _el);
            this.log('ContentItem : Constructor');
            this.init();
        }
        ContentItem.prototype.init = function () {
            var self = this, winHeight = self.$window.height();
            self.log('ContentItem : Init');

            self.$root.css('background-color', 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')');
            self.$root.css('max-height', winHeight);

            if (window.hasOwnProperty('ontouchstart')) {
                self.$root.height(winHeight);
                return;
            }

            // save offsets and stuff so we dont calc on scroll
            self.offset = self.$root.offset().top;
            self.offsetBottom = self.offset + self.$root.height();
            self.originalHeight = self.$root.height();

            self.MAX_HEIGHT = (winHeight > ContentItem.DEFAULT_MAX_HEIGHT ? (winHeight * 0.9) : ContentItem.DEFAULT_MAX_HEIGHT);
            self.PEAK_RATIO = 0.1;

            self.bindWindowEvent('resize', self.onResizeEvent);
            self.bindWindowEvent('resize', self.onScrollEvent);
            self.bindWindowEvent('scroll', self.onScrollEvent);
        };

        ContentItem.prototype.onResizeEvent = function (e) {
            this.offset = this.$root.offset().top;
            this.offsetBottom = this.offset + this.$root.height();
        };

        ContentItem.prototype.onScrollEvent = function (e) {
            var self = this, h = self.$root.height();

            if (e.scrollBottom >= self.offset) {
                // bottom is below the top of the element
                if (e.scrollBottom >= self.offsetBottom) {
                    //bottom is below the bottom of the element
                    if (h <= self.MAX_HEIGHT) {
                        self.$root.height(h + (e.scrollBottom - self.offsetBottom));
                    } else {
                        self.$root.height(self.MAX_HEIGHT);
                    }
                } else {
                    if (h > self.originalHeight) {
                        self.$root.height(h + (e.scrollBottom - self.offsetBottom));
                    } else {
                        self.$root.height(self.originalHeight);
                    }
                }
            }

            self.offset = self.$root.offset().top * (1 - self.PEAK_RATIO);
            self.offsetBottom = (self.offset + self.$root.height()) * (1 + self.PEAK_RATIO);
        };
        ContentItem.DEFAULT_MAX_HEIGHT = 500;
        return ContentItem;
    })(Base.Widget);
    return ContentItem;
});
