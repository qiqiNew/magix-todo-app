define('app/view/todo/list',['magix'],function(Magix ){

return Magix.View.extend({
    tmpl: "<div><h2>Hello Magix.js!</h2><input type=\"text\" v-model=\"name\"><p>count: {{count}}</p><p>name: {{name}}</p></div>",
    render: function() {
        // 需要渲染到页面的数据
        var data = {
            count: 0,
            name: "Magix"
        }

        // 自动修改数据, 检验
        setInterval(function () {
            ++data.count
        }, 1000)

        this.setVueHTML(data)

    }
})

});