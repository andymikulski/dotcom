import Base = require('core/base');
import reqFactory = require('core/factory');
import SplashScreen = require('widgets/SplashScreen');
import WindowController = require('core/windowController');

export = App;
declare var YT:any;
/**
 * Application class. Starts the app.
 * Inits global objects (like Factory/WindowController),
 * as well as applies certain UA tags to html element if necessary.
 * @class App
 * @exends Base.SiteObject
 */
class App extends Base.SiteObject {
    Factory: any;
    Splash: SplashScreen.Display;
    player: any;
    loadTimer:any;
    hasLoaded:boolean = false;

    constructor() {
        super($(document.body));
        this.log('App : Constructor');
    }

    /**
     * App initialization.
     * Inits Analytics, Factory, WindowController.
     * Removes .loading from body on dom.ready
     * @access public
     */
    public init():void {
        var self:App = this;
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

        self.bindWindowEvent('resize', function(e:WindowController.WindowEvent){
            $('.full-screen').first().height(e.winHeight*0.95);
            $('.footer-section .full-screen').css('min-height', e.winHeight*0.95);
        });

        $(window).on('load', <any>( ()=>this.onLoadEvent() ));

        //fallback for load event
        //(works if window is blurred when loaded)
        self.loadTimer = setInterval(()=>{
            if (document.readyState === 'complete' && !self.hasLoaded) {
                self.onLoadEvent();
                clearInterval(self.loadTimer);
            }
        }, 50);
    }

    private bindConsole():void {
        if(!this.hasTouch){
            window.addEventListener('devtoolschange', <any>( (e)=>this.onConsoleOpen(e) ));
        }
    }
    private onConsoleOpen(e:any):void {
        var self:App = this;
        if( YT && YT.Player && e.detail && e.detail.hasOwnProperty('open') && e.detail.open === true){
            var $modal = $('#console-cowboy');
            if(!$modal.length){
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
                        'onReady': function(e:any){
                            e && e.target && e.target.playVideo && e.target.playVideo();
                            self.dim.show(true);
                            self.Walt.animate({
                                'el': $modal.show(),
                                'animation': 'fadeIn',
                                'duration': '300ms'
                            });
                        },
                        'onStateChange': function(e){
                            if(e && e.data === 0){
                                self.dim.hide();
                                self.Walt.animate({
                                    'el': $('#console-cowboy'),
                                    'animation': 'fadeOut',
                                    'duration': '300ms',
                                    'onComplete': function($el){
                                        $el.hide();
                                    }
                                });
                            }
                        }
                    }
                });
            }else{
                self.dim.show(true);
                self.Walt.animate({
                    'el': $modal.show(),
                    'animation': 'fadeIn',
                    'delay': '100ms',
                    'onBefore': function(){
                        self.player.playVideo && self.player.playVideo();
                        self.player.seekTo && self.player.seekTo(6);
                    }
                });
            }
        }

        self.Analytics.track('egg', 'hidden', 'cowboy', true);
    }

    private onLoadEvent():void {


        var self:App = this;
        self.hasLoaded = true;

        if(self.$body.attr('data-prod')){
            self.bindConsole();
        }

        // i'm lazy so i'ma just bind these header links right here HOPE YOU DONT MIND
        $('.header-links__item').each(function(i,v){
            var $v = $(v),
                $link = $v.find('a');

            if($link.length && $link.attr('href').indexOf('#') === 0){
                $link.on('click', (e)=>{
                    e && e.preventDefault && e.preventDefault();

                    $('html, body').animate({
                        'scrollTop': $( $link.attr('href') ).offset().top
                    }, 300);
                });
            }
        });

        // setTimeout(function(){
            self.Splash.shouldDelete = true;
            var t = 1.5;
            $('#loading').removeClass('show').fadeOut(t*750);
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
                'onBefore': function(){
                    $text.show();

                    var $linkItems = $('.header-links .header-links__item'),
                        $v:JQuery;
                    $linkItems.each(function(i:number, v:HTMLElement){
                        var $v = $(v);
                        self.Walt.animate({
                            'el': $v.hide(),
                            'animation': 'fadeInLeft',
                            'delay': (1.35 + (i * 0.25)) + 's',
                            'duration': '0.75s',
                            'onBefore': function() {
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
                'onBefore': function(){
                    $menu.show();
                    $('#preloader-gfx').css('opacity', '0.15').appendTo($('#dim'));
                }
            });


            $project.css({
                'visibility': 'visible'
            }).addClass('show');



            var $logoType = $('.logotype').first();
            $logoType.addClass('show');

            setInterval(function(){
                $logoType.removeClass('show');
                $logoType.addClass('hide');

                setTimeout(function(){
                    $logoType.removeClass('hide');
                    $logoType.addClass('show');
                }, 3000);
            }, 8000);

        // }, 100);
    }

    /**
     * Determines if User Agent is IE/IE Mobile and appends class to html element as necessary.
     * Also detects touch-based devices (html.is-touch) and modifies console.time/End if not in debug mode.
     * @access private
     */
    private checkUserAgent():void {
        var $html:JQuery = this.$html,
            $body:JQuery = this.$body,
            UA:string = $html.attr('data-ua') || '';

        // windows or mac?
        if(navigator && navigator.platform){
            if(navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)){
                $html.addClass('mac');
            }else if(navigator.platform.match(/Win/i)){
                $html.addClass('windows');
            }
        }

        // Various ways to determine if it's IE (since IE10 or 11 is a jerk about its UA)
        if((/MSIE/i).test(UA) || (/Trident\/[0-9\.]+/i).test(UA) || window.hasOwnProperty('MSStream')){
            $html.addClass('ie');
            if((/IEMobile/i).test(UA)){
                $html.addClass('ie-mobile');
            }
        }
        var isDebug:boolean = ($body.attr('data-debug') && $body.attr('data-debug') === 'true' ? true : false);
        if(!isDebug){
            console.time = console.timeEnd = function(){ return; };
        }

        if('ontouchstart' in window){ $html.addClass('is-touch'); }
    }
}
