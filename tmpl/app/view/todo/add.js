var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
    tmpl: '@add.html',
    render: function() {
        this.setHTML(this.id, this.tmpl)
    },

    /**
     * 事件监听器方括号内注明方法所监听的事件, 事件监听器的this为view
     * @param e {Event} 所使用框架的event事件, 如果是jquery, 那就是jquery事件, kissy类似
     **/
    'saveTodo<submit>': function (e) {
        e.preventDefault()

        // 通过id查找模块容器DOM节点
        var $main = $('#' + this.id)
        var $name = $main.find('[name=name]')

        $.ajax({
            url: '/api/todo/add.json',
            data: {
                name: $name.val()
            }
        }).then(function (resp) {
            if (resp.info.ok) {
                alert('保存成功')
                Magix.Router.to('/todo/list')
            } else {
                alert(resp.info.message)
            }
        })

    }
})
