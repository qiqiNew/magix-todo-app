var Magix = require('magix')

module.exports = Magix.View.extend({
    tmpl: '@add.html',
    render: function() {
        this.setHTML(this.id, this.tmpl)
    }
})
