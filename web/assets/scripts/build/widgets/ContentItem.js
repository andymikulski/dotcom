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

            if (window.hasOwnProperty('ontouchstart')) {
                self.$root.addClass('is-active');
                return;
            }

            self.buildShrinkButton();
        };

        ContentItem.prototype.buildShrinkButton = function () {
            this.$root.find('.project-title').append('<a href="#" class="btn-expand">Hide</a>');
            this.shrinkButton = new ExpandButton(this.$root.find('.btn-expand'), this.$root);
        };

        ContentItem.prototype.collapseItem = function () {
            this.shrinkButton.collapse();
        };

        ContentItem.prototype.bindWindow = function () {
            var self = this;

            self.bindWindowEvent('resize', self.onResizeEvent);
            self.bindWindowEvent('resize', self.onScrollEvent);
            self.bindWindowEvent('scroll', self.onScrollEvent);
        };

        ContentItem.prototype.onResizeEvent = function (e) {
            return;
        };

        ContentItem.prototype.onScrollEvent = function (e) {
            return;
        };
        ContentItem.COLLAPSED_HEIGHT = 117;
        return ContentItem;
    })(Base.Widget);

    // shrink button
    var ExpandButton = (function (_super) {
        __extends(ExpandButton, _super);
        function ExpandButton(_el, _parent) {
            _super.call(this, _el);
            this.$parent = _parent;
            this.log('ExpandButton : Constructor');
            this.bindOnClick();
        }
        ExpandButton.prototype.bindOnClick = function () {
            var _this = this;
            this.$root.unbind().on('click', (function (e) {
                return _this.onShrinkButton(e);
            }));
        };

        ExpandButton.prototype.collapse = function () {
            if (this.$parent.hasClass('is-expanded')) {
                this.emit('collapse');
                return;
            }
            this.$root.addClass('is-collapsed');
            this.$parent.addClass('is-shrunk');
        };

        ExpandButton.prototype.expand = function () {
            this.emit('expand');
            this.$root.removeClass('is-collapsed');
            this.$parent.removeClass('is-shrunk');
        };

        ExpandButton.prototype.onShrinkButton = function (evt) {
            evt && evt.preventDefault && evt.preventDefault();
            var $target = $(evt.currentTarget), isShrunk = $target.hasClass('is-collapsed');
            this.emit('onClick');

            if (!isShrunk) {
                this.collapse();
            } else {
                this.expand();
            }
        };
        return ExpandButton;
    })(Base.Widget);
    return ContentItem;
});
