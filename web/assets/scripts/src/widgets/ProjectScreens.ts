import Base = require('core/base');

export = ProjectScreens;
class ProjectScreens extends Base.Widget {
	private $items:JQuery;
	private modal:ScreensModal;

	constructor(_el:JQuery){
		super(_el);
		this.log('ProjectScreens : Constructor');

		this.bindItems();
		// this.modal = this.createModal();
	}

	private bindItems():void {
		var $v:JQuery,
			self:ProjectScreens = this;
		self.$items = self.$root.find('.project-screens__item').hide();
		self.$items.each(function(i:number, v:HTMLElement){
			$v = $(v);
			$v.unbind().on('click', <any>((e)=>self.onItemClick(e)) );

			self.Walt.animate({
				'el': $v.show(),
				'animation': 'fadeIn',
				'duration': '300ms',
				'delay': (i * 250) + 'ms'
			});
		});
	}

	private onItemClick(e:MouseEvent){
		e && e.preventDefault && e.preventDefault();
		e && e.stopPropagation && e.stopPropagation();
		if(!this.modal){
			this.modal = this.createModal();
		}
		this.modal.show( $(e.currentTarget) );
	}

	private createModal():ScreensModal {
		var $template:JQuery = $($('[widget-template="screensModal"]').html());

		var $templateThumbnailSection:JQuery = $template.find('.screens-modal__thumbs'),
			$thumbnail:JQuery;

		this.$items.each(function(i:number, v:HTMLElement){
			$thumbnail = $('<img />');
			$thumbnail.attr('src', $(v).find('.project-screen__image').attr('src'));
			$thumbnail.attr('data-caption', $(v).find('.project-screen__desc').text() );
			if(i === 0){
				$thumbnail.addClass('is-active');
			}
			$templateThumbnailSection.append($thumbnail);
		});

		this.$body.append($template);
		return new ScreensModal($template);
	}
}











class ScreensModal extends Base.Widget {
	private $image:JQuery;
	private $caption:JQuery;

	constructor(_el:JQuery){
		super(_el);
		var self:ScreensModal = this;
		self.log('ScreensModal : Constructor');

		self.$image = self.$root.find('.screens-modal__image');
		self.$caption = self.$root.find('.screens-modal__text');
		self.bindMouseMove();
		self.bindNavButtons();
		self.bindThumbs();
	}

	private bindNavButtons():void {
		var self:ScreensModal = this;
		self.$root.find('.screens-modal__nav-close').unbind().on('click', <any>( (e)=>self.handleNav(e, 'closed') ));
		self.$root.find('.screens-modal__nav-prev').unbind().on('click', <any>( (e)=>self.handleNav(e, 'prev') ));
		self.$root.find('.screens-modal__nav-next').unbind().on('click', <any>( (e)=>self.handleNav(e, 'next') ));
	}

	private bindKeys():void {
		var self:ScreensModal = this;
		self.$window.on('keyup', function(e){
			if(e && e.keyCode && e.keyCode === 27 && self.$root.hasClass('is-visible')){
				self.hide();
			}
		});
	}

	private unbindKeys():void {
		this.$window.unbind('keyup');
	}

	private handleNav(e:MouseEvent, dir:string):void {
		e && e.preventDefault && e.preventDefault();
		e && e.stopPropagation && e.stopPropagation();

		var $active = this.$root.find('.screens-modal__thumbs img.is-active');
		switch(dir){
			default:
			case 'closed': // bake him away, toys
				this.hide();
				break;
			case 'prev':
				var $prev = $active.prev('img');
				if(!$prev.length){
					$prev = this.$root.find('.screens-modal__thumbs img').last();
				}
				this.changeSlide($prev);
				break;
			case 'next':
				var $next = $active.next('img');
				if(!$next.length){
					$next = this.$root.find('.screens-modal__thumbs img').first();
				}

				this.changeSlide($next);
				break;
		}
	}

	private bindThumbs():void {
		this.$root.find('.screens-modal__thumbs img').unbind().on('click', <any>( (e)=>this.onThumbClick(e) ));
	}

