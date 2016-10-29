var Magix = require('magix')

module.exports = Magix.View.extend({
    tmpl: '@list.html',
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
