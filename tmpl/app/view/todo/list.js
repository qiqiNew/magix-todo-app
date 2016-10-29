var Magix = require('magix')

module.exports = Magix.View.extend({
    tmpl: '@list.html',
    render: function() {
        this.setHTML(this.id, this.tmpl)
    }
})
