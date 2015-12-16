var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base', 'core/factory', 'widgets/SplashScreen'], function(require, exports, Base, reqFactory, SplashScreen) {
    

    /**
    * Application class. Starts the app.
    * Inits global objects (like Factory/WindowController),
    * as well as applies certain UA tags to html element if necessary.
    * @class App
    * @exends Base.SiteObject
    */
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            _super.call(this, $(document.body));
            this.hasLoaded = false;
            this.log('App : Constructor');
        }
        /**
        * App initialization.
        * Inits Analytics, Factory, WindowController.
        * Removes .loading from body on dom.ready
        * @access public
        */
        App.prototype.init = function () {
            var _this = this;
            var self = this;
            self.log('App : init');
            self.$body.height($(window).height());
            $('#loading').addClass('show');

            // Add ie, iemobile to html if needed
            self.checkUserAgent();

            // var d = new SplashScreen.Display($(window).width(), $(window).height(), true);
            self.Splash = new SplashScreen.Display($(window).width(), $(window).height(), true);

            // Start up GA
            self.Analytics.init();

            // widget factory
            self.Factory = reqFactory.Factory;
            self.Factory.init();

            // window init
            self.WindowController.init();

            self.bindWindowEvent('resize', function (e) {
                $('.full-screen').first().height(e.winHeight * 0.95);
                $('.footer-section .full-screen').css('min-height', e.winHeight * 0.95);
            });

            $(window).on('load', (function () {
                return _this.onLoadEvent();
            }));

            //fallback for load event
            //(works if window is blurred when loaded)
            self.loadTimer = setInterval(function () {
                if (document.readyState === 'complete' && !self.hasLoaded) {
                    self.onLoadEvent();
                    clearInterval(self.loadTimer);
                }
            }, 50);
        };

        App.prototype.bindConsole = function () {
            var _this = this;
            if (!this.hasTouch) {
                window.addEventListener('devtoolschange', (function (e) {
                    return _this.onConsoleOpen(e);
                }));
            }
        };
        App.prototype.onConsoleOpen = function (e) {
            var self = this;
            if (YT && YT.Player && e.detail && e.detail.hasOwnProperty('open') && e.detail.open === true) {
                var $modal = $('#console-cowboy');
                if (!$modal.length) {
                    $modal = $('<div id="console-cowboy"></div>');
                    self.$body.append($modal);

                    self.player = new YT.Player('console-cowboy', {
                        'height': '480',
                        'width': '640',
                        'playerVars': {
                            'rel': '0',
                            'controls': '0',
                            'modestbranding': '1',
                            'cc_load_policy': '1',
                            'showinfo': '0',
                            'start': '6'
                        },
                        'videoId': 'BNtcWpY4YLY',
                        'events': {
                            'onReady': function (e) {
                                e && e.target && e.target.playVideo && e.target.playVideo();
                                self.dim.show(true);
                                self.Walt.animate({
                                    'el': $modal.show(),
                                    'animation': 'fadeIn',
                                    'duration': '300ms'
                                });
                            },
                            'onStateChange': function (e) {
                                if (e && e.data === 0) {
                                    self.dim.hide();
                                    self.Walt.animate({
                                        'el': $('#console-cowboy'),
                                        'animation': 'fadeOut',
                                        'duration': '300ms',
                                        'onComplete': function ($el) {
                                            $el.hide();
                                        }
                                    });
                                }
                            }
                        }
                    });
                } else {
                    self.dim.show(true);
                    self.Walt.animate({
                        'el': $modal.show(),
                        'animation': 'fadeIn',
                        'delay': '100ms',
                        'onBefore': function () {
                            self.player.playVideo && self.player.playVideo();
                            self.player.seekTo && self.player.seekTo(6);
                        }
                    });
                }
            }

            self.Analytics.track('egg', 'hidden', 'cowboy', true);
        };

        App.prototype.onLoadEvent = function () {
            var self = this;
            self.hasLoaded = true;

            if (self.$body.attr('data-prod')) {
                self.bindConsole();
            }

            // i'm lazy so i'ma just bind these header links right here HOPE YOU DONT MIND
            $('.header-links__item').each(function (i, v) {
                var $v = $(v), $link = $v.find('a');

                if ($link.length && $link.attr('href').indexOf('#') === 0) {
                    $link.on('click', function (e) {
                        e && e.preventDefault && e.preventDefault();

                        $('html, body').animate({
                            'scrollTop': $($link.attr('href')).offset().top
                        }, 300);
                    });
                }
            });

            // setTimeout(function(){
            self.Splash.shouldDelete = true;
            var t = 1.5;
            $('#loading').removeClass('show').fadeOut(t * 750);
            $(document.body).removeClass('loading').css('height', 'auto');

            var $text = $('.header-description');
            $text.hide();

            var $menu = $('.splash-nav');
            $menu.hide();

            var $project = $('.project.is-first');
            $project.css('visibility', 'hidden');

            self.Walt.animate({
                'el': $text,
                'animation': 'fadeInLeft',
                'delay': '1.2s',
                'duration': '1s',
                'onBefore': function () {
                    $text.show();

                    var $linkItems = $('.header-links .header-links__item'), $v;
                    $linkItems.each(function (i, v) {
                        var $v = $(v);
                        self.Walt.animate({
                            'el': $v.hide(),
                            'animation': 'fadeInLeft',
                            'delay': (1.35 + (i * 0.25)) + 's',
                            'duration': '0.75s',
                            'onBefore': function () {
                                $v.show();
                            }
                        });
                    });
                }
            });

            self.Walt.animate({
                'el': $menu,
                'animation': 'fadeInUp',
                'delay': '0.2s',
                'onBefore': function () {
                    $menu.show();
                    $('#preloader-gfx').css('opacity', '0.15').appendTo($('#dim'));
                }
            });

            $project.css({
                'visibility': 'visible'
            }).addClass('show');

            var $logoType = $('.logotype').first();
            $logoType.addClass('show');

            setInterval(function () {
                $logoType.removeClass('show');
                $logoType.addClass('hide');

                setTimeout(function () {
                    $logoType.removeClass('hide');
                    $logoType.addClass('show');
                }, 3000);
            }, 8000);
            // }, 100);
        };

        /**
        * Determines if User Agent is IE/IE Mobile and appends class to html element as necessary.
        * Also detects touch-based devices (html.is-touch) and modifies console.time/End if not in debug mode.
        * @access private
        */
        App.prototype.checkUserAgent = function () {
            var $html = this.$html, $body = this.$body, UA = $html.attr('data-ua') || '';

            // windows or mac?
            if (navigator && navigator.platform) {
                if (navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)) {
                    $html.addClass('mac');
                } else if (navigator.platform.match(/Win/i)) {
                    $html.addClass('windows');
                }
            }

            // Various ways to determine if it's IE (since IE10 or 11 is a jerk about its UA)
            if ((/MSIE/i).test(UA) || (/Trident\/[0-9\.]+/i).test(UA) || window.hasOwnProperty('MSStream')) {
                $html.addClass('ie');
                if ((/IEMobile/i).test(UA)) {
                    $html.addClass('ie-mobile');
                }
            }
            var isDebug = ($body.attr('data-debug') && $body.attr('data-debug') === 'true' ? true : false);
            if (!isDebug) {
                console.time = console.timeEnd = function () {
                    return;
                };
            }

            if ('ontouchstart' in window) {
                $html.addClass('is-touch');
            }
        };
        return App;
    })(Base.SiteObject);
    return App;
});
