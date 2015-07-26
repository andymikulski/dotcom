import Base = require('core/base');
import WindowController = require('core/windowController');

export = SplashTitle;
class SplashTitle extends Base.Widget {
	private rootHeight:number;
	private textSpeed:number;

	constructor(_el:JQuery) {
		super(_el);
		this.log('SplashTitle : Constructor');
		this.init();
	}

	private init():void {
		var self:SplashTitle = this;

        self.rootHeight = self.$window.height() / 1.5;
        self.textSpeed = -150;

        if(!window.hasOwnProperty('ontouchstart')){
			self.bindWindowEvent('scroll', self.onScrollEvent);
        }
	}

	private onScrollEvent(e:WindowController.WindowEvent):void {
        var self:SplashTitle = this,
        	scrollPercent:number = e.scrollTop / (self.rootHeight*0.9);
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
	}
}
