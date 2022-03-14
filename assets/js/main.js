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
                  <div :style="{color: item.color}" class="pb-3 mb-0 lh-sm border-bottom d-flex justify-content-between align-items-center">
                  <div class="d-flex flex-row">
                    <img @click="setPriority" class="star pointer me-3" src="assets/img/star.png" alt="star">
                    <p @click='crossItem' :class="{ line_through: item.isCrossed, pointer: true, priority: item.priority}">{{item.title}}</p>   
                    </div>
                    <div class="d-flex flex-row">
                      <img @click="editItem" class="pencil pointer me-3" src="assets/img/pencil.png" alt="pencil">
                      <img @click="deleteItem" class="garbage pointer" src="assets/img/garbage.png" alt="garbage">
                    </div>
                   
                  </div>
                </div>

                <div v-else class="pt-3">
                  <div class="pb-3 mb-0  lh-sm border-bottom d-flex justify-content-between align-items-center">
                  <form class="w-100 me-3 col-xs-2">
                    <input type="search" class="form-control" v-model="changeName" placeholder="Новое название">
                  </form>
                    <div class="d-flex flex-row">
                      <button class="btn btn-outline-success me-3" @click='setNewtitle'>Сохранить</button>
                      <img @click="deleteItem" class="garbage pointer" src="assets/img/garbage.png" alt="garbage">
                    </div>
                  </div>
                </div>
              </div>`,

  methods: {
    deleteItem() {
      if (app.status == 'default') {
        app.notes[this.index_list].items.splice(this.index_item, 1)
      }
      else if (app.status == 'filtered') {
        let note = app.filterNotes[this.index_list]
        app.notes[note.i].items.splice(this.index_item, 1)
        app.filterNotes[this.index_list].items.splice(this.index_item, 1)
      }
      app.saveItems()
    },
    editItem() {
      this.item.showTitle = false
    },
    setNewtitle() {
      this.item.showTitle = true
      if (this.changeName.trim() == '') { return false }
      if (app.status == 'default') {
        app.notes[this.index_list].items[this.index_item].title = this.changeName
      }
      else if (app.status == 'filtered') {
        let note = app.filterNotes[this.index_list]
        app.notes[note.i].items[this.index_item].title = this.changeName
      }

      app.saveItems()
      this.changeName = ''
    },
    crossItem() {
      if (app.status == 'default') {
        app.notes[this.index_list].items[this.index_item].isCrossed = !app.notes[this.index_list].items[this.index_item].isCrossed
      }
      else if (app.status == 'filtered') {
        let note = app.filterNotes[this.index_list]
        app.notes[note.i].items[this.index_item].isCrossed = !app.notes[note.i].items[this.index_item].isCrossed
      }

      app.saveItems()
    },
    setPriority() {
      if (app.status == 'default') {
        app.notes[this.index_list].items[this.index_item].priority = !app.notes[this.index_list].items[this.index_item].priority
      }
      else if (app.status == 'filtered') {
        let note = app.filterNotes[this.index_list]
        app.notes[note.i].items[this.index_item].priority = !app.notes[note.i].items[this.index_item].priority
      }

      app.saveItems()
    },
  },
});


Vue.component('todo-list', {
  props: ['list', 'index_list'],
  data: function () {
    return {
      title: '',
      changeName: '',
      color: '',
    }
  },
  template: `<div :style="{borderTop: list.border}" class="mt-xl-5">
  <div class="my-3 p-3 bg-body rounded shadow-sm">

      <div v-if=list.showTitle class="border-bottom pb-2 mb-0 d-flex justify-content-between">
          <h4>{{list.title}}</h4>
          <div class="d-flex flex-row">
            <div class="me-3">
                <img @click="editList" class="pencil pointer me-3" src="assets/img/pencil.png" alt="pencil">
                <img  @click="deleteList" class="garbage pointer" src="assets/img/garbage.png" alt="garbage">
            </div>
            <div class="d-flex flex-row align-items-center color">
              <form class="w-100 me-3 ">
                <input type="color" class=" btn-light form-control-color" v-model="color">
              </form>
              <img @click="setColor" class="garbage pointer" src="assets/img/palette.png" alt="palette">
            </div>

          </div>
      </div>

      <div v-else class="border-bottom pb-2 mb-0 d-flex justify-content-between">
          <form class="w-100 me-3 col-xs-2">
              <input type="search" class="form-control" v-model="changeName" placeholder="Новое название">
          </form>
          <div class="d-flex flex-row ">
              <button class="btn btn-outline-danger me-3" @click='setNewtitle'>Сохранить</button>
              <img  @click="deleteList" class="garbage pointer" src="assets/img/garbage.png" alt="garbage">
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
              {{list.date}}
          </small>
      </div>

  </div>
