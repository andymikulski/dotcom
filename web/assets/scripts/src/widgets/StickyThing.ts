import Base = require('core/base');
import WindowController = require('core/windowController');

export = StickyThing;
class StickyThing extends Base.Widget {
    private offsetTop:number;
    private $clone:JQuery;
    private $offsetParent:JQuery;

	constructor(_el:JQuery) {
		super(_el);
		this.log('StickyThing : Constructor');
		this.init();
	}

	private init():void {
		var self:StickyThing = this;

		self.$clone = self.$root.clone(false);
		self.$clone.addClass('sticky-thing__clone');
		self.$root.after(self.$clone);

		self.$offsetParent = self.$root.offsetParent();


        self.offsetTop = self.$root.offset().top;

        if(!window.hasOwnProperty('ontouchstart')){
			self.bindWindowEvent('scroll', self.onScrollEvent);
        }
	}

	private onScrollEvent(e:WindowController.WindowEvent):void {
		var self:StickyThing = this;
		self.$root.css('opacity', e.scrollTop / (self.offsetTop*1.1));
		self.$clone.css('opacity', e.scrollTop / (self.offsetTop*1.1));

		if(e.scrollTop > self.$offsetParent.offset().top + self.$offsetParent.height() - self.$root.height()){
			self.$clone.addClass('is-bottom');
		}else if(e.scrollTop > self.offsetTop){
			self.$root.css('visibility', 'hidden');
			self.$clone.show().removeClass('is-bottom');
		}else{
			self.$root.css('visibility', 'visibile');
			self.$clone.hide();
		}
	}
}
