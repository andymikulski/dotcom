import Base = require('core/base');
import WindowController = require('core/windowController');

export = ContentList;
class ContentList extends Base.Widget {
	constructor(_el:JQuery) {
		super(_el);
		this.log('ContentList : Constructor');
		this.init();
	}

	private init():void {
		var self:ContentList = this;

		self.log('ContentList : Init');
		$('.filler').height( self.$window.height());
		self.bindWindowEvent('resize', self.onResizeEvent);

		// self.$root.find('[widget="contentItem"]').first().height( self.$window.height()*0.85 );
	}

	private onResizeEvent(e:WindowController.WindowEvent):void {
		$('.filler').height( this.$window.height());
	}
}
