var Magix = require('magix')

module.exports = Magix.View.extend({
    tmpl: '@footer.html',
    render: function() {
        this.setHTML(this.id, this.tmpl)
    }
})
