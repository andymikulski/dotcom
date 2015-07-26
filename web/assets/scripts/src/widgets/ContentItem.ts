import Base = require('core/base');
import WindowController = require('core/windowController');


export = ContentItem;
class ContentItem extends Base.Widget {
	private offset:number;
	private offsetBottom:number;
	private originalHeight:number;
	private PEAK_RATIO:number;
	private MAX_HEIGHT:number;
	static DEFAULT_MAX_HEIGHT:number = 500;

	constructor(_el:JQuery) {
		super(_el);
		this.log('ContentItem : Constructor');
		this.init();
	}

	private init():void {
		var self:ContentItem = this,
			winHeight:number = self.$window.height();
		self.log('ContentItem : Init');

		self.$root.css('background-color', 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')');
		self.$root.css('max-height', winHeight);

		if(window.hasOwnProperty('ontouchstart')){
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
	}

	private onResizeEvent(e:WindowController.WindowEvent):void {
		this.offset = this.$root.offset().top;
		this.offsetBottom = this.offset + this.$root.height();
	}

	private onScrollEvent(e:WindowController.WindowEvent):void {
		var self:ContentItem = this,
			h:number = self.$root.height();

		if(e.scrollBottom >= self.offset){
			// bottom is below the top of the element
			if(e.scrollBottom >= self.offsetBottom){
				//bottom is below the bottom of the element
				if(h <= self.MAX_HEIGHT){
					self.$root.height(h + (e.scrollBottom - self.offsetBottom));
				}else{
					self.$root.height(self.MAX_HEIGHT);
				}
			}else{
				if(h > self.originalHeight){
					self.$root.height(h + (e.scrollBottom - self.offsetBottom));
				}else{
					self.$root.height(self.originalHeight);
				}
			}
		}

		self.offset = self.$root.offset().top * (1 - self.PEAK_RATIO);
		self.offsetBottom = (self.offset + self.$root.height()) * (1 + self.PEAK_RATIO);
	}
}
