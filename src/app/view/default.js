define('app/view/default',['magix'],function(Magix ){
/**
 * js文件使用CommonJS模块语法编写,
 * Magix打包工具会根据combineTool.config配置将模块包装成所需的组件
 **/



return Magix.View.extend({

    // 模板字段命名为tmpl(也可以起是其他有效标识符), 配置模板文件
    // Magix打包工具会读取html文件内容放在这里
    // 更多@规则可参考Magix打包工具：https://github.com/thx/magix-combine
    tmpl: "<div class=\"container\"><div mx-view=\"app/view/common/header\"></div><div id=\"magix_vf_main\">main content</div><div mx-view=\"app/view/common/footer\"></div></div>",

    // Magix组件生命周期中的render函数, 系统自动调用, 通常在这里重写并实现业务逻辑
    render: function() {

        this.setHTML(this.id, this.tmpl)    // 将模板注入到模块容器元素内
    }
})

});