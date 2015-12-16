
declare var $:any;

import Logger = require('logger');
import reqSaver = require('saver');

export module Editor {
    var log:any = Logger.log;
    var Saver:any = reqSaver.Saver;
    var $dim:any;
    var $toolkit:any;

    log('Editor : Constructor');
    init();

  // ---

  export function init() {
    log('Editor : init');

    createToolKit();
    createDim();
    bindEditables();
    bindMouse();

  }

  function bindEditables():void {
    log('Editor : bindEditables');
     $('[data-edit]').each(function(i:number, v:Element){
      var $v = $(v);
      if(!$v.attr('data-edit') || $v.attr('data-edit') == ''){
        $v.css('visibility', 'visible').hide().fadeIn();
      }else{
        $v.attr('data-edit-original', encodeURIComponent($v.html()));
        Saver.load($v.attr('data-edit'), function(){
          $v.css('visibility', 'visible').hide().fadeIn();
        });
        $v.on('dblclick', doubleClickHandler);
      }
    });
  }

  function bindMouse():void {
    log('Editor : bindMouse');

    $(window).on('mousemove', mouseMoveHandler);
  }


  // -- Dim stuff can be broken out
  function createDim(){
    log('Editor : createDim');
    if(!$dim || !$dim.length){
      $(document.body).append($dim = $('<div id="editor-dim"></div>'));
      $dim.on('dblclick', blurHandler);
    }
  }

  function showDim() {
    if(!$dim || !$dim.length){ createDim(); }

    $dim.fadeIn(300);
    $(document.body).addClass('is-dim');
  }

  function hideDim(cb?:any) {
    if(!$dim || !$dim.length){ createDim(); }

    $toolkit.find('.needs-focus').addClass('is-disabled');
    $(document.body).removeClass('is-dim');
    $dim.fadeOut(function(){
      if(cb){ cb(); }
    });
  }
  // --


  // -- Toolkit can be broken out
  function createToolKit(){
    log('Editor : createToolKit');
    if(!$toolkit || !$toolkit.length){
      var toolkit = '<div id="editor-toolkit" class="is-hiding">';
         toolkit += '<ul>';
         // Reset changes
         toolkit += '<li class="is-disabled needs-focus">';
         toolkit += '<a href="#" class="undo" title="Reset Changes"></a>';
         toolkit += '</li>';
         // Show editable
         toolkit += '<li>';
         toolkit += '<a href="#" class="show-edits" title="Toggle Editable Fields"></a>';
         toolkit += '</li>';

         // Show modified
         toolkit += '<li>';
         toolkit += '<a href="#" class="show-mods" title="Toggle Modified Fields"></a>';
         toolkit += '</li>';

         // Show comp
         toolkit += '<li>';
         toolkit += '<a href="#" class="show-comp" title="Show Comp Overlay"></a>';
         toolkit += '</li>';
         // Show comp transparent
         toolkit += '<li>';
         toolkit += '<a href="#" class="show-comp-transparent" title="Transparent Overlay"></a>';
         toolkit += '</li>';
         // Show comp invert
         toolkit += '<li>';
         toolkit += '<a href="#" class="show-comp-invert" title="Invert Overlay"></a>';
         toolkit += '</li>';

         //--
         toolkit += '</ul>';
         toolkit += '</div>';

      $(document.body).append($toolkit = $(toolkit));
    }


    // Bind actions to buttons
    $toolkit.find('.undo').on('click', undoAction);
    $toolkit.find('.show-edits').on('click', toggleAction);
    $toolkit.find('.show-mods').on('click', toggleModsAction);
    $toolkit.find('.show-comp').on('click', toggleCompAction);
    $toolkit.find('.show-comp-transparent').on('click', toggleTransparentCompAction);
    $toolkit.find('.show-comp-invert').on('click', toggleInvertCompAction);
  }

  function undoAction(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    Saver.reset($('.editor-focus').attr('data-edit'));
  }

  function toggleAction(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    if($(document.body).hasClass('show-editable')){
      $(document.body).removeClass('show-editable');
    }else{
      $(document.body).addClass('show-editable');
    }
  }

  function toggleModsAction(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    if($(document.body).hasClass('show-modified')){
      $(document.body).removeClass('show-modified');
    }else{
      $(document.body).addClass('show-modified');
    }
  }

