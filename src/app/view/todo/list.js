define('app/view/todo/list',['magix'],function(Magix ){

return Magix.View.extend({
    tmpl: "<div>todo list</div>",
    render: function() {
        this.setHTML(this.id, this.tmpl)
    }
})

});