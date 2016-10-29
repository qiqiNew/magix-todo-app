
/**
 * js文件使用CommonJS模块语法编写,
 * Magix打包工具会根据combineTool.config配置将模块包装成所需的组件
 **/

var Magix = require('magix')

module.exports = Magix.View.extend({

    // 模板字段命名为tmpl(也可以起是其他有效标识符), 配置模板文件
    // Magix打包工具会读取html文件内容放在这里
    // 更多@规则可参考Magix打包工具：https://github.com/thx/magix-combine
    tmpl: '@default.html',

    // Magix组件生命周期中的render函数, 系统自动调用, 通常在这里重写并实现业务逻辑
    render: function() {

        this.setHTML(this.id, this.tmpl)    // 将模板注入到模块容器元素内
    }
})