</div>
</div>`,

  methods: {
    addItem() {
      if (this.title.trim() == '') { return false }
      if (app.status == 'default') {
        app.notes[this.index_list].items.push({ title: this.title, showTitle: true, isCrossed: false, priority: false, color: 'black' })
      }
      else if (app.status == 'filtered') {
        let note = app.filterNotes[this.index_list]
        app.notes[note.i].items.push({ title: this.title, showTitle: true, isCrossed: false, priority: false, color: 'black' })
      }
      app.saveItems()
      this.title = ''

    },
    deleteList() {
      if (app.status == 'default') {
        app.notes.splice(this.index_list, 1)
      }
      else if (app.status == 'filtered') {
        let note = app.filterNotes[this.index_list]
        app.notes.splice(note.i, 1)
        app.filterNotes.splice(this.index_list, 1)
      }
      app.saveItems()
    },
    editList() {
      this.list.showTitle = false
    },
    setNewtitle() {
      this.list.showTitle = true
      if (this.changeName.trim() == '') { return false }
      if (app.status == 'default') {
        app.notes[this.index_list].title = this.changeName
      }
      else if (app.status == 'filtered') {
        let note = app.filterNotes[this.index_list]
        app.notes[note.i].title = this.changeName
      }

      app.saveItems()
      this.changeName = ''
    },
    setColor() {
      app.notes[this.index_list].border = this.color + ' 5px solid'
      app.saveItems()
      this.color = ''
    },
  },
});



const app = new Vue({
  el: '#app',
  data: {
    showInputAddNote: false,
    showNotes: true,
    showFilter: false,
    showSortNotesTitle: false,
    notes: [],
    title: '',
    currentEditList: '',
    filterNotes: [],
    search: '',
    status: 'default'
  },
  created() {
    this.notes = JSON.parse(localStorage.getItem("notes") || '[]')
  },

  computed: {
    currentDate() {
      let currentDate = new Date();
      return datetime = currentDate.getHours() + ":" + currentDate.getMinutes()
    },
    sortNotesTitle() {
      return this.notes.sort((prev, next) => {
        if (prev.title < next.title) return -1;
        if (prev.title < next.title) return 1;
      });

    }
  },
  methods: {
    addNote() {
      if (this.title.trim() == '') { return false }
      this.notes.push({ title: this.title, showTitle: true, items: [], date: this.currentDate, border: 'black 5px solid' })
      this.saveItems()
      this.title = ''
      this.showInputAddNote = false
      this.showNotes = true
    },
    setNoteTitle() {
      this.showNotes = false
      this.showFilter = false
      this.showInputAddNote = true
    },
    saveItems() {
      const parsed = JSON.stringify(this.notes);
      localStorage.setItem('notes', parsed);
    },
    fillFilterNotes() {
      if (this.search.trim() == '') {
        this.status = 'default'
        this.filterNotes = []
        this.showSortNotesTitle= false
        this.showNotes = true
        this.showFilter = false
        return false
      }

      this.showSortNotesTitle= false,
      this.showInputAddNote = false
      this.status = 'filtered'
      this.filterNotes = []
      this.showNotes = false
      this.showFilter = true

      let bool = false
      for (let i = 0; i < this.notes.length; i++) {
        bool = false
        for (let j = 0; j < this.notes[i].items.length; j++) {
          if (this.notes[i].items[j].title.indexOf(this.search) != -1) {
            this.filterNotes.push(this.notes[i])
            this.filterNotes[this.filterNotes.length - 1].i = i
            bool = true
          }
          if (bool) { break }
        }
      }
      this.search = ''
    },
    sortTitle() {
      this.showNotes = false
      this.showSortNotesTitle = true
    }
  },
});
