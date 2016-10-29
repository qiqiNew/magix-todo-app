
var Magix = require('magix')
var $ = require('jquery')
var Service = require('app/service/service')

module.exports = Magix.View.extend({
    tmpl: '@list.html',
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