	private onThumbClick(e:MouseEvent):void {
		e && e.preventDefault && e.preventDefault();
		e && e.stopPropagation && e.stopPropagation();

		this.changeSlide( $(e.currentTarget) );
	}

	private changeSlide($newThumb:JQuery, noAnim?:boolean):void {
		if($newThumb.hasClass('is-active') && !noAnim){
			return;
		}
		var self:ScreensModal = this,
			$thumbs:JQuery = self.$root.find('.screens-modal__thumbs img');
		$thumbs.removeClass('is-active');
		$newThumb.addClass('is-active');

		if(!noAnim){
			self.Walt.animate({
				'el': self.$image,
				'animation': 'fadeOut',
				'duration': '300ms',
				'onComplete': function($el:JQuery){
					self.$image.css('background-image', 'url(' + $newThumb.attr('src').replace('/thumbs/','/') + ')');

					self.Walt.animate({
						'el': self.$image,
						'animation': 'fadeIn',
						'duration': '250ms'
					});
				}
			});
		}else{
			self.$image.css('background-image', 'url(' + $newThumb.attr('src').replace('/thumbs/','/') + ')');
		}


		self.Walt.animate({
			'el': self.$caption,
			'animation': 'fadeOutDown',
			'duration': '300ms',
			'onComplete': function($el:JQuery){
				var caption = $newThumb.attr('data-caption');
				$el.text( caption );

				if(caption && caption !== ''){
					self.Walt.animate({
						'el': self.$caption.show(),
						'animation': 'fadeInUp',
						'duration': '300ms'
					});
				}else{
					self.$caption.hide();
				}
			}
		});

		var thumbTop:number = $newThumb.offset().top,
			winScroll:number = self.$window.scrollTop(),
			winHeight:number = self.$window.height();

		if(winScroll + winHeight < thumbTop || thumbTop < winScroll){
			self.$root.find('.screens-modal__thumbs').scrollTop( thumbTop - winScroll );
		}
		self.toggleSize(null, true);
	}

	private bindMouseMove():void {
		this.$window.on('mousemove', <any>( (e)=>this.onMouseMove(e) ));
		this.$image.on('click', <any>( (e)=>this.toggleSize(e)) );
	}

	private toggleSize(e?:MouseEvent, forceUnzoom?:boolean):void {
		if(forceUnzoom || this.$image.hasClass('is-zoomed')){
			this.$image.css('background-position', 'center top');
			this.$image.removeClass('is-zoomed');
		}else{
			this.$image.addClass('is-zoomed');
		}
	}

	private onMouseMove(e:MouseEvent):void {
		if(this.$image.hasClass('is-zoomed')){
			this.$image.css('background-position', ((e.clientX / this.$window.width())*110)+'% ' + ((e.clientY / this.$window.height())*100) + '%');
		}
	}

	public show($target:JQuery):void {
		var self:ScreensModal = this,
			index:number = $target.index();
		// self.log('show', $target, self.$root.find('.screens-modal__thumbs img:eq(' + index + ')'));
		self.changeSlide(self.$root.find('.screens-modal__thumbs img:eq(' + index + ')'), true);
		self.dim.show();
		self.$body.css('overflow', 'hidden');
		self.$root.addClass('is-visible').removeClass('is-transitioning');
		self.bindKeys();

		self.Walt.animate({
			'el': self.$root.find('.screens-modal__nav-close'),
			'animation': 'slideInDown',
			'duration': '300ms'
		});
	}

	public hide():void {
		var self:ScreensModal = this;
		self.unbindKeys();
		self.$root.addClass('is-transitioning');
		self.$body.css('overflow', 'inherit');
		self.Walt.animate({
			'el': self.$root.find('.screens-modal__nav-close'),
			'animation': 'slideOutUp',
			'duration': '300ms',
			'useTimeout': true,
			'onComplete': function(){
				self.$root.removeClass('is-visible').removeClass('is-transitioning');
			}
		});
		self.dim.hide();
	}
}
