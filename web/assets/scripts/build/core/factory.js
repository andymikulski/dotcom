define(["require", "exports", 'core/logger', 'widgets/ContentList', 'widgets/ContentItem', 'widgets/SplashTitle', 'widgets/StickyThing', 'widgets/CodeSample'], function(require, exports, Logger, ContentList, ContentItem, SplashTitle, StickyThing, CodeSample) {
    (function (Factory) {
        var log = Logger.log, _context;

        // TODO: Turn this into an array for faster lookup
        var WIDGET_DEFINITIONS = {
            'contentList': ContentList,
            'contentItem': ContentItem,
            'splashTitle': SplashTitle,
            'stickyThing': StickyThing,
            'codeSample': CodeSample
        };

        log('Factory : Constructor');

        // ---
        /**
        * Variable initialization
        * @access public
        * @param {string} context Selector string
        */
        function init(context) {
            log('Factory : init');
            _context = context || document.body;
            initWidgets();
        }
        Factory.init = init;
        ;

        /**
        * Looks for a particular widget and inits if element doesn't already have a widget on it
        * @param {Widget}    module Reference to the new widget to init
        * @param {string}    selector widget search string
        * @access private
        */
        function initIfNeeded(module, selector) {
            $(_context).find('[widget="' + selector + '"]').each(function (i, v) {
                var target = $(v);
                if (target.length && !target.data('app-widget')) {
                    if (module.init) {
                        module.init(target);
                        target.data('app-widget', module);
                    } else {
                        target.data('app-widget', new module(target));
                    }
                } else if (target.length && target.data('app-widget')) {
                    if (target.data('app-widget') && target.data('app-widget').refresh) {
                        target.data('app-widget').refresh();
                    }
                }
            });
        }

        /**
        * Finds widgets within a given a container (string selector or jquery object),
        * and inits them if necessary.
        * @param {string|JQuery} selector Selector string or JQuery object of target container
        * @access private
        */
        function refreshSection(selector) {
            var oldContext = _context;
            _context = (selector instanceof $) ? selector : $(selector);

            initWidgets();

            _context = oldContext;
        }

        /**
        * Finds and inits widgets within a certain container
        * (no selector results in Factory.initWidgets())
        * @param {any} selector? Container to search for widgets
        * @access public
        */
        function refresh(selector) {
            // log('Factory : refresh', selector);
            if (selector && (typeof selector !== 'object')) {
                if (WIDGET_DEFINITIONS[selector]) {
                    initIfNeeded(WIDGET_DEFINITIONS[selector], selector);
                }
            } else if (!selector || (typeof selector === 'object')) {
                initWidgets();
            }
        }
        Factory.refresh = refresh;

        /**
        * Loops through entire list of Widget definitions
        * and attempts to refresh/init those it finds.
        * @access private
        */
        function initWidgets() {
            log('Factory : initWidgets');

            for (var widget in WIDGET_DEFINITIONS) {
                if (WIDGET_DEFINITIONS.hasOwnProperty(widget)) {
                    refresh(widget);
                }
            }
        }

        /**
        * Finds active widgets within container (if given), and calls dispose
        * @param {string|JQuery} container? Target container to search for active widgets
        * @access public
        */
        function removeWidgets(container) {
            log('Factory : removeWidgets');
            var self = this;
            $(container || _context).find('[widget]').each(function (i, v) {
                var $v = $(v), widgeData = $v.data('app-widget');
                if (!widgeData) {
                    return;
                }
                widgeData.dispose && widgeData.dispose();
            });
        }
        Factory.removeWidgets = removeWidgets;
    })(exports.Factory || (exports.Factory = {}));
    var Factory = exports.Factory;
});
