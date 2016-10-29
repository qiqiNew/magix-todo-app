define('app/view/todo/list',['magix','jquery','app/service/service'],function(Magix ,$ ,Service ){




return Magix.View.extend({
    tmpl: "<div><form class=\"form-inline\" mx-submit=\"search()\"><div class=\"form-group\"><label>关键字:</label><input type=\"text\" class=\"form-control\" v-model=\"keyword\"></div><button class=\"btn btn-default\" type=\"submit\">搜索</button></form><table class=\"table table-striped\"><thead><tr><th>ID</th><th>名称</th><th>操作</th></tr></thead><tbody><tr v-for=\"todo in todos\"><td>{{todo.id}}</td><td>{{todo.name}}</td><td><a href=\"javascript:;\" class=\"mr10\" mx-click=\"deleteItem({id: {{todo.id}}})\">删除</a></td></tr></tbody></table></div>",
    init: function () {
        this.observe('keyword')
    },
    render: function() {
        var that = this

        var router = Magix.Router.parse()
        this.data = {
            keyword: router.params.keyword
        }

        new Service().all([{
            name: 'todo-list',
            urlParams: {
                keyword: this.data.keyword
            }
        }], function(err, listModel) {

            if (err) {
                this.data.err = err
            } else {
                var respObj = listModel.get('data', {})
                var todoList = respObj.data.todos
                that.data.todos = todoList.filter(function (todo) {
                    return todo.name.search(that.data.keyword) != -1
                })
            }
            that.setVueHTML(that.data)

        })
    },
    'search<submit>': function (e) {
        e.preventDefault()
        Magix.Router.to({
            keyword: this.data.keyword
        })
    },
    'deleteItem<click>': function (e) {
        var that = this

        // Maigx在模板中传递的参数对象挂载到event.params
        var paramObj = e.params
        $.ajax({
            url: '/api/todo/delete.json',
            data: {
                id: paramObj.id
            }
        }).done(function (resp) {

            if (resp.info.ok) {
                alert('删除成功')
            } else {
                alert('删除失败')
            }
            that.render()
        })
    }
})

});