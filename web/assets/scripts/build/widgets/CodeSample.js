var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var CodeSample = (function (_super) {
        __extends(CodeSample, _super);
        function CodeSample(_el) {
            _super.call(this, _el);
            this.log('CodeSample : Constructor');
            this.init();
        }
        CodeSample.prototype.init = function () {
            var self = this;

            self.sidebar = new CodeSampleSidebar(self.$root.find('[sub-widget*="sidebar"]'));
            self.bindUIButtons();

            self.highlightCode();
            self.bindFileSwitching();
            self.selectFile('readme.md');
        };

        CodeSample.prototype.highlightCode = function () {
            if (window.hasOwnProperty('hljs') && hljs.highlight) {
                var $code = this.$root.find('code').each(function (i, v) {
                    var $v = $(v);
                    v.innerHTML = hljs.highlight($v.attr('data-format') ? $v.attr('data-format') : 'javascript', $v.text()).value;
                });
            }
        };

        CodeSample.prototype.bindFileSwitching = function () {
            var _this = this;
            this.$root.find('.tab').on('click', (function (e) {
                return _this.handleFileSwitch(e);
            }));
            this.$root.find('.file').on('click', (function (e) {
                return _this.handleFileSwitch(e);
            }));
        };

        CodeSample.prototype.handleFileSwitch = function (e) {
            e && e.preventDefault && e.preventDefault();

            this.selectFile($(e.currentTarget).attr('data-tab'));
        };

        CodeSample.prototype.selectFile = function (target) {
            if (!target || target === '') {
                return;
            }
            var $tab = this.$root.find('.tab[data-tab="' + target + '"]'), $sidebarItem = this.$root.find('[sub-widget="sidebar"]').find('[data-tab="' + target + '"]'), $code = this.$root.find('pre[data-tab="' + target + '"]');

            this.$root.find('.tab').removeClass('is-active');
            $tab.addClass('is-active');

            this.$root.find('[sub-widget="sidebar"]').find('.file').removeClass('is-active');
            $sidebarItem.addClass('is-active');

            this.$root.find('pre').removeClass('is-active');
            $code.addClass('is-active');

            this.$root.find('.title').text(target);
        };

        CodeSample.prototype.bindUIButtons = function () {
            var _this = this;
            this.$root.find('.buttons .close').unbind().on('click', (function (e) {
                return _this.onUIButton(e, 'close');
            }));
            this.$root.find('.buttons .minimize').unbind().on('click', (function (e) {
                return _this.onUIButton(e, 'minimize');
            }));
            this.$root.find('.buttons .maximize').unbind().on('click', (function (e) {
                return _this.onUIButton(e, 'maximize');
            }));
        };

        CodeSample.prototype.onUIButton = function (e, action) {
            var self = this;
            e && e.preventDefault && e.preventDefault();

            switch (action) {
                case 'close':
                    self.dispose();
                    break;
                case 'minimize':
                    if (self.$root.hasClass('is-minimized')) {
                        self.$root.removeClass('is-minimized');
                    } else {
                        self.$root.removeClass('is-maximized').addClass('is-minimized');
                        self.$body.css('overflow', 'inherit');
                    }
                    break;
                case 'maximize':
                    if (self.$root.hasClass('is-maximized')) {
                        self.$root.removeClass('is-maximized');
                        self.$body.css('overflow', 'inherit');
                    } else {
                        self.$root.removeClass('is-minimized').addClass('is-maximized');
                        self.$body.css('overflow', 'hidden');
                    }
                    break;
                default:
                    break;
            }
        };

        CodeSample.prototype.dispose = function () {
            this.$root.remove();
            _super.prototype.dispose.call(this);
        };
        return CodeSample;
    })(Base.Widget);

    // Sidebar
    var CodeSampleSidebar = (function (_super) {
        __extends(CodeSampleSidebar, _super);
        function CodeSampleSidebar(_el) {
            _super.call(this, _el);
            this.log('CodeSampleSidebar : Constructor');

            this.init();
        }
        CodeSampleSidebar.prototype.init = function () {
            var self = this;
            self.log('CodeSampleSidebar : init');
            self.bindDirectories();
        };

        CodeSampleSidebar.prototype.bindDirectories = function () {
            var _this = this;
            this.log('CodeSampleSidebar : bindDirectories');
            this.$root.find('.dir').unbind().on('click', (function (e) {
                return _this.onDirectoryClick(e);
            }));
            this.$root.find('.file').unbind().on('click', (function (e) {
                return _this.onFileClick(e);
            }));
        };

        CodeSampleSidebar.prototype.onDirectoryClick = function (e) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();
            this.log('CodeSampleSidebar : onDirectoryClick');

            var $target = $(e.target);

            if (!$target.hasClass('dir')) {
                $target = $(e.target).closest('.dir');
            }

            if ($target.hasClass('expanded')) {
                $target.removeClass('expanded');
            } else {
                $target.addClass('expanded');
            }
        };

        CodeSampleSidebar.prototype.onFileClick = function (e) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();

            this.log('CodeSampleSidebar : onFileClick');

            var $target = $(e.currentTarget);
        };
        return CodeSampleSidebar;
    })(Base.Widget);
    return CodeSample;
});
