var Todo = {}


Todo.Controller = {}
Todo.Model = {}
Todo.View = {}


// Views

Todo.View.model = Todo.Model

Todo.View.$list = document.getElementById('list')

Todo.View.render = function () {
    var self = this
    this.model.getList(function (list) {

        self.$list.innerHTML = ''

        list.forEach(function (item) {
            var $li = document.createElement('li')
            $li.textContent = item.title
            self.$list.appendChild($li)
        })
    })
}


// Models

Todo.Model.list = []


Todo.Model.getList = function (handler) {
    handler.call(this, this.list)
    return this.list
}


Todo.Model.create = function (title, handler) {
    var item = {
        title: title
    }
    this.list.push(item)
    handler.call(this, item)
    return item
}



// Controllers

Todo.Controller.model = Todo.Model
Todo.Controller.view = Todo.View

Todo.Controller.addItem = function (title) {
    var self = this
    self.model.create(title, function () {
        self.view.render()
    })
}
