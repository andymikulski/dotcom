import Base = require('core/base');
import WindowController = require('core/windowController');

export = MoreInfo;
class MoreInfo extends Base.Widget {
	private $changingText:JQuery;
	private $project:JQuery;
	private initHeight:number;

	private wouldYouLikeToKnowMore:any;
	private eggTime:number = 5000;

	constructor(_el:JQuery){
		super(_el);
		this.log('MoreInfo : Constructor');
		this.$changingText = this.$root;
		this.$project = this.$root.closest('.project');
		this.bindClick();
		this.bindExternalClose();
	}

	private bindClick():void {
		var self:MoreInfo = this;
		self.$root.on('click', <any>( (e)=>self.onClickEvent(e) ));

		if(!self.hasTouch){
			self.$root.on('mouseover', <any>( (e)=>self.onMouseOver(e) ));
			self.$root.on('mouseout', <any>( (e)=>self.onMouseOut(e) ));
		}
	}

	private onMouseOver(e:MouseEvent):void {
		var self:MoreInfo = this;
		if(self.wouldYouLikeToKnowMore){
			clearTimeout(self.wouldYouLikeToKnowMore);
		}

		self.wouldYouLikeToKnowMore = setTimeout(function(e){
			return self.onTimer(e);
		}, self.eggTime);
	}

	private onMouseOut(e:MouseEvent):void {
		if(this.wouldYouLikeToKnowMore){
			clearTimeout(this.wouldYouLikeToKnowMore);
		}
	}

	private onTimer(e:MouseEvent):void {
		clearTimeout(this.wouldYouLikeToKnowMore);
		var $clip:any = $('#know-more'),
			self:MoreInfo = this;

		if(self.$root.text().toLowerCase().indexOf('less') > -1){
			return;
		}
		if(!$clip.length){
			var $audio:JQuery = $('<audio src="assets/sounds/more.mp3" id="know-more" preload="auto" autoplay></audio>'),
				$banner:JQuery = $('<div id="know-more-banner"><div class="text-wrapper"><div class="text">Would you like to know <span>more</span>?</div></div></div>');
			self.$body.append($banner);

			$audio.on('canplaythrough', function(){
				$banner.show().addClass('has-animation');
			});

			$audio.on('ended', function(){
				self.Walt.animate({
					'el': $banner,
					'animation': 'slideOutDown',
					'delay': '1.25s',
					'duration': '250ms',
					'onComplete': function($el){
						$banner.hide().removeClass('has-animation');
					}
				});
			});

			this.$body.append($audio);
		}else{
			$clip[0].play && $clip[0].play();
		}

        self.Analytics.track('egg', 'hidden', 'know more', true);

	}

	private bindExternalClose():void {
		var	self:MoreInfo = this,
			$btn:JQuery = self.$project.find('.btn-expand');

		if($btn && $btn.length){
			var widget = $btn.data('app-widget');
			if(!widget){
				return;
			}

			widget.on('collapse', function(){
				self.onClickEvent(null, true);
			});
		}
	}

	private onClickEvent(e?:MouseEvent, forceClose?:boolean):void {
		e && e.preventDefault && e.preventDefault();

		var self:MoreInfo = this,
			$preview = self.$project.find('.project-preview'),
			$screens = self.$project.find('.project-screens'),
			outTime:string = '300ms',
			inTime:string = '500ms';

		if(self.$project.hasClass('is-expanded')){
			self.unbindWindow();
			self.$project.removeClass('is-expanded is-active');
			self.scrollIfNeeded();
			self.$project.css('height', self.initHeight);
			self.changeText('More');


			self.Walt.animate({
				'el': $screens,
				'animation': 'fadeOutRight',
            	'timing': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
				'duration': outTime,
				'onComplete': function(){
					$screens.hide();
					self.Walt.animate({
						'el': $preview.show(),
						'animation': 'fadeInRight',
            			'timing': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
						'duration': inTime
					});
				}
			});
		}else if(!forceClose){
			if(!self.initHeight){
				self.initHeight = self.$project.height();
			}
			var winHeight:number = self.$window.height();
			self.$project.find('.project-tech, .project-info').css('visibility', 'hidden');


			self.$project.addClass('is-expanded is-active');
			var $left = self.$project.find('.left-side');
			setTimeout(function(){
				self.$project.css('height', ($left.height() > winHeight ? $left.height()+50 : winHeight));
			},1);

			self.bindWindowEvent('resize', function(e:WindowController.WindowEvent){
				var leftHeight = $left.height();
				self.$project.css('height', (leftHeight > e.winHeight ? leftHeight+50 : e.winHeight));
				$screens.height( (e.winHeight > leftHeight ? self.$project.height() : leftHeight - 50) );
			});

			self.changeText('Less');
			var projectTop = self.$project.offset().top;
			// if(projectTop <= self.$window.scrollTop() * 1.15) {
				self.scrollWindow(projectTop, 500);
			// }

			self.Walt.animate({
				'el': $preview,
				'animation': 'fadeOutRight',
            	'timing': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
				'duration': outTime,
				'onComplete': function(){
					$preview.hide();
					var leftHeight:number = $left.height();
					$screens.height( (winHeight > leftHeight ? self.$project.height() : leftHeight - 50) );
					self.Walt.animate({
						'el': $screens.show(),
						'animation': 'fadeInRight',
            			'timing': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
						'duration': inTime
					});

					self.$project.find('.project-tech, .project-info').each(function(i:number, v:HTMLElement){
						self.Walt.animate({
							'el': $(v),
							'animation': 'fadeInUp',
							'delay': (0.25 + (i*0.15)) + 's',
							'onBefore': function($el:JQuery){
								$el.css('visibility', 'visible');
							}
						});
					});
				}
			});
		}
	}

	/**
	 * Function to scroll to top of project,
	 * used if collapse button is hit and top of project is out of view
	 * (this prevents clicking 'less info' and being stuck further down the page)
	 */
	private scrollIfNeeded():void {
		var top:number = this.$project.offset().top;
		if(top < this.$window.scrollTop()) {
			this.scrollWindow(top, 500);
		}
	}

	/**
	 * Animates the element (more info <--> less info)
	 * @param {string} newValue String to put into the element
	 */
	private changeText(newValue:string):void {
		var self:MoreInfo = this,
			speed:string = '0.3s';

		self.Walt.animate({
			'el': self.$changingText,
			'animation': (newValue === 'Less' ? 'fadeOutUp' : 'fadeOutDown'),
			'duration': speed,
			'onComplete': function($el:JQuery){
				$el.text(newValue + ' Info');
				self.Walt.animate({
					'el': $el,
					'animation': (newValue === 'Less' ? 'fadeInUp' : 'fadeInDown'),
					'duration': speed
				});
			}
		});
	}
}
