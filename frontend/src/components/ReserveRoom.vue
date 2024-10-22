<template>
  <div class="calendar-container">
    <Menu />
    <div class="calendar">
      <h1>Calendário</h1>
      <div class="header">
        <button @click="previousMonth">❮</button>
        <span>{{ monthName }} {{ year }}</span>
        <button @click="nextMonth">❯</button>
      </div>
      <div class="days">
        <div class="day" v-for="day in days" :key="day">{{ day }}</div>
        <div 
          class="date" 
          v-for="date in monthDates" 
          :key="date" 
          :class="{ 
            selected: isSelected(date), 
            event: isEventDay(date) 
          }"
          @click="selectDate(date)"
        >
          {{ date }}
        </div>
      </div>
    </div>
    <div v-if="selectedDate" class="event-list">
      <h2>Eventos para {{ selectedDate }}</h2>
      <ul>
        <li v-for="(event, index) in events[selectedDate]" :key="event.title" class="event-item">
          {{ event.title }} às {{ event.time }}
          <div class="event-actions">
            <button @click="editEvent(index)" class="edit-button">Editar</button>
            <button @click="deleteEvent(index)" class="delete-button">Deletar</button>
          </div>
        </li>
      </ul>
      <div class="add-event">
        <input v-model="eventTitle" placeholder="Adicionar evento" />
        <input v-model="eventTime" type="time" placeholder="Hora" />
        <button @click="addEvent">Adicionar</button>
        <button @click="exitAddEvent">Sair</button>
      </div>
      <p v-if="eventFeedback" class="event-feedback">{{ eventFeedback }}</p>
    </div>
    <div v-if="editingEvent" class="edit-event">
      <h3>Editar Evento</h3>
      <input v-model="editedEventTitle" placeholder="Título do evento" />
      <input v-model="editedEventTime" type="time" placeholder="Hora" />
      <button @click="saveEditedEvent">Salvar</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
  import Menu from './Menu.vue';    
export default {
  components: {
    Menu
      }, 
  data() {
    
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      selectedDate: null,
      eventTitle: '',
      eventTime: '',
      events: {},
      eventFeedback: '',
      editingEvent: false,
      editedEventIndex: null,
      editedEventTitle: '',
      editedEventTime: '',
    };
  },
  computed: {
    monthName() {
      return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(this.year, this.month));
    },
    days() {
      return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    },
    monthDates() {
      const dates = [];
      const firstDay = new Date(this.year, this.month, 1).getDay();
      const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        dates.push('');
      }
      for (let i = 1; i <= daysInMonth; i++) {
        dates.push(i);
      }
      return dates;
    },
  },
  methods: {
    previousMonth() {
      this.month -= 1;
      if (this.month < 0) {
        this.month = 11;
        this.year -= 1;
      }
    },
    nextMonth() {
      this.month += 1;
      if (this.month > 11) {
        this.month = 0;
        this.year += 1;
      }
    },
    selectDate(date) {
      if (date) {
        this.selectedDate = `${date}/${this.month + 1}/${this.year}`;
      }
    },
    addEvent() {
      if (!this.selectedDate || !this.eventTitle || !this.eventTime) return;
      if (!this.events[this.selectedDate]) {
        this.events[this.selectedDate] = [];
      }
      this.events[this.selectedDate].push({ title: this.eventTitle, time: this.eventTime });
      this.eventFeedback = 'Evento adicionado com sucesso!';
      this.eventTitle = '';
      this.eventTime = '';
      setTimeout(() => {
        this.eventFeedback = '';
      }, 3000);
    },
    exitAddEvent() {
      this.eventTitle = ''; 
      this.eventTime = ''; 
      this.selectedDate = null; 
    },
    editEvent(index) {
      this.editingEvent = true;
      this.editedEventIndex = index;
      this.editedEventTitle = this.events[this.selectedDate][index].title;
      this.editedEventTime = this.events[this.selectedDate][index].time;
    },
    saveEditedEvent() {
      if (this.editedEventIndex !== null) {
        this.events[this.selectedDate][this.editedEventIndex] = {
          title: this.editedEventTitle,
          time: this.editedEventTime,
        };
        this.editingEvent = false;
        this.editedEventIndex = null;
        this.editedEventTitle = '';
        this.editedEventTime = '';
        this.eventFeedback = 'Evento editado com sucesso!';
        setTimeout(() => {
          this.eventFeedback = '';
        }, 3000);
      }
    },
    cancelEdit() {
      this.editingEvent = false;
      this.editedEventIndex = null;
      this.editedEventTitle = '';
      this.editedEventTime = '';
    },
    deleteEvent(index) {
      this.events[this.selectedDate].splice(index, 1);
      if (this.events[this.selectedDate].length === 0) {
        delete this.events[this.selectedDate]; 
      }
      this.eventFeedback = 'Evento deletado com sucesso!';
      setTimeout(() => {
        this.eventFeedback = '';
      }, 3000);
    },
    isSelected(date) {
      return this.selectedDate === `${date}/${this.month + 1}/${this.year}`;
    },
    isEventDay(date) {
      return this.events[`${date}/${this.month + 1}/${this.year}`]?.length > 0;
    },
  
    },
};

</script>

<style scoped>
.calendar-container {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.calendar {
  flex: 1;
  margin-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header button {
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.header button:hover {
  background-color: #003d7a;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 10px;
}

.day, .date {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 5px;
  transition: background-color 0.2s, transform 0.2s;
}

.day {
  font-weight: bold;
  background-color: #f0f0f0;
}

.date {
  background-color: white;
}

.date:hover {
  cursor: pointer;
  background-color: #e9ecef;
  transform: scale(1.05);
}

.date.selected {
  background-color: #007bff;
  color: white;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}

.date.event {
  text-decoration: underline;
  color: #ff5722; 
}

.event-list {
  flex: 1;
  margin-left: 20px;
}

.event-item {
  background-color: #d1e7dd;
  border: 1px solid #0f5132;
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-actions {
  display: flex;
}

.edit-button, .delete-button {
  margin-left: 10px;
  background-color: #ffc107;
  border: none;
  border-radius: 5px;
  padding: 3px 6px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}

.event-feedback {
  color: green;
  font-weight: bold;
}

.add-event {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.add-event input {
  margin-right: 10px;
}

.edit-event {
  margin-top: 20px;
}
</style>
