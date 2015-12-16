var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base'], function(require, exports, Base) {
    
    var ContentList = (function (_super) {
        __extends(ContentList, _super);
        function ContentList(_el) {
            _super.call(this, _el);
            this.log('ContentList : Constructor');
            this.init();
        }
        ContentList.prototype.init = function () {
            var self = this;

            self.log('ContentList : Init');
            $('.filler').height(self.$window.height());
            self.bindWindowEvent('resize', self.onResizeEvent);
            // self.$root.find('[widget="contentItem"]').first().height( self.$window.height()*0.85 );
        };

        ContentList.prototype.onResizeEvent = function (e) {
            $('.filler').height(this.$window.height());
        };
        return ContentList;
    })(Base.Widget);
    return ContentList;
});
