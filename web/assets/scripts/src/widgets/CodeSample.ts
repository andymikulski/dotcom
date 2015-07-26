declare var hljs;

import Base = require('core/base');
import WindowController = require('core/windowController');

export = CodeSample;
class CodeSample extends Base.Widget {
    private sidebar:CodeSampleSidebar;

	constructor(_el:JQuery) {
		super(_el);
		this.log('CodeSample : Constructor');
		this.init();
	}

	private init():void {
		var self:CodeSample = this;

        self.sidebar = new CodeSampleSidebar( self.$root.find('[sub-widget*="sidebar"]') );
        self.bindUIButtons();

        self.highlightCode();
        self.bindFileSwitching();
        self.selectFile('readme.md');
	}

    private highlightCode():void {
        if(window.hasOwnProperty('hljs') && hljs.highlight){
            var $code:JQuery = this.$root.find('code').each(function(i:number,v:HTMLElement){
                var $v = $(v);
                v.innerHTML = hljs.highlight( $v.attr('data-format') ? $v.attr('data-format') : 'javascript', $v.text()).value;
            });
        }
    }


    private bindFileSwitching():void {
        this.$root.find('.tab').on('click', <any>( (e) => this.handleFileSwitch(e) ));
        this.$root.find('.file').on('click', <any>( (e) => this.handleFileSwitch(e) ));
    }

    private handleFileSwitch(e:MouseEvent):void {
        e && e.preventDefault && e.preventDefault();

        this.selectFile( $(e.currentTarget).attr('data-tab') );
    }

    private selectFile(target:string):void {
        if(!target || target === ''){ return; }
        var $tab:JQuery = this.$root.find('.tab[data-tab="' + target + '"]'),
            $sidebarItem:JQuery = this.$root.find('[sub-widget="sidebar"]').find('[data-tab="' + target + '"]'),
            $code:JQuery = this.$root.find('pre[data-tab="' + target + '"]');

        this.$root.find('.tab').removeClass('is-active');
        $tab.addClass('is-active');

        this.$root.find('[sub-widget="sidebar"]').find('.file').removeClass('is-active');
        $sidebarItem.addClass('is-active');

        this.$root.find('pre').removeClass('is-active');
        $code.addClass('is-active');

        this.$root.find('.title').text(target);
    }

    private bindUIButtons():void {
        this.$root.find('.buttons .close').unbind().on('click', <any>( (e)=>this.onUIButton(e, 'close') ));
        this.$root.find('.buttons .minimize').unbind().on('click', <any>( (e)=>this.onUIButton(e, 'minimize') ));
        this.$root.find('.buttons .maximize').unbind().on('click', <any>( (e)=>this.onUIButton(e, 'maximize') ));
    }

    private onUIButton(e:MouseEvent, action:string):void {
        var self:CodeSample = this;
        e && e.preventDefault && e.preventDefault();

        switch(action){
            case 'close':
                self.dispose();
                break;
            case 'minimize':
                if(self.$root.hasClass('is-minimized')){
                    self.$root.removeClass('is-minimized');
                }else{
                    self.$root.removeClass('is-maximized').addClass('is-minimized');
                    self.$body.css('overflow', 'inherit');
                }
                break;
            case 'maximize':
                if(self.$root.hasClass('is-maximized')){
                    self.$root.removeClass('is-maximized');
                    self.$body.css('overflow', 'inherit');
                }else{
                    self.$root.removeClass('is-minimized').addClass('is-maximized');
                    self.$body.css('overflow', 'hidden');
                }
                break;
            default:
                break;
        }
    }

    public dispose():void {
        this.$root.remove();
        super.dispose();
    }
}





// Sidebar
class CodeSampleSidebar extends Base.Widget {
    constructor(_el:JQuery){
        super(_el);
        this.log('CodeSampleSidebar : Constructor');

        this.init();
    }

    private init():void {
        var self:CodeSampleSidebar = this;
        self.log('CodeSampleSidebar : init');
        self.bindDirectories();
    }

    private bindDirectories():void {
        this.log('CodeSampleSidebar : bindDirectories');
        this.$root.find('.dir').unbind().on('click', <any>( (e)=>this.onDirectoryClick(e) ));
        this.$root.find('.file').unbind().on('click', <any>( (e)=>this.onFileClick(e) ));
    }

    private onDirectoryClick(e:MouseEvent):void {
        e && e.preventDefault && e.preventDefault();
        e && e.stopPropagation && e.stopPropagation();
        this.log('CodeSampleSidebar : onDirectoryClick');

        var $target:JQuery = $(e.target);

        if(!$target.hasClass('dir')){
            $target = $(e.target).closest('.dir');
        }

        if($target.hasClass('expanded')){
            $target.removeClass('expanded');
        }else{
            $target.addClass('expanded');
        }
    }

    private onFileClick(e:MouseEvent):void {
        e && e.preventDefault && e.preventDefault();
        e && e.stopPropagation && e.stopPropagation();

        this.log('CodeSampleSidebar : onFileClick');

        var $target:JQuery = $(e.currentTarget);
    }
}
