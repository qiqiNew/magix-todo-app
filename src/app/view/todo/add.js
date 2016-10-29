define('app/view/todo/add',['magix'],function(Magix ){

return Magix.View.extend({
    tmpl: "<div>todo add</div>",
    render: function() {
        this.setHTML(this.id, this.tmpl)
    }
})

});