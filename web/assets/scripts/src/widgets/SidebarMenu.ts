import Base = require('core/base');

export = SidebarMenu;
class SidebarMenu extends Base.Widget {
	private $button:JQuery;
	private $label:JQuery;
	private $logo:JQuery;

	constructor(_el:JQuery){
		super(_el);
		this.log('SidebarMenu : Constructor');

		this.$logo = $('.svgLogo svg');
		this.$button = this.buildButton();
		this.generateSidebarItems();
		this.bindMenuClick();
	}

	private buildButton():JQuery {
		this.$root.find('.menu-button').remove();

		// this custom svg injection is gross
		var $button:JQuery = $('<a href="#" class="menu-button"><span class="menu-button__label">Menu</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="100.0px" height="100px" viewBox="0 0 225 225.334" enable-background="new 0 0 225 225.334" xml:space="preserve"><path d="M199.9,47.266v25H21.099v-25H199.9z M21.099,125.267H199.9v-25H21.099V125.267z M21.099,178.267H199.9v-25H21.099V178.267z"/></svg></a>');
		this.$root.prepend($button);
		this.$label = this.$root.find('.menu-button__label');

		return $button;
	}


	private bindMenuClick():void {
		this.$button.on('click', <any>( (e)=>this.onClickEvent(e) ));
	}

	private onClickEvent(e:MouseEvent):void {
		e && e.preventDefault && e.preventDefault();
		e && e.stopPropagation && e.stopPropagation();
		var self:SidebarMenu = this;
		if(self.$body.hasClass('has-menu')){
			self.close();
		}else{
			self.open();
		}
	}


    private bindKeys():void {
        var self:SidebarMenu = this;
        self.$window.on('keyup', function(e){
            if(e && e.keyCode && e.keyCode === 27){
                self.close();
            }
        });
    }

    private unbindKeys():void {
        this.$window.unbind('keyup');
    }

	private close():void {
		var self:SidebarMenu = this;
		self.unbindKeys();
		self.$body.removeClass('has-menu has-dim');
		if(self.dim.$el.find('svg').length){
			self.dim.$el.find('svg').remove();
		}
		self.dim.hide();
		self.$label.text('Menu');
	}

	private open():void {
		var self:SidebarMenu = this;
		self.$body.addClass('has-dim has-menu');
		self.$label.text('Close');
		if(!self.dim.$el.find('svg').length){
			self.dim.$el.append(self.$logo.clone());
		}

        self.dim.$el.show();
		self.bindKeys();
        setTimeout(function(){
            self.dim.$el.addClass('show');
        },1);
	}

	private generateSidebarItems():void {
		var $v:JQuery,
			widget:SidebarItem,
			self:SidebarMenu = this;
		this.$root.find('[sub-widget*="SidebarItem"]').each(function(i:number, v:HTMLElement){
			$v = $(v);
			widget = new SidebarItem($v);
			// we want to close the menu on item click, so we'll listen for a custom event
			widget.on('onClickEvent', ()=>self.close());
		});
	}
}

class SidebarItem extends Base.Widget {
	private target:string;

	constructor(_el:JQuery){
		super(_el);
		this.log('SidebarItem : Constructor');
		this.target = this.$root.attr('sub-widget-target');
		this.bindClick();
	}

	private bindClick():void {
		this.$root.on('click', <any>( (e)=>this.onClickEvent(e) ));
	}

	private onClickEvent(e:MouseEvent):void {
		e && e.preventDefault && e.preventDefault();
		e && e.stopPropagation && e.stopPropagation();
		this.scrollWindow($('[widget-target="' + this.target + '"]').offset().top, 0);
		this.emit('onClickEvent');
	}
}
