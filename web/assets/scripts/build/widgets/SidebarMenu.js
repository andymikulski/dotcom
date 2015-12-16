var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var SidebarMenu = (function (_super) {
        __extends(SidebarMenu, _super);
        function SidebarMenu(_el) {
            _super.call(this, _el);
            this.log('SidebarMenu : Constructor');

            this.$logo = $('.svgLogo svg');
            this.$button = this.buildButton();
            this.generateSidebarItems();
            this.bindMenuClick();
        }
        SidebarMenu.prototype.buildButton = function () {
            this.$root.find('.menu-button').remove();

            // this custom svg injection is gross
            var $button = $('<a href="#" class="menu-button"><span class="menu-button__label">Menu</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="100.0px" height="100px" viewBox="0 0 225 225.334" enable-background="new 0 0 225 225.334" xml:space="preserve"><path d="M199.9,47.266v25H21.099v-25H199.9z M21.099,125.267H199.9v-25H21.099V125.267z M21.099,178.267H199.9v-25H21.099V178.267z"/></svg></a>');
            this.$root.prepend($button);
            this.$label = this.$root.find('.menu-button__label');

            return $button;
        };

        SidebarMenu.prototype.bindMenuClick = function () {
            var _this = this;
            this.$button.on('click', (function (e) {
                return _this.onClickEvent(e);
            }));
        };

        SidebarMenu.prototype.onClickEvent = function (e) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();
            var self = this;
            if (self.$body.hasClass('has-menu')) {
                self.close();
            } else {
                self.open();
            }
        };

        SidebarMenu.prototype.bindKeys = function () {
            var self = this;
            self.$window.on('keyup', function (e) {
                if (e && e.keyCode && e.keyCode === 27) {
                    self.close();
                }
            });
        };

        SidebarMenu.prototype.unbindKeys = function () {
            this.$window.unbind('keyup');
        };

        SidebarMenu.prototype.close = function () {
            var self = this;
            self.unbindKeys();
            self.$body.removeClass('has-menu has-dim');
            if (self.dim.$el.find('svg').length) {
                self.dim.$el.find('svg').remove();
            }
            self.dim.hide();
            self.$label.text('Menu');
        };

        SidebarMenu.prototype.open = function () {
            var self = this;
            self.$body.addClass('has-dim has-menu');
            self.$label.text('Close');
            if (!self.dim.$el.find('svg').length) {
                self.dim.$el.append(self.$logo.clone());
            }

            self.dim.$el.show();
            self.bindKeys();
            setTimeout(function () {
                self.dim.$el.addClass('show');
            }, 1);
        };

        SidebarMenu.prototype.generateSidebarItems = function () {
            var $v, widget, self = this;
            this.$root.find('[sub-widget*="SidebarItem"]').each(function (i, v) {
                $v = $(v);
                widget = new SidebarItem($v);

                // we want to close the menu on item click, so we'll listen for a custom event
                widget.on('onClickEvent', function () {
                    return self.close();
                });
            });
        };
        return SidebarMenu;
    })(Base.Widget);

    var SidebarItem = (function (_super) {
        __extends(SidebarItem, _super);
        function SidebarItem(_el) {
            _super.call(this, _el);
            this.log('SidebarItem : Constructor');
            this.target = this.$root.attr('sub-widget-target');
            this.bindClick();
        }
        SidebarItem.prototype.bindClick = function () {
            var _this = this;
            this.$root.on('click', (function (e) {
                return _this.onClickEvent(e);
            }));
        };

        SidebarItem.prototype.onClickEvent = function (e) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();
            this.scrollWindow($('[widget-target="' + this.target + '"]').offset().top, 0);
            this.emit('onClickEvent');
        };
        return SidebarItem;
    })(Base.Widget);
    return SidebarMenu;
});
