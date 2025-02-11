<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import NavBar from './NavBar.vue';
import axios from 'axios';
import ptBrLocale from '@fullcalendar/core/locales/pt-br' // Importa o idioma pt-br

export default defineComponent({
  components: {
    FullCalendar, NavBar,
  },

  data() {
  
    return {
      categories: [
        { name: 'Esporte', color: '#4CAF50' },
        { name: 'Tecnologia', color: '#FF5722'},
        { name: 'Cultura', color: '#2196F3' },
        { name: 'Gerência', color: '#9C27B0' },
        { name: 'RH', color: '#FFC107' }
      ],
      rooms: [
      ],
      calendarOptions: {
        
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: ptBrLocale, // Define explicitamente o idioma pt-br
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
      },
      currentEvents: [],
      newEvent: {
        title: '',
        category: '',
        date: '',
        time: '',
        endDate: '',
        endTime: '',
        room: ''
      },
      isModalOpen: false,
      isEditMode: false, // Controla se estamos em modo de edição ou criação
      selectedEvent: null, // Guarda o evento selecionado para edição
    }
  },
  mounted() {
    this.fetchRooms();
  }, 
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends
    },

    fetchRooms(){
      const userData = JSON.parse(localStorage.getItem('userData')); 
      const token = userData ? userData.token : null;

      axios.get('http://localhost:3000/api/rooms/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        this.rooms = res.data;
      })
      .catch(err => {
        console.error('Erro ao buscar salas: \n', err);
      });
    },
    handleDateSelect(selectInfo) {
      this.newEvent.date = selectInfo.startStr.split('T')[0];
      this.newEvent.endDate = selectInfo.startStr.split('T')[0];
      this.isModalOpen = true;
      this.isEditMode = false; // Criando um novo evento
    },

    chooseCategory() {
      return this.categories.find(cat => cat.name === this.newEvent.category) || { name: 'Sem categoria', color: '#808080' };
    },

    chooseRoom() {
      return this.rooms.find(room => room.name === this.newEvent.room) || { name: 'Sem sala', id: 'sem_sala' };
    },

    handleEventClick(clickInfo) {
      this.selectedEvent = clickInfo.event;
      this.newEvent.title = clickInfo.event.title;
      this.newEvent.category = clickInfo.event.extendedProps.category.name;
      this.newEvent.date = clickInfo.event.startStr.split('T')[0];
      this.newEvent.time = clickInfo.event.startStr.split('T')[1].substring(0, 5);
      this.newEvent.endDate = clickInfo.event.endStr.split('T')[0];
      this.newEvent.endTime = clickInfo.event.endStr.split('T')[1].substring(0, 5);
      this.newEvent.room = clickInfo.event.extendedProps.room.name;

      this.isModalOpen = true;
      this.isEditMode = true; // Estamos no modo de edição
    },

    handleEvents(events) {
      this.currentEvents = events
    },

    addEvent() {
      if (this.newEvent.title && this.newEvent.category && this.newEvent.date && this.newEvent.time && this.newEvent.endDate && this.newEvent.endTime && this.newEvent.room) {
        const calendarApi = this.$refs.calendar.getApi();
        calendarApi.unselect();

        if (this.isEditMode && this.selectedEvent) {
          // Atualizar evento existente
          this.selectedEvent.setProp('title', this.newEvent.title);
          this.selectedEvent.setExtendedProp('category', this.chooseCategory());
          this.selectedEvent.setExtendedProp('room', this.chooseRoom());
          this.selectedEvent.setStart(this.newEvent.date + "T" + this.newEvent.time);
          this.selectedEvent.setEnd(this.newEvent.endDate + "T" + this.newEvent.endTime);
          this.selectedEvent.setProp('backgroundColor', this.chooseCategory().color);
          this.selectedEvent.setProp('borderColor', this.chooseCategory().color);

        } else {
          // Criar um novo evento
          calendarApi.addEvent({
            id: createEventId(),
            title: this.newEvent.title,
            start: this.newEvent.date + "T" + this.newEvent.time,
            end: this.newEvent.endDate + "T" + this.newEvent.endTime,
            allDay: false,
            extendedProps: {
              category: this.chooseCategory(),
              room: this.chooseRoom(),
            },
            backgroundColor: this.chooseCategory().color,
            borderColor: this.chooseCategory().color,
          });
        }

        this.isModalOpen = false;
        this.newEvent = { title: '', category: '', date: '', time: '', endDate: '', endTime: '', room: '' }; // Limpa o formulário
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    },

    deleteEvent() {
      if (this.selectedEvent) {
        if (confirm(`Tem certeza de que quer deletar o evento '${this.selectedEvent.title}'?`)) {
          this.selectedEvent.remove();
          this.isModalOpen = false;
          this.newEvent = { title: '', category: '', date: '', time: '', endDate: '', endTime: '', room: '' }; // Limpa os campos após remoção
        }
      }
    },

    closeModal() {
      this.isModalOpen = false;
      this.newEvent = { title: '', category: '', date: '', time: '', endDate: '', endTime: '', room: '' }; // Limpa o formulário
    }
  }
})
</script>
<template>
  <NavBar />

  <div class="demo-app">
    <!-- Barra lateral à esquerda com as instruções -->
    <div class="demo-app-sidebar">

      <div class="demo-app-sidebar-section">
        <label style="font-size:20px;">
          Ativar/desativar fins de semana
          <input style="width:15px ;height: 15px;"
            type="checkbox"
            :checked="calendarOptions.weekends"
            @change="handleWeekendsToggle"/>
          
        </label>
      </div>

      <div class="demo-app-sidebar-section">
        <strong style="font-size:20px;">Setor Responsável</strong>
        <ul>
          <li v-for="category in categories" :key="category.name" class="category-item">
            <span :style="{ backgroundColor: category.color }" class="category-color"></span>
            <span style="font-size:20px;">{{ category.name }}</span>
          </li>
        </ul>
      </div>

      <div class="demo-app-sidebar-section">
        <h1 style="font-size:20px;">Todos os Eventos ({{ currentEvents.length }})</h1>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b style="font-size:18px;" >{{ event.startStr }}</b>
           <strong style="font-size:18px;">
              {{ event.title }} - 
              <span v-if="event.extendedProps.category" >
                <span :style="{ color: event.extendedProps.category.color }" >{{ event.extendedProps.category.name }}</span>
              </span>
              <span v-else >
                Sem categoria
              </span>
              <br />
              <span v-if="event.extendedProps.room">
                <strong>Sala:</strong> {{ event.extendedProps.room.name }}
              </span>
              <br />
              <span v-if="event.extendedProps.startTime && event.extendedProps.endTime">
                <strong>Início:</strong> {{ event.extendedProps.startTime }} - 
                <strong>Fim:</strong> {{ event.extendedProps.endTime }}
              </span>
              
            </strong>
          </li>
        </ul>
      </div>
    </div>

    <!-- Área principal com o calendário -->
    <div class="demo-app-main">
      <FullCalendar
        ref="calendar"
        class="demo-app-calendar"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i><br/>
          <span v-if="arg.event.extendedProps.room">
            <strong>Sala:</strong> {{ arg.event.extendedProps.room.name }}
          </span>
          <span v-if="arg.event.extendedProps.startTime && arg.event.extendedProps.endTime">
            <strong>Início:</strong> {{ arg.event.extendedProps.startTime }} - 
            <strong>Fim:</strong> {{ arg.event.extendedProps.endTime }}
          </span>
        </template>
      </FullCalendar>
    </div>
  </div>

  <!-- Modal de Cadastro de Evento -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal">
      <h2>{{ isEditMode ? 'Editar Evento' : 'Cadastrar Evento' }}</h2>
      <div class="todo-input">
        <span>Nome do Evento: </span>
        <input v-model="newEvent.title" type="text" placeholder="Evento">

        <span>Área: </span>
        <input v-model="newEvent.category" type="text" placeholder="Área" list="categoryList">
        <datalist id="categoryList">
          <option value="Esporte"></option>
          <option value="Tecnologia"></option>
          <option value="Cultura"></option>
          <option value="Gerência"></option>
          <option value="RH"></option>
        </datalist>

        <span>Data Início:</span>
        <input v-model="newEvent.date" type="date">

        <span>Horário Início:</span>
        <input v-model="newEvent.time" type="time">

        <span>Data Fim:</span>
        <input v-model="newEvent.endDate" type="date">

        <span>Horário Fim:</span>
        <input v-model="newEvent.endTime" type="time">

        <span>Sala:</span>
        <input v-model="newEvent.room" type="text" placeholder="Sala" list="roomList">
        <datalist id="roomList">
          <option v-for="room in rooms" :key="room.id" :value="'['+room.cucaName+'] ' + room.name"></option>
        </datalist>

        <div class="modal-actions">
          <button @click="addEvent">{{ isEditMode ? 'Salvar Alterações' : 'Salvar' }}</button>
          <button @click="closeModal">Cancelar</button>
          <button v-if="isEditMode" @click="deleteEvent">Deletar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para o Modal */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 00px; /* Ajusta a largura para deixar a barra lateral visível */
  width: calc(120% - 300px);
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.modal h2 {
  margin-bottom: 10px;
}

