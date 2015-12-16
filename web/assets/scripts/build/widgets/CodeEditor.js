var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var CodeEditor = (function (_super) {
        __extends(CodeEditor, _super);
        function CodeEditor(_el) {
            _super.call(this, _el);
            this.$root.hide();
            this.log('CodeEditor : Constructor');
            this.init();
        }
        CodeEditor.prototype.init = function () {
            var self = this;

            self.sidebar = new CodeEditorSidebar(self.$root.find('[sub-widget*="sidebar"]'));
            self.sidebar.on('fileClick', (function (data) {
                return self.onSidebarFileClick(data.target, data.format, data.location);
            }));
            self.bindUIButtons();

            self.bindFileSwitching();
            self.bindWindowEvent('resize', self.onResizeEvent);

            setTimeout(function () {
                self.sidebar.clickFirst();
                self.updateEditorSize();
            }, 5);
        };

        CodeEditor.prototype.onResizeEvent = function (e) {
            this.updateEditorSize();
        };

        CodeEditor.prototype.updateEditorSize = function () {
            this.$root.find('pre').height((this.$root.height() - this.$root.find('.tabs').height()) + 25);
            this.resizeTabs();
        };

        CodeEditor.prototype.onSidebarFileClick = function (target, format, location) {
            this.log('onSidebarFileClick', target);
            this.selectFile(target, format, location);
        };

        CodeEditor.prototype.highlightCode = function () {
            if (window.hasOwnProperty('hljs') && hljs.highlight) {
                var $code = this.$root.find('code').not('.has-highlight').each(function (i, v) {
                    var $v = $(v);
                    v.innerHTML = hljs.highlight($v.attr('data-format') ? $v.attr('data-format') : 'javascript', $v.text()).value;
                    $v.addClass('has-highlight');
                });
            }
        };

        CodeEditor.prototype.updateFileListing = function (content, title) {
            this.$root.find('.folders > ul').replaceWith(content);
            if (title) {
                this.$root.find('.folders .projectTitle').text(title);
            }
            this.bindFileSwitching();
            this.sidebar.bindItemClicks();
        };

        CodeEditor.prototype.bindFileSwitching = function () {
            var _this = this;
            this.$root.find('.tab').unbind().on('click', (function (e) {
                return _this.handleFileSwitch(e);
            }));
            this.$root.find('.file').unbind().on('click', (function (e) {
                return _this.handleFileSwitch(e);
            }));
        };

        CodeEditor.prototype.handleFileSwitch = function (e) {
            e && e.preventDefault && e.preventDefault();
            var $target = $(e.currentTarget);
            this.selectFile($target.attr('data-tab'), $target.attr('data-format'), $target.attr('data-location'));
        };

        CodeEditor.prototype.resizeTabs = function () {
            // resize the tabs
            var $tabs = this.$root.find('.tab');
            var $folderSidebar = this.$root.find('.folders');
            var max = this.$root.find('.tabs').width() - $folderSidebar.width(), newWidth = (max / ($tabs.length + 1)).toFixed(2) + 'px';
            $tabs.each(function (i, v) {
                $(v).css('width', newWidth);
            });
        };

        CodeEditor.prototype.selectFile = function (target, format, location) {
            var _this = this;
            this.log('selectFile', target);
            if (!target || target === '') {
                return;
            }
            var $tab = this.$root.find('.tab[data-tab="' + target + '"]'), $sidebarItem = this.$root.find('[sub-widget="sidebar"]').find('[data-tab="' + target + '"]'), $code = this.$root.find('pre[data-tab="' + target + '"]');

            this.$root.find('.tab').removeClass('is-active');
            if ($tab.length) {
                $tab.addClass('is-active');
            } else {
                var $newTab = $('<li class="tab is-active" data-tab="' + target + '">' + target + '</li>');

                this.$root.find('.tabs').append($newTab);
                $newTab.on('click', (function (e) {
                    return _this.handleFileSwitch(e);
                }));

                this.resizeTabs();
            }

            this.$root.find('[sub-widget="sidebar"]').find('.file').removeClass('is-active');
            $sidebarItem.addClass('is-active');

            this.$root.find('pre').removeClass('is-active');
            $code.addClass('is-active');

            this.$root.find('.title').text(target);

            this.openNewTab(target, format, location);
        };

        CodeEditor.prototype.convertEntities = function (text) {
            var entityTable = {
                34: 'quot', 38: 'amp', 39: 'apos', 60: 'lt', 62: 'gt', 160: 'nbsp', 161: 'iexcl', 162: 'cent', 163: 'pound', 164: 'curren', 165: 'yen', 166: 'brvbar', 167: 'sect', 168: 'uml', 169: 'copy', 170: 'ordf', 171: 'laquo', 172: 'not', 173: 'shy', 174: 'reg', 175: 'macr', 176: 'deg', 177: 'plusmn', 178: 'sup2', 179: 'sup3', 180: 'acute', 181: 'micro', 182: 'para', 183: 'middot', 184: 'cedil', 185: 'sup1', 186: 'ordm', 187: 'raquo', 188: 'frac14', 189: 'frac12', 190: 'frac34', 191: 'iquest', 192: 'Agrave', 193: 'Aacute', 194: 'Acirc', 195: 'Atilde', 196: 'Auml', 197: 'Aring',
                198: 'AElig', 199: 'Ccedil', 200: 'Egrave', 201: 'Eacute', 202: 'Ecirc', 203: 'Euml', 204: 'Igrave', 205: 'Iacute', 206: 'Icirc', 207: 'Iuml', 208: 'ETH', 209: 'Ntilde', 210: 'Ograve', 211: 'Oacute', 212: 'Ocirc', 213: 'Otilde', 214: 'Ouml', 215: 'times', 216: 'Oslash', 217: 'Ugrave', 218: 'Uacute', 219: 'Ucirc', 220: 'Uuml', 221: 'Yacute', 222: 'THORN', 223: 'szlig', 224: 'agrave', 225: 'aacute', 226: 'acirc', 227: 'atilde', 228: 'auml', 229: 'aring', 230: 'aelig', 231: 'ccedil', 232: 'egrave', 233: 'eacute', 234: 'ecirc', 235: 'euml', 236: 'igrave', 237: 'iacute', 238: 'icirc',
                239: 'iuml', 240: 'eth', 241: 'ntilde', 242: 'ograve', 243: 'oacute', 244: 'ocirc', 245: 'otilde', 246: 'ouml', 247: 'divide', 248: 'oslash', 249: 'ugrave', 250: 'uacute', 251: 'ucirc', 252: 'uuml', 253: 'yacute', 254: 'thorn', 255: 'yuml', 402: 'fnof', 913: 'Alpha', 914: 'Beta', 915: 'Gamma', 916: 'Delta', 917: 'Epsilon', 918: 'Zeta', 919: 'Eta', 920: 'Theta', 921: 'Iota', 922: 'Kappa', 923: 'Lambda', 924: 'Mu', 925: 'Nu', 926: 'Xi', 927: 'Omicron', 928: 'Pi', 929: 'Rho', 931: 'Sigma', 932: 'Tau', 933: 'Upsilon', 934: 'Phi', 935: 'Chi', 936: 'Psi', 937: 'Omega', 945: 'alpha', 946: 'beta',
                947: 'gamma', 948: 'delta', 949: 'epsilon', 950: 'zeta', 951: 'eta', 952: 'theta', 953: 'iota', 954: 'kappa', 955: 'lambda', 956: 'mu', 957: 'nu', 958: 'xi', 959: 'omicron', 960: 'pi', 961: 'rho', 962: 'sigmaf', 963: 'sigma', 964: 'tau', 965: 'upsilon', 966: 'phi', 967: 'chi', 968: 'psi', 969: 'omega', 977: 'thetasym', 978: 'upsih', 982: 'piv', 8226: 'bull', 8230: 'hellip', 8242: 'prime', 8243: 'Prime', 8254: 'oline', 8260: 'frasl', 8472: 'weierp', 8465: 'image', 8476: 'real', 8482: 'trade', 8501: 'alefsym', 8592: 'larr', 8593: 'uarr', 8594: 'rarr', 8595: 'darr', 8596: 'harr', 8629: 'crarr',
                8656: 'lArr', 8657: 'uArr', 8658: 'rArr', 8659: 'dArr', 8660: 'hArr', 8704: 'forall', 8706: 'part', 8707: 'exist', 8709: 'empty', 8711: 'nabla', 8712: 'isin', 8713: 'notin', 8715: 'ni', 8719: 'prod', 8721: 'sum', 8722: 'minus', 8727: 'lowast', 8730: 'radic', 8733: 'prop', 8734: 'infin', 8736: 'ang', 8743: 'and', 8744: 'or', 8745: 'cap', 8746: 'cup', 8747: 'int', 8756: 'there4', 8764: 'sim', 8773: 'cong', 8776: 'asymp', 8800: 'ne', 8801: 'equiv', 8804: 'le', 8805: 'ge', 8834: 'sub', 8835: 'sup', 8836: 'nsub', 8838: 'sube', 8839: 'supe', 8853: 'oplus', 8855: 'otimes', 8869: 'perp',
                8901: 'sdot', 8968: 'lceil', 8969: 'rceil', 8970: 'lfloor', 8971: 'rfloor', 9001: 'lang', 9002: 'rang', 9674: 'loz', 9824: 'spades', 9827: 'clubs', 9829: 'hearts', 9830: 'diams', 338: 'OElig', 339: 'oelig', 352: 'Scaron', 353: 'scaron', 376: 'Yuml', 710: 'circ', 732: 'tilde', 8194: 'ensp', 8195: 'emsp', 8201: 'thinsp', 8204: 'zwnj', 8205: 'zwj', 8206: 'lrm', 8207: 'rlm', 8211: 'ndash', 8212: 'mdash', 8216: 'lsquo', 8217: 'rsquo', 8218: 'sbquo', 8220: 'ldquo', 8221: 'rdquo', 8222: 'bdquo', 8224: 'dagger', 8225: 'Dagger', 8240: 'permil', 8249: 'lsaquo', 8250: 'rsaquo', 8364: 'euro' };

            return text.replace(/[\u00A0-\u2666<>\&]/g, function (c) {
                return '&' + (entityTable[c.charCodeAt(0)] || '#' + c.charCodeAt(0)) + ';';
            });
        };

        CodeEditor.prototype.openNewTab = function (target, format, location) {
            var $preTab = this.$root.find('pre[data-tab="' + target + '"]'), self = this;
            if ($preTab.length) {
                this.$root.find('pre.is-active').removeClass('is-active');
                $preTab.addClass('is-active');
            } else {
                var content = 'lipsum';
                var $newCode = $('<pre data-tab="' + target + '" class="is-active"><code data-format="' + format + '" data-location="' + location + '">' + 'Loading..' + '</code></pre>');
                if (location.indexOf('.php') > -1) {
                    location = 'proxy.php?location=' + location;
                } else {
                    location += '?v=' + (+new Date());
                }
                var request = $.ajax({
                    'url': location,
                    'dataType': 'text',
                    'error': function (e1, e2, e3) {
                        $newCode.find('code').html(e3);
                    },
                    'success': function (res) {
                        $newCode.find('code').html(self.convertEntities(res));
                        self.highlightCode();
                    }
                });
                this.$root.find('.tabs').after($newCode);
                this.updateEditorSize();
            }
        };

        CodeEditor.prototype.bindUIButtons = function () {
            var _this = this;
            this.$root.find('.buttons .close').unbind().on('click', (function (e) {
                return _this.onUIButton(e, 'close');
            }));

            // this.$root.find('.buttons .minimize').unbind().on('click', <any>( (e)=>this.onUIButton(e, 'minimize') ));
            this.$root.find('.buttons .maximize').unbind().on('click', (function (e) {
                return _this.onUIButton(e, 'maximize');
            }));
        };

        CodeEditor.prototype.bindKeys = function () {
            var self = this;
            self.$window.on('keyup', function (e) {
                if (e && e.keyCode && e.keyCode === 27) {
                    self.hide();
                }
            });
        };

        CodeEditor.prototype.unbindKeys = function () {
            this.$window.unbind('keyup');
        };

        CodeEditor.prototype.hide = function (callback) {
            var self = this;
            self.unbindKeys();

            self.Walt.animate({
                'el': self.$root,
                'animation': 'zoomOut',
                'duration': '0.3s',
                'onBefore': function () {
                    self.emit('hide');
                    self.dim.hide();
                },
                'onComplete': function ($el) {
                    $el.hide();
                    callback && callback();
                }
            });
        };

        CodeEditor.prototype.show = function (callback) {
            var self = this;
            self.Walt.animate({
                'el': self.$root,
                'animation': 'zoomIn',
                'duration': '0.3s',
                'onBefore': function ($el) {
                    self.emit('show');
                    $el.show();
                    self.dim.show();
                    self.bindKeys();
                    callback && callback();
                }
            });
        };

        CodeEditor.prototype.onUIButton = function (e, action) {
            var self = this;
            e && e.preventDefault && e.preventDefault();

            switch (action) {
                case 'close':
                    self.hide();
                    break;
                case 'minimize':
                    if (self.$root.hasClass('is-minimized')) {
                        self.$root.removeClass('is-minimized');
                        self.dim.$el.addClass('show');
                    } else {
                        self.$root.removeClass('is-maximized').addClass('is-minimized');
                        self.dim.$el.removeClass('show').css('display', null);
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

            setTimeout(function () {
                self.updateEditorSize();
            }, 500);
        };

        CodeEditor.prototype.dispose = function () {
            this.$root.remove();
            _super.prototype.dispose.call(this);
        };
        return CodeEditor;
    })(Base.Widget);

    // Sidebar
    var CodeEditorSidebar = (function (_super) {
        __extends(CodeEditorSidebar, _super);
        function CodeEditorSidebar(_el) {
            _super.call(this, _el);
            this.log('CodeEditorSidebar : Constructor');

            this.init();
        }
        CodeEditorSidebar.prototype.init = function () {
            var self = this;
            self.log('CodeEditorSidebar : init');
            self.bindItemClicks();
        };

        CodeEditorSidebar.prototype.bindItemClicks = function () {
            var _this = this;
            this.log('CodeEditorSidebar : bindItemClicks');
            this.$root.find('.dir').unbind().on('click', (function (e) {
                return _this.onDirectoryClick(e);
            }));
            this.$root.find('.file').unbind().on('click', (function (e) {
                return _this.onFileClick(e);
            }));
        };

        CodeEditorSidebar.prototype.onDirectoryClick = function (e) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();
            this.log('CodeEditorSidebar : onDirectoryClick');

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

        CodeEditorSidebar.prototype.onFileClick = function (e) {
            e && e.preventDefault && e.preventDefault();
            e && e.stopPropagation && e.stopPropagation();

            this.log('CodeEditorSidebar : onFileClick');

            var $target = $(e.currentTarget);

            this.emit('fileClick', {
                'target': $target.attr('data-tab'),
                'format': $target.attr('data-format'),
                'location': $target.attr('data-location')
            });
        };

        CodeEditorSidebar.prototype.clickFirst = function () {
            this.$root.find('.file').first().click();
        };
        return CodeEditorSidebar;
    })(Base.Widget);
    return CodeEditor;
});