  function checkComp(){
    var a:string = (window.location.pathname).slice( window.location.pathname.lastIndexOf('/'), window.location.pathname.length ) .replace('/','').replace('.php','');

    if(window.location.pathname.indexOf('work') <= -1){
      $('#comp').css('background-image', 'url("images/comp/' + (a != '' ? a:'index') + '.jpg")');
    }else{
      $('#comp').css('background-image', 'url("../images/comp/work/' + a + '.jpg")');
    }
  }

  function toggleCompAction(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();
    checkComp();

    if($(document.body).hasClass('show-comp')){
      $(document.body).removeClass('show-comp');
    }else{
      $(document.body).addClass('show-comp');
    }
  }

  function toggleTransparentCompAction(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();
    checkComp();

    if($(document.body).hasClass('show-comp-transparent')){
      $(document.body).removeClass('show-comp-transparent');
    }else{
      $(document.body).addClass('show-comp-transparent');
    }
  }

  function toggleInvertCompAction(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();
    checkComp();

    if($(document.body).hasClass('show-comp-invert')){
      $(document.body).removeClass('show-comp-invert');
    }else{
      $(document.body).addClass('show-comp-invert');
    }
  }

  function showToolkit() {
    if(!$toolkit || !$toolkit.length){ createToolKit(); }

    if(!$toolkit.hasClass('is-hiding')){
      $toolkit.addClass('is-hiding');
    }

    $toolkit.stop(true, true).animate({
        'bottom': 0
      }, 300, function(){
        $toolkit.removeClass('is-hiding is-transitioning').addClass('is-showing');
        });
  }

  function hideToolkit(cb?:any) {
    if(!$toolkit || !$toolkit.length){ createToolKit(); }
    $toolkit.addClass('is-transitioning');

    if(!$toolkit.hasClass('is-showing')){
      $toolkit.addClass('is-showing');
    }

    $toolkit.stop(true, true).animate({
        'bottom': -50
      }, 300, function(){
        $toolkit.removeClass('is-showing is-transitioning').addClass('is-hiding');
      if(cb){ cb(); }
    });
  }
  // --


  function blurHandler(e:Event){
    var $this = $('.editor-focus');
    if(!$this.length){ return; }
    hideToolkit();
    hideDim(function(){


      var needsUpdate = false;
      // Bold
      var html = $this.html();
      html = html.split('**');
      for(var i = 0; i < html.length; i++){
        if(i % 2 !== 0){
          needsUpdate = true;
          html[i] = '<span class="is-bold">' + html[i] + '</span>';
        }
      }
      html = html.join('');

      // Red
      html = html.split('%%');
      for(var i = 0; i < html.length; i++){
        if(i % 2 !== 0){
          needsUpdate = true;
          html[i] = '<span class="is-red">' + html[i] + '</span>';
        }
      }
      html = html.join('');

      // Underline
      html = html.split('__');
      for(var i = 0; i < html.length; i++){
        if(i % 2 !== 0){
          needsUpdate = true;
          html[i] = '<span class="is-underlined">' + html[i] + '</span>';
        }
      }
      html = html.join('');

      if(needsUpdate){
        $this.html(html);
      }



      Saver.save($this.attr('data-edit'), encodeURIComponent(html));
      $this.removeAttr('contenteditable');
      $this.removeClass('editor-focus');
      $('.is-focus').removeClass('is-focus');
    });
  }

  function mouseMoveHandler(e:MouseEvent){
    if($(document.body).hasClass('is-dim') || $toolkit.hasClass('is-transitioning')){ return; }
      if(e.clientY >= 0.8 * $(window).height()){
        if($toolkit.hasClass('is-hiding')){
          $toolkit.addClass('is-transitioning');
          showToolkit();
        }
      }else{
        if($toolkit.hasClass('is-showing')){
          $toolkit.addClass('is-transitioning');
          hideToolkit();
        }
      }
  }

  function doubleClickHandler(e:MouseEvent){
    var $this = $(e.currentTarget);

    $this.addClass('editor-focus');
    $this.attr('contenteditable', true);

    $toolkit.find('.needs-focus').removeClass('is-disabled');

    if($this.hasClass('new-content__full-text') || $this.hasClass('new-content__full-header')){
      $this.closest('li').addClass('is-focus');
    }

    showDim();
    showToolkit();

    // $this.on('blur', blurHandler);
  }

}

