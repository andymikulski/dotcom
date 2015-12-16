var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var MoreInfo = (function (_super) {
        __extends(MoreInfo, _super);
        function MoreInfo(_el) {
            _super.call(this, _el);
            this.eggTime = 5000;
            this.log('MoreInfo : Constructor');
            this.$changingText = this.$root;
            this.$project = this.$root.closest('.project');
            this.bindClick();
            this.bindExternalClose();
        }
        MoreInfo.prototype.bindClick = function () {
            var self = this;
            self.$root.on('click', (function (e) {
                return self.onClickEvent(e);
            }));

            if (!self.hasTouch) {
                self.$root.on('mouseover', (function (e) {
                    return self.onMouseOver(e);
                }));
                self.$root.on('mouseout', (function (e) {
                    return self.onMouseOut(e);
                }));
            }
        };

        MoreInfo.prototype.onMouseOver = function (e) {
            var self = this;
            if (self.wouldYouLikeToKnowMore) {
                clearTimeout(self.wouldYouLikeToKnowMore);
            }

            self.wouldYouLikeToKnowMore = setTimeout(function (e) {
                return self.onTimer(e);
            }, self.eggTime);
        };

        MoreInfo.prototype.onMouseOut = function (e) {
            if (this.wouldYouLikeToKnowMore) {
                clearTimeout(this.wouldYouLikeToKnowMore);
            }
        };

        MoreInfo.prototype.onTimer = function (e) {
            clearTimeout(this.wouldYouLikeToKnowMore);
            var $clip = $('#know-more'), self = this;

            if (self.$root.text().toLowerCase().indexOf('less') > -1) {
                return;
            }
            if (!$clip.length) {
                var $audio = $('<audio src="assets/sounds/more.mp3" id="know-more" preload="auto" autoplay></audio>'), $banner = $('<div id="know-more-banner"><div class="text-wrapper"><div class="text">Would you like to know <span>more</span>?</div></div></div>');
                self.$body.append($banner);

                $audio.on('canplaythrough', function () {
                    $banner.show().addClass('has-animation');
                });

                $audio.on('ended', function () {
                    self.Walt.animate({
                        'el': $banner,
                        'animation': 'slideOutDown',
                        'delay': '1.25s',
                        'duration': '250ms',
                        'onComplete': function ($el) {
                            $banner.hide().removeClass('has-animation');
                        }
                    });
                });

                this.$body.append($audio);
            } else {
                $clip[0].play && $clip[0].play();
            }

            self.Analytics.track('egg', 'hidden', 'know more', true);
        };

        MoreInfo.prototype.bindExternalClose = function () {
            var self = this, $btn = self.$project.find('.btn-expand');

            if ($btn && $btn.length) {
                var widget = $btn.data('app-widget');
                if (!widget) {
                    return;
                }

                widget.on('collapse', function () {
                    self.onClickEvent(null, true);
                });
            }
        };

        MoreInfo.prototype.onClickEvent = function (e, forceClose) {
            e && e.preventDefault && e.preventDefault();

            var self = this, $preview = self.$project.find('.project-preview'), $screens = self.$project.find('.project-screens'), outTime = '300ms', inTime = '500ms';

            if (self.$project.hasClass('is-expanded')) {
                self.unbindWindow();
                self.$project.removeClass('is-expanded is-active');
                self.scrollIfNeeded();
                self.$project.css('height', self.initHeight);
                self.changeText('More');

                self.Walt.animate({
                    'el': $screens,
                    'animation': 'fadeOutRight',
                    'timing': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
                    'duration': outTime,
                    'onComplete': function () {
                        $screens.hide();
                        self.Walt.animate({
                            'el': $preview.show(),
                            'animation': 'fadeInRight',
                            'timing': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
                            'duration': inTime
                        });
                    }
                });
            } else if (!forceClose) {
                if (!self.initHeight) {
                    self.initHeight = self.$project.height();
                }
                var winHeight = self.$window.height();
                self.$project.find('.project-tech, .project-info').css('visibility', 'hidden');

                self.$project.addClass('is-expanded is-active');
                var $left = self.$project.find('.left-side');
                setTimeout(function () {
                    self.$project.css('height', ($left.height() > winHeight ? $left.height() + 50 : winHeight));
                }, 1);

                self.bindWindowEvent('resize', function (e) {
                    var leftHeight = $left.height();
                    self.$project.css('height', (leftHeight > e.winHeight ? leftHeight + 50 : e.winHeight));
                    $screens.height((e.winHeight > leftHeight ? self.$project.height() : leftHeight - 50));
                });

                self.changeText('Less');
                var projectTop = self.$project.offset().top;

                // if(projectTop <= self.$window.scrollTop() * 1.15) {
                self.scrollWindow(projectTop, 500);

                // }
                self.Walt.animate({
                    'el': $preview,
                    'animation': 'fadeOutRight',
                    'timing': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
                    'duration': outTime,
                    'onComplete': function () {
                        $preview.hide();
                        var leftHeight = $left.height();
                        $screens.height((winHeight > leftHeight ? self.$project.height() : leftHeight - 50));
                        self.Walt.animate({
                            'el': $screens.show(),
                            'animation': 'fadeInRight',
                            'timing': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
                            'duration': inTime
                        });

                        self.$project.find('.project-tech, .project-info').each(function (i, v) {
                            self.Walt.animate({
                                'el': $(v),
                                'animation': 'fadeInUp',
                                'delay': (0.25 + (i * 0.15)) + 's',
                                'onBefore': function ($el) {
                                    $el.css('visibility', 'visible');
                                }
                            });
                        });
                    }
                });
            }
        };

        /**
        * Function to scroll to top of project,
        * used if collapse button is hit and top of project is out of view
        * (this prevents clicking 'less info' and being stuck further down the page)
        */
        MoreInfo.prototype.scrollIfNeeded = function () {
            var top = this.$project.offset().top;
            if (top < this.$window.scrollTop()) {
                this.scrollWindow(top, 500);
            }
        };

        /**
        * Animates the element (more info <--> less info)
        * @param {string} newValue String to put into the element
        */
        MoreInfo.prototype.changeText = function (newValue) {
            var self = this, speed = '0.3s';

            self.Walt.animate({
                'el': self.$changingText,
                'animation': (newValue === 'Less' ? 'fadeOutUp' : 'fadeOutDown'),
                'duration': speed,
                'onComplete': function ($el) {
                    $el.text(newValue + ' Info');
                    self.Walt.animate({
                        'el': $el,
                        'animation': (newValue === 'Less' ? 'fadeInUp' : 'fadeInDown'),
                        'duration': speed
                    });
                }
            });
        };
        return MoreInfo;
    })(Base.Widget);
    return MoreInfo;
});
