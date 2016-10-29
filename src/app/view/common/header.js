define('app/view/common/header',['magix'],function(Magix ){

return Magix.View.extend({
    tmpl: "<header><h2>header</h2></header>",
    render: function() {
        this.setHTML(this.id, this.tmpl)
    }
})

});