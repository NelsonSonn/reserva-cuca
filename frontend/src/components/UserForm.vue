<template>
  <div>
    <h3>Gordon's To-do List</h3>
    <div class="todo-grid-parent">
      <!-- To-Do Input Section -->
      <div>
        <div class="todo-input todo-block">
          <span>Nome do Evento: </span>
          <input v-model="newTodo.text" type="text" placeholder="Evento">

          <span>Areas: </span>
          <input v-model="newTodo.category" type="text" placeholder="Area" list="categoryList">
          <datalist id="categoryList">
            <option value="Tecnologia"></option>
            <option value="Artes"></option>
            <option value="Cultura"></option>
            <option value="Direito"></option>
            <option value="Esportes"></option>
          </datalist>

          <span>Data:</span>
          <input v-model="newTodo.date" type="date">

          <span>Horario:</span>
          <input v-model="newTodo.time" type="time">

          <button @click="addTodo">Adicionar</button>

          <button @click="sortTodos">Ordenar Datas</button>

          <label><input type="checkbox" v-model="incompleteFirst"> Incomplete First </label>
        </div>

        <!-- To-Do List Table -->
        <div class="todo-block todoTable-block">
          <div class="itemsPerPage">
            <span>Items per page</span>
            <select v-model="itemsPerPage">
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>

          <table>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>To-do</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
            <tr v-for="(todo, index) in paginatedTodos" :key="index">
              <td>{{ todo.date }}</td>
              <td>{{ todo.time }}</td>
              <td>{{ todo.text }}</td>
              <td>{{ todo.category }}</td>
              <td>
                <button @click="editTodo(index)">Edit</button>
                <button @click="deleteTodo(index)">Delete</button>
              </td>
            </tr>
          </table>

          <div class="pagination-pages">
            <!-- Pagination controls here -->
          </div>
        </div>
      </div>

      <!-- Calendar Section -->
      <div class="todo-calendar todo-block">
        <div id="calendar"></div>
      </div>
    </div>

    <!-- Edit Todo Modal -->
    <div v-if="isModalOpen" class="todo-overlay" id="todo-overlay">
      <div class="todo-modal" id="todo-modal">
        <div class="todo-input todo-block">
          <span>To-do: </span>
          <input v-model="editingTodo.text" type="text" placeholder="Enter new to-do">
          
          <span>Category: </span>
          <input v-model="editingTodo.category" type="text" list="categoryList" placeholder="Enter category">
          
          <span>Date:</span>
          <input v-model="editingTodo.date" type="date">
          
          <span>Time:</span>
          <input v-model="editingTodo.time" type="time">

          <button @click="saveTodo">Save Change</button>
        </div>
      </div>
      <div class="todo-modal-close-btn" @click="closeModal">X</div>
    </div>
  </div>
</template>
<script>
import { Calendar } from '@fullcalendar/core'; // Importa o FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Importa o plugin para visualização mensal

export default {
  data() {
    return {
      newTodo: {
        text: '',
        category: '',
        date: '',
        time: ''
      },
      todos: [],
      isModalOpen: false,
      editingTodo: {},
      itemsPerPage: 5,
      incompleteFirst: false
    };
  },
  computed: {
    paginatedTodos() {
      let todos = [...this.todos];
      if (this.incompleteFirst) {
        todos = todos.filter(todo => !todo.completed).concat(todos.filter(todo => todo.completed));
      }
      return todos.slice(0, this.itemsPerPage);
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.text && this.newTodo.date && this.newTodo.time) {
        this.todos.push({ ...this.newTodo, completed: false });
        this.newTodo.text = '';
        this.newTodo.category = '';
        this.newTodo.date = '';
        this.newTodo.time = '';
      }
    },
    sortTodos() {
      this.todos.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    editTodo(index) {
      this.editingTodo = { ...this.todos[index], index };
      this.isModalOpen = true;
    },
    saveTodo() {
      const index = this.editingTodo.index;
      this.todos[index] = { ...this.editingTodo };
      this.isModalOpen = false;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }
  },
  mounted() {
    // Inicializa o calendário FullCalendar
    const calendarEl = document.getElementById('calendar');
    new Calendar(calendarEl, {
      plugins: [dayGridPlugin],  // Adiciona o plugin dayGrid
      initialView: 'dayGridMonth' // Configura a visualização inicial
    }).render();
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rowdies&family=Titillium+Web&display=swap');

.strike {
  text-decoration: line-through;
}

td{
  border: 1px solid black;
  padding: 5px;
}

.todo-input{
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
}

.todoTable-block{
  margin-top: 1rem;
}

.pagination-pages{
  text-align: right;
}

.pagination-pages > * {
  margin-right: 0.5rem;
  cursor: pointer;
}

.material-icons{
  cursor: pointer;
}

::-ms-input-placeholder{
  color: #5a5a5a;
}

::-webkit-input-placeholder{
  color: #5a5a5a;
}

::placeholder{
  color: #5a5a5a;
}

input {
  color:#292727;
}

h3 {
  color:#313131;
  font-family: 'Rowdies', cursive;
}


body{
  font-family: 'Titillium Web', sans-serif;
}

.todo-block{
  border: 1px solid #070707;
  padding: 1rem;
  border-radius: 20px;
  color: #4d4c4c;
}

@media screen and (max-width: 767px) {
  /* for mobile or small screen device */
  #todoTable, .todo-calendar{
    margin-top: 1rem;
  }
}

@media screen and (min-width: 768px) {
  /* for tablets or laptops or desktops */
  .todo-grid-parent{
    display: grid;
    grid-template-columns: 2fr 3fr;
    column-gap: 1rem;
  }

  #calendar{
    position: sticky;
    top: 0;
  }
}

.todo-overlay{
  width: 100vw;
  height: 100vh;
  background-color: #ddd;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-100vw);
  transition: transform 250ms;
  z-index: 2;
}

.todo-modal{
  min-width: 50vw;
  height: 50vh;
  /*border: 1px solid green;*/
  background-color: #ffd6cc;
}

.todo-modal-close-btn{
  background-color: rgb(56, 55, 55);
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  font-weight: bold;
}

.slidedIntoView {
  transform: translateX(0);
  transition: transform 650ms;
}

#todoTable tr:nth-child(even) {
  background-color: #fc3200;
}

button{
  background-color: #ffffff;
  color: #353434;
  border: 1px outset #474747;
}

button:active{
  border: 1px inset #7e7e7e;
}

button:hover{
  background-color: #868686;
}

.chevron{
  transform: translateY(0.4rem);
}

.itemsPerPage{
  text-align: right;
  margin-bottom: 0.5rem;
}</style>
