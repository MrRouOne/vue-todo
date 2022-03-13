Vue.component('list-item', {
  props: ['item'],
  data: function () {
    return {
    }
  },
  template: `<div>
  <div class="pt-3">
      <p class="pb-3 mb-0  lh-sm border-bottom d-flex justify-content-between">
         {{item}}   
         <button class="btn btn-primary" @click="deleteItem">Удалить</button>
      </p>
  </div></div>`,

  methods: {
    
  },
});

Vue.component('todo-list', {
  props: ['list', 'index'],
  data: function () {
    return {
      title: '',
      date: app.currentDate,
    }
  },
  template: `<div class="mt-xl-5">  
  <div class="my-3 p-3 bg-body rounded shadow-sm">
  <h4 class="border-bottom pb-2 mb-0">{{list.title}}</h4>
  <list-item v-for="(item,index) in list.items" :item="item"> </list-item>        
  
  
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
</div>`,

  methods: {
    addItem() {
      if (this.title.trim() == '') { return false }
      app.notes[this.index].items.push(this.title)
      this.title = ''
    }
  },
});



const app = new Vue({
  el: '#app',
  data: {
    showInputAddNote: false,
    showNotes: true,
    notes: [],
    title: '',
  },
  computed: {
    currentDate() {
      let currentDate = new Date();
      return datetime = currentDate.getHours() + ":"+ currentDate.getMinutes()
    },
  },
methods: {
  addNote() {
    if (this.title.trim() == '') { return false }
    this.notes.push({ title: this.title, items: [] })
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
