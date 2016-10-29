define('app/view/common/footer',['magix'],function(Magix ){

return Magix.View.extend({
    tmpl: "<footer><h2>footer</h2></footer>",
    render: function() {
        this.setHTML(this.id, this.tmpl)
    }
})

});