var Magix = require('magix')

module.exports = Magix.View.extend({
    tmpl: '@header.html',
    render: function() {
        this.setHTML(this.id, this.tmpl)
    }
})