.modal .todo-input {
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  background: #4CAF50;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  border-radius: 15px;

}

button:hover {
  background: #45a049;
}

button:focus {
  outline: none;
}

button:last-child {
  background: #f44336;
}

button:last-child:hover {
  background: #e53935;
}

/* Estilos globais */
h2 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
  list-style-type: none;
}

li {
  margin: 1em 0;
  padding: 0;
  font-size: 14px;
}

b {
  margin-right: 5px;
  color: #3c3c3c;
  text-transform: uppercase;  /* Deixa os itens de lista em maiúsculas */

}

i {
  color: #555;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: 'Roboto', Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  text-transform: capitalize;

}

.demo-app-sidebar {
  width: 300px;
  background: #ffffff83;
  border-right: 1px solid #e0e0e0;
  padding: 2em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

}

.demo-app-sidebar-section {
  margin-bottom: 2em;

}

.demo-app-sidebar-section h2 {
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 0.5em;
}

.demo-app-main {
  flex-grow: 1;

}

.category-item {
  display: flex;
  align-items: center;
}

.category-color {

  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.category-item span {
  font-size: 14px;
  color: #000000;

}

.demo-app-calendar {
  max-width: 100%;
  
}
input{ background-color: #fff;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(100% - 30px);
  border-radius: 15px;
  border-bottom: 1px solid gray;
  box-shadow: inset 0 1px 2px black, 0 -1px 1px #fff, 0 1px 0 #fff;}
</style>
