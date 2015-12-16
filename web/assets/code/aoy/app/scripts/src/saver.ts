
declare var $:any;

import Logger = require('logger');

export module Saver {
    var log:any = Logger.log;
    var QUERY_URL:string = 'query.php';
    log('Saver : Constructor');
    init();

  // ---
  function init():void {
    log('Saver : init');
  }


  export function save(id:string, data:string):boolean{
    log('Saver : save', id, data);
    if(!id || !data){ return false; }

    // Connect to query.php, ?a=save


    // #TODO: Convert <div>s to <br />s before saving

    data = encodeURIComponent(data);
    id = encodeURIComponent(id);

    var $el = $('[data-edit="' + id + '"]');
    log(decodeURIComponent($el.data('edit-original')) == decodeURIComponent(data), decodeURIComponent($el.data('edit-original')), decodeURIComponent(data));
    if(decodeURIComponent($el.data('edit-original')) == decodeURIComponent(data)){
      // It's the same, don't save it
      $el.removeClass('is-modified');
    }else{
      $el.addClass('is-modified');

      $.ajax({
        'url': QUERY_URL + '?a=save&id=' + id + '&data=' + data
        })
      .error(function(e1:any,e2:any,e3:any){
        log('Saver : save error', e1, e2, e3);
      })
      .done(function(res:string){
        log('Saver : save res', res);
      });
    }

  }

  export function load(id:string, cb?:any):boolean{
    if(!id){ return false; }

        // Connect to query.php, ?a=load


    id = encodeURIComponent(id);

    $.ajax({
      'url': QUERY_URL + '?a=load&id=' + id
      })
    .error(function(e1:any,e2:any,e3:any){
      log('Saver : load error', e1, e2, e3);
      if(cb){ cb(); }
    })
    .done(function(res:string){
      if(res.toString() !== 'false'){
        var data = $.parseJSON(res);
        log('Saver : load : done', data);
        if(data && data.id && data.data){
          var $el = $('[data-edit="' + data.id + '"]');
          if($el.data('edit-original') == data.data || $el.data('edit-original') == encodeURIComponent(data.data)){
            $el.html(decodeURIComponent($el.data('edit-original')));
          }else{
            $el.html(decodeURIComponent(data.data)).addClass('is-modified');
          }
        }
      }
      if(cb){ cb(); }
    });

  }


    export function reset(id:string, cb?:any):boolean{
    if(!id){ return false; }

        // Connect to query.php, ?a=reset

    id = encodeURIComponent(id);

    $.ajax({
      'url': QUERY_URL + '?a=reset&id=' + id
      })
    .error(function(e1:any,e2:any,e3:any){
      log('Saver : reset error', e1, e2, e3);
    })
    .done(function(res:string){
      log('Saver : reset : done', res);
      var $el = $('[data-edit="' + id + '"]');
      $el.html(decodeURIComponent($el.attr('data-edit-original'))).removeClass('is-modified');
      if(cb){ cb(); }
    });

    log('Saver : load', id);
  }

}