
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


    // 视图生命周期, Magix初始化时调用, 只调用一次, 适合资源准备,事件监听等操作
    init: function () {

        /**
         * 监视地址栏中的参数或path，有变动时，才调用当前view的render方法
         * 通常情况下location有变化不会引起当前view的render被调用，
         * 所以你需要指定地址栏中哪些参数有变化时才引起render调用，使得view只关注与自已需要刷新有关的参数
         **/
        this.observe(null, true)
        //也可以写成对象的形式
        //this.observe({path:true});
    },

    // Magix组件生命周期中的render函数, 系统自动调用, 通常在这里重写并实现业务逻辑
    render: function() {


        this.setHTML(this.id, this.tmpl)    // 将模板注入到模块容器元素内

        // 解析url为对象
        var loc = Magix.Router.parse()
        this.owner.mountVframe('magix_vf_main', 'app/view' + loc.path)
    }
})
