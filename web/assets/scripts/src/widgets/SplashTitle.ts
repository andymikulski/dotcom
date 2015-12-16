import Base = require('core/base');
import WindowController = require('core/windowController');

export = SplashTitle;
class SplashTitle extends Base.Widget {
	private rootHeight:number;
    private offsetTop:number;
	private textSpeed:number;
    private thisWidgetRoot:boolean;
    private useOpacity:boolean;

	constructor(_el:JQuery) {
		super(_el);
		this.log('SplashTitle : Constructor');
		this.init();
	}

	private init():void {
		var self:SplashTitle = this;

        self.thisWidgetRoot = self.$root.attr('widget-root') === 'this';
        self.rootHeight = self.thisWidgetRoot ? self.$root.height() : self.$window.height() / 1.5;
        self.useOpacity = self.$root.attr('widget-opacity') === 'no' ? false : true;

        self.textSpeed = self.$root.attr('widget-speed') ? parseInt(self.$root.attr('widget-speed'), 10) : -100;

        if(!window.hasOwnProperty('ontouchstart')){
            self.bindWindowEvent('scroll', self.onScrollEvent);
			self.bindWindowEvent('resize', self.onScrollEvent);
        }
	}

	private onScrollEvent(e:WindowController.WindowEvent):void {
        var self:SplashTitle = this,
        	scrollPercent:number = e.scrollTop / (((self.thisWidgetRoot ? self.$root.offset().top : 0) + (self.thisWidgetRoot ? self.$root.height() : self.$window.height() / 1.5) )*0.9);
        if (scrollPercent >= 1) {
            scrollPercent = 1;
        }

        if(self.thisWidgetRoot){
            var translate:number = (scrollPercent * self.textSpeed) + 85;
            if(translate < 0){ translate = 0; }

            self.$root.show().css({
                '-webkit-transform': 'translateY(' + translate + '%)',
                '-moz-transform': 'translateY(' + translate + '%)',
                'transform': 'translateY(' + translate + '%)'
            });
        }else{
            self.$root.show().css({
                'opacity': (self.useOpacity ? 1 - scrollPercent : 1),
                '-webkit-transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)',
                '-moz-transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)',
                'transform': 'translateY(' + scrollPercent * self.textSpeed + 'px)'
            });
        }
	}
}
