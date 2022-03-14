Vue.component('list-item', {
  props: ['item', 'index_item', 'index_list'],
  data: function () {
    return {
      showTitle: true,
      changeName: '',
    }
  },
  template: `<div>
                <div v-if=item.showTitle class="pt-3">
                  <div class="pb-3 mb-0 lh-sm border-bottom d-flex justify-content-between align-items-center">
                    <p>{{item.title}}</p>   
                    <div class="d-flex flex-row">
                      <button class="btn btn-outline-danger me-3" @click='editItem'>Редактировать</button>
                      <button class="btn btn-danger" @click='deleteItem'>Удалить</button>
                    </div>
                   
                  </div>
                </div>

                <div v-else class="pt-3">
                  <div class="pb-3 mb-0  lh-sm border-bottom d-flex justify-content-between align-items-center">
                  <form class="w-100 me-3 col-xs-2">
                    <input type="search" class="form-control" v-model="changeName" placeholder="Новое название">
                  </form>
                    <div class="d-flex flex-row">
                      <button class="btn btn-outline-danger me-3" @click='setNewtitle'>Отправить</button>
                      <button class="btn btn-danger" @click='deleteItem'>Удалить</button>
                    </div>
                  </div>
                </div>
              </div>`,

  methods: {
    deleteItem() {
      app.notes[this.index_list].items.splice(this.index_item, 1)
    },
    editItem() {
      this.item.showTitle = false
    },
    setNewtitle() {
      this.item.showTitle = true
      if (this.changeName.trim() != '') {
        app.notes[this.index_list].items[this.index_item].title = this.changeName
      }
      this.changeName = ''
    },
  },
});

Vue.component('todo-list', {
  props: ['list', 'index_list'],
  data: function () {
    return {
      title: '',
      date: app.currentDate,
      changeName: '',
    }
  },
  template: `<div class="mt-xl-5">
  <div class="my-3 p-3 bg-body rounded shadow-sm">

      <div v-if=list.showTitle class="border-bottom pb-2 mb-0 d-flex justify-content-between">
          <h4>{{list.title}}</h4>
          <div class="d-flex flex-row">
              <button class="btn btn-outline-danger me-3" @click='editList'>Редактировать</button>
              <button class="btn btn-danger" @click='deleteList'>Удалить</button>
          </div>
      </div>

      <div v-else class="border-bottom pb-2 mb-0 d-flex justify-content-between">
          <form class="w-100 me-3 col-xs-2">
              <input type="search" class="form-control" v-model="changeName" placeholder="Новое название">
          </form>
          <div class="d-flex flex-row ">
              <button class="btn btn-outline-danger me-3" @click='setNewtitle'>Отправить</button>
              <button class="btn btn-danger" @click='deleteList'>Удалить</button>
          </div>
      </div>

      <list-item v-for="(item,index) in list.items" :item="item" :index_item="index" :index_list="index_list"></list-item>

      <div class="pt-3">
          <div class="d-flex align-items-center">
              <form class="w-100 me-3">
                  <input type="search" class="form-control" v-model="title" placeholder="Новая запись">
              </form>
              <button class="btn btn-primary" @click="addItem">Добавить</button>
          </div>
          <small class="d-block text-start mt-3">
              {{date}}
          </small>
      </div>

  </div>
</div>
</div>`,

  methods: {
    addItem() {
      console.log(this.index_list)
      if (this.title.trim() == '') { return false }
      app.notes[this.index_list].items.push({title:this.title,showTitle:true})
      this.title = ''
    },
    deleteList() {
      app.notes.splice(this.index_list, 1)
    },
    editList() {
      this.list.showTitle = false
    },
    setNewtitle() {
      this.list.showTitle = true
      if (this.changeName.trim() != '') {
        app.notes[this.index_list].title = this.changeName
      }
      this.changeName = ''
    },
  },
});



const app = new Vue({
  el: '#app',
  data: {
    showInputAddNote: false,
    showNotes: true,
    notes: [],
    title: '',
    currentEditList: '',
  },
  computed: {
    currentDate() {
      let currentDate = new Date();
      return datetime = currentDate.getHours() + ":" + currentDate.getMinutes()
    },
  },
  methods: {
    addNote() {
      if (this.title.trim() == '') { return false }
      this.notes.push({ title: this.title, showTitle: true, items: [] })
      this.title = ''
      this.showInputAddNote = false
      this.showNotes = true
    },
    setNoteTitle() {
      this.showNotes = false
      this.showInputAddNote = true
    },
  },
});
