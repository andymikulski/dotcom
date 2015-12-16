import Base = require('core/base');
import Logger = require('core/logger');
import Kiu = require('core/kiu');

/* Widgets */
import giantCarousel = require('widgets/carousel/giantCarousel');
import exploreCarousel = require('widgets/page/work/exploreCarousel');
import contactMap = require('widgets/page/contact/contactMap');
import contactButton = require('widgets/page/contact/contactButton');
import collapseNav = require('widgets/ui/collapseNav');
import dropdownWidget = require('widgets/ui/dropdown');
import vimeoWidget = require('widgets/ui/vimeoPlayer');
import parallax = require('widgets/ui/parallax');
import projectTitle = require('widgets/page/work/projectTitle');
import accordionMenu = require('mobile/accordion');
import textSearch = require('widgets/page/work/textsearch');
import globalIndex = require('widgets/page/index/index');
import newsFilter = require('widgets/page/news/filter');
import awardsFilter = require('widgets/page/awards/filter');
import workFilter = require('widgets/page/work/filter');
import newsItem = require('widgets/page/news/item');
import navToggle = require('mobile/navToggle');
import subnavMenu = require('mobile/subnavMenu');

export module Factory {
    var log:any = Logger.log,
        _context:any;


    // TODO: Turn this into an array for faster lookup
  	var WIDGET_DEFINITIONS:Object = {

      // giantcarousel is the first thing the user sees
      // on the index page, so it should be first in the init pile
      'giant-carousel': giantCarousel,
      // global (components)
      'dropdown': dropdownWidget,
      'parallax': parallax,
      'text-search': textSearch,
      'vimeo-player': vimeoWidget,
      'collapse-nav': collapseNav,
      'project-title': projectTitle,

      // carousels
      'explore-carousel': exploreCarousel,

      // contact stuff (navbar button binding, map widget, info widget)
      'contact-map': contactMap,
      'contact-button': contactButton,

      // news article item
      'news-item': newsItem,

      // filters
      'awards-filter': awardsFilter.AwardsFilter,
      'work-filter': workFilter,
      'news-filter': newsFilter,

      // pages
      'global-index': globalIndex,

      // mobile only
      'mobile-navtoggle': navToggle,
      'mobile-subnav': subnavMenu,
      'mobile-accordion': accordionMenu
  	};

    log('Factory : Constructor');

  // ---

  /**
   * Variable initialization
   * @access public
   * @param {string} context Selector string
   */
  export function init(context:string):void {
    log('Factory : init');
    _context = context || document.body;
    initWidgets();
  };

  /**
   * Looks for a particular widget and inits if element doesn't already have a widget on it
   * @param {Widget}    module Reference to the new widget to init
   * @param {string} selector data-widget search string
   * @access private
   */
  function initIfNeeded(module:any, selector:string):void {
    $(_context).find('[data-widget="' + selector +'"]').each(function (i, v) {
      var target:JQuery = $(v);
      if (target.length && !target.data('fb-widget')) {
        if (module.init) {
          module.init(target);
          target.data('fb-widget', module);
        } else {
          target.data('fb-widget', new module(target));
        }
      } else if (target.length && target.data('fb-widget')) {
        if (target.data('fb-widget') && target.data('fb-widget').refresh) {
          target.data('fb-widget').refresh();
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
  function refreshSection(selector:any):void {
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
  export function refresh(selector?:any):void {
  	// log('Factory : refresh', selector);
    if (selector && (typeof selector !== 'object')) {
      if (WIDGET_DEFINITIONS[selector]) {
        initIfNeeded(WIDGET_DEFINITIONS[selector], selector);
      }
    } else if(!selector || (typeof selector === 'object')) {
      initWidgets();
    }
  }


  /**
   * Loops through entire list of Widget definitions
   * and attempts to refresh/init those it finds.
   * Also fires Kiu.onPageInit after Widget initialization
   * @access private
   */
  function initWidgets():void {
  	log('Factory : initWidgets');

    for (var widget in WIDGET_DEFINITIONS) {
      if(WIDGET_DEFINITIONS.hasOwnProperty(widget)){
        refresh(widget);
      }
    }

    setTimeout(function(){
      Kiu.onPageInit();
    }, 250);
  }

  /**
   * Finds active widgets within container (if given), and calls dispose
   * @param {string|JQuery} container? Target container to search for active widgets
   * @access public
   */
  export function removeWidgets(container?:any):void {
    log('Factory : removeWidgets');
    var self = this;
    $(container || _context).find('[data-widget]').each(function(i,v){
      var $v = $(v),
          widgeData = $v.data('fb-widget');
      if(!widgeData){ return; }
      widgeData.dispose&&widgeData.dispose();
    });
  }

}

