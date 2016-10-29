
var Magix = require('magix')
var $ = require('$')

var Service = Magix.Service.extend(function(bag, callback) {
    var data = bag.get('urlParams')

    $.ajax({
        url: bag.get('url'),
        data: data,
        type: bag.get('method') || 'GET',
        complete: function(xhr, text) {
            if (text == 'error') {
                callback({
                    msg: xhr.statusText
                })
            } else {
                var respObj = $.parseJSON(xhr.responseText)

                bag.set('data', respObj)
                var errorInfo
                if (!respObj.info.ok) {
                    errorInfo = {
                        msg:respObj.info.message
                    }
                }
                callback(errorInfo)
            }
        }
    })
})

Service.add([{
    name: 'todo-add',
    url: 'api/todo/add.json'
},{
    name: 'todo-list',
    url: 'api/todo/list.json',
    method: 'get'
}
])
module.exports = Service
