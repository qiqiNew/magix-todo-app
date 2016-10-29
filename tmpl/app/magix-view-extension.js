
var Magix = require('magix')
var $ = require('jquery')
var _ = require('underscore')
var Vue = require('vue')


Magix.View.merge({

    /**
     * 传入数据并使用_.template()作为模板引擎
     **/
    setViewHTML: function (data) {
        if (!this._templateFn) {
            this._templateFn = _.template(this.tmpl)
        }
        this.setHTML(this.id, this._templateFn(data))
    },


    /**
     * 传入数据并使用Vue作为模板引擎
     **/
    setVueHTML: function (data) {
        var deferred = $.Deferred()
        var that = this

        this.vm = new Vue({

            //  设置view容器元素为vue.js模板渲染容器元素
            el: document.getElementById(this.id),

            //  设置视图的tmpl字段为vue.js模板, 打包工具读取模板嵌入
            template: this.tmpl,

            // vue.js参数: 模板插入容器而不是替换容器元素
            replace: false,

            // 渲染模板的数据
            data: data,

            // vue.js异步, 需要监听渲染完成, 通知view和用户
            ready: function () {
                deferred.resolve()
                that.endUpdate() //vue渲染完成后，需要调用endUpdate告知Magix当前区块渲染完成，而内置的setHTML会自动调用
            }
        })

        return deferred.promise()
    }

})
