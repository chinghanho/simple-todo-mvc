var Todo = {}


Todo.Controller = {}
Todo.Model = {}
Todo.View = {}


// Views

Todo.View.model = Todo.Model

Todo.View.$list = document.getElementById('list')

// 執行 render 一次清掉再重新把 DOM 生回來塞入，這是簡單的作法只是 demo 用，
// 正式環境上這個作法是滿浪費效能的，目前最紅、最有效的寫法是「Virtual DOM」。
Todo.View.render = function () {
    var self = this

    // 從 Model 層要資料
    self.model.getList(function (list) {

        // 要到資料後清空 ul 內的東西
        self.$list.innerHTML = ''

        // 然後把資料一個一個建成 DOM 塞回 ul
        list.forEach(function (item) {
            var $li = document.createElement('li')
            $li.textContent = item.title
            self.$list.appendChild($li)

            // 完成！
        })
    })
}


// Models

Todo.Model.list = []


// 取得資料列表的 API，通常從後端要資料就是在這裡實作 Ajax 呼叫。
Todo.Model.getList = function (handler) {
    handler.call(this, this.list)
    return this.list
}

// 建立資料 API。
Todo.Model.create = function (title, handler) {
    var item = {
        title: title
    }

    // 建立好新的 item 物件儲存到 list 陣列裡，供之後其他操作取資料用。
    this.list.push(item)
    handler.call(this, item)
    return item
}



// Controllers

Todo.Controller.model = Todo.Model
Todo.Controller.view = Todo.View

// 操作邏輯寫在 Controller，這個 API 用來新增 todo 項目，
// 他要負責完成「建構 todo 的一切需要的邏輯」都寫在這裡。
Todo.Controller.addItem = function (title) {
    var self = this

    // 告訴 Model 層要建一個叫做 title 的資料
    self.model.create(title, function () {

        // 資料建立後告訴 View 要重新 render。
        self.view.render()
    })
}

// 寫在最後：這個 demo 很粗糙，只是概略展示以 Javascript 設計的 MVC 的結構，
// 方法不只一種，設計在人心！
