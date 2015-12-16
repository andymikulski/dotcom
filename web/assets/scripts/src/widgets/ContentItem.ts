import Base = require('core/base');
import WindowController = require('core/windowController');


export = ContentItem;
class ContentItem extends Base.Widget {
	private shrinkButton:ExpandButton;
	private $previewImage:JQuery;

	// also in css (.is-shrunk)
	static COLLAPSED_HEIGHT:number = 117;

	constructor(_el:JQuery) {
		super(_el);
		this.log('ContentItem : Constructor');
		this.init();
	}

	private init():void {
		var self:ContentItem = this,
			winHeight:number = self.$window.height();
		self.log('ContentItem : Init');

		if(window.hasOwnProperty('ontouchstart')){
			self.$root.addClass('is-active');
			return;
		}

		self.buildShrinkButton();
	}

	private buildShrinkButton():void {
		this.$root.find('.project-title').append('<a href="#" class="btn-expand">Hide</a>');
		this.shrinkButton = new ExpandButton(this.$root.find('.btn-expand'), this.$root);
	}

	private collapseItem():void {
		this.shrinkButton.collapse();
	}

	private bindWindow():void {
		var self:ContentItem = this;

		self.bindWindowEvent('resize', self.onResizeEvent);
		self.bindWindowEvent('resize', self.onScrollEvent);
		self.bindWindowEvent('scroll', self.onScrollEvent);
	}

	private onResizeEvent(e:WindowController.WindowEvent):void {
		return;
	}

	private onScrollEvent(e:WindowController.WindowEvent):void {
		return;
	}
}

// shrink button
class ExpandButton extends Base.Widget {
	private $parent:JQuery;

	constructor(_el:JQuery, _parent:JQuery) {
		super(_el);
		this.$parent = _parent;
		this.log('ExpandButton : Constructor');
		this.bindOnClick();
	}

	private bindOnClick():void {
		this.$root.unbind().on('click', <any>((e)=>this.onShrinkButton(e)) );
	}

	public collapse():void {
		if(this.$parent.hasClass('is-expanded')){
			this.emit('collapse');
			return;
		}
		this.$root.addClass('is-collapsed');
		this.$parent.addClass('is-shrunk');
	}

	public expand():void {
		this.emit('expand');
		this.$root.removeClass('is-collapsed');
		this.$parent.removeClass('is-shrunk');
	}

	private onShrinkButton(evt:MouseEvent):void {
		evt && evt.preventDefault && evt.preventDefault();
		var $target:JQuery = $(evt.currentTarget),
			isShrunk:boolean = $target.hasClass('is-collapsed');
		this.emit('onClick');

		if(!isShrunk){
			this.collapse();
		}else{
			this.expand();
		}
	}
}
