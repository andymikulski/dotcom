var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var ProjectScreens = (function (_super) {
        __extends(ProjectScreens, _super);
        function ProjectScreens(_el) {
            _super.call(this, _el);
            this.log('ProjectScreens : Constructor');

            this.bindItems();
            // this.modal = this.createModal();
        }
        ProjectScreens.prototype.bindItems = function () {
            var $v, self = this;
            self.$items = self.$root.find('.project-screens__item').hide();
            self.$items.each(function (i, v) {
                $v = $(v);
                $v.unbind().on('click', (function (e) {
                    return self.onItemClick(e);
                }));

                self.Walt.animate({
                    'el': $v.show(),
                    'animation': 'fadeIn',
                    'duration': '300ms',
                    'delay': (i * 250) + 'ms'
                });
            });
        };

        ProjectScreens.prototype.onItemClick = function (e) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();
            if (!this.modal) {
                this.modal = this.createModal();
            }
            this.modal.show($(e.currentTarget));
        };

        ProjectScreens.prototype.createModal = function () {
            var $template = $($('[widget-template="screensModal"]').html());

            var $templateThumbnailSection = $template.find('.screens-modal__thumbs'), $thumbnail;

            this.$items.each(function (i, v) {
                $thumbnail = $('<img />');
                $thumbnail.attr('src', $(v).find('.project-screen__image').attr('src'));
                $thumbnail.attr('data-caption', $(v).find('.project-screen__desc').text());
                if (i === 0) {
                    $thumbnail.addClass('is-active');
                }
                $templateThumbnailSection.append($thumbnail);
            });

            this.$body.append($template);
            return new ScreensModal($template);
        };
        return ProjectScreens;
    })(Base.Widget);

    var ScreensModal = (function (_super) {
        __extends(ScreensModal, _super);
        function ScreensModal(_el) {
            _super.call(this, _el);
            var self = this;
            self.log('ScreensModal : Constructor');

            self.$image = self.$root.find('.screens-modal__image');
            self.$caption = self.$root.find('.screens-modal__text');
            self.bindMouseMove();
            self.bindNavButtons();
            self.bindThumbs();
        }
        ScreensModal.prototype.bindNavButtons = function () {
            var self = this;
            self.$root.find('.screens-modal__nav-close').unbind().on('click', (function (e) {
                return self.handleNav(e, 'closed');
            }));
            self.$root.find('.screens-modal__nav-prev').unbind().on('click', (function (e) {
                return self.handleNav(e, 'prev');
            }));
            self.$root.find('.screens-modal__nav-next').unbind().on('click', (function (e) {
                return self.handleNav(e, 'next');
            }));
        };

        ScreensModal.prototype.bindKeys = function () {
            var self = this;
            self.$window.on('keyup', function (e) {
                if (e && e.keyCode && e.keyCode === 27 && self.$root.hasClass('is-visible')) {
                    self.hide();
                }
            });
        };

        ScreensModal.prototype.unbindKeys = function () {
            this.$window.unbind('keyup');
        };

        ScreensModal.prototype.handleNav = function (e, dir) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();

            var $active = this.$root.find('.screens-modal__thumbs img.is-active');
            switch (dir) {
                default:
                case 'closed':
                    this.hide();
                    break;
                case 'prev':
                    var $prev = $active.prev('img');
                    if (!$prev.length) {
                        $prev = this.$root.find('.screens-modal__thumbs img').last();
                    }
                    this.changeSlide($prev);
                    break;
                case 'next':
                    var $next = $active.next('img');
                    if (!$next.length) {
                        $next = this.$root.find('.screens-modal__thumbs img').first();
                    }

                    this.changeSlide($next);
                    break;
            }
        };

        ScreensModal.prototype.bindThumbs = function () {
            var _this = this;
            this.$root.find('.screens-modal__thumbs img').unbind().on('click', (function (e) {
                return _this.onThumbClick(e);
            }));
        };

        ScreensModal.prototype.onThumbClick = function (e) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();

            this.changeSlide($(e.currentTarget));
        };

        ScreensModal.prototype.changeSlide = function ($newThumb, noAnim) {
            if ($newThumb.hasClass('is-active') && !noAnim) {
                return;
            }
            var self = this, $thumbs = self.$root.find('.screens-modal__thumbs img');
            $thumbs.removeClass('is-active');
            $newThumb.addClass('is-active');

            if (!noAnim) {
                self.Walt.animate({
                    'el': self.$image,
                    'animation': 'fadeOut',
                    'duration': '300ms',
                    'onComplete': function ($el) {
                        self.$image.css('background-image', 'url(' + $newThumb.attr('src').replace('/thumbs/', '/') + ')');

                        self.Walt.animate({
                            'el': self.$image,
                            'animation': 'fadeIn',
                            'duration': '250ms'
                        });
                    }
                });
            } else {
                self.$image.css('background-image', 'url(' + $newThumb.attr('src').replace('/thumbs/', '/') + ')');
            }

            self.Walt.animate({
                'el': self.$caption,
                'animation': 'fadeOutDown',
                'duration': '300ms',
                'onComplete': function ($el) {
                    var caption = $newThumb.attr('data-caption');
                    $el.text(caption);

                    if (caption && caption !== '') {
                        self.Walt.animate({
                            'el': self.$caption.show(),
                            'animation': 'fadeInUp',
                            'duration': '300ms'
                        });
                    } else {
                        self.$caption.hide();
                    }
                }
            });

            var thumbTop = $newThumb.offset().top, winScroll = self.$window.scrollTop(), winHeight = self.$window.height();

            if (winScroll + winHeight < thumbTop || thumbTop < winScroll) {
                self.$root.find('.screens-modal__thumbs').scrollTop(thumbTop - winScroll);
            }
            self.toggleSize(null, true);
        };

        ScreensModal.prototype.bindMouseMove = function () {
            var _this = this;
            this.$window.on('mousemove', (function (e) {
                return _this.onMouseMove(e);
            }));
            this.$image.on('click', (function (e) {
                return _this.toggleSize(e);
            }));
        };

        ScreensModal.prototype.toggleSize = function (e, forceUnzoom) {
            if (forceUnzoom || this.$image.hasClass('is-zoomed')) {
                this.$image.css('background-position', 'center top');
                this.$image.removeClass('is-zoomed');
            } else {
                this.$image.addClass('is-zoomed');
            }
        };

        ScreensModal.prototype.onMouseMove = function (e) {
            if (this.$image.hasClass('is-zoomed')) {
                this.$image.css('background-position', ((e.clientX / this.$window.width()) * 110) + '% ' + ((e.clientY / this.$window.height()) * 100) + '%');
            }
        };

        ScreensModal.prototype.show = function ($target) {
            var self = this, index = $target.index();

            // self.log('show', $target, self.$root.find('.screens-modal__thumbs img:eq(' + index + ')'));
            self.changeSlide(self.$root.find('.screens-modal__thumbs img:eq(' + index + ')'), true);
            self.dim.show();
            self.$body.css('overflow', 'hidden');
            self.$root.addClass('is-visible').removeClass('is-transitioning');
            self.bindKeys();

            self.Walt.animate({
                'el': self.$root.find('.screens-modal__nav-close'),
                'animation': 'slideInDown',
                'duration': '300ms'
            });
        };

        ScreensModal.prototype.hide = function () {
            var self = this;
            self.unbindKeys();
            self.$root.addClass('is-transitioning');
            self.$body.css('overflow', 'inherit');
            self.Walt.animate({
                'el': self.$root.find('.screens-modal__nav-close'),
                'animation': 'slideOutUp',
                'duration': '300ms',
                'useTimeout': true,
                'onComplete': function () {
                    self.$root.removeClass('is-visible').removeClass('is-transitioning');
                }
            });
            self.dim.hide();
        };
        return ScreensModal;
    })(Base.Widget);
    return ProjectScreens;
});
