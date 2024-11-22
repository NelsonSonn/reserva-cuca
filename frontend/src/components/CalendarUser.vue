<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import NavBar from './NavBar.vue';

export default defineComponent({
  
  components: {
    FullCalendar,NavBar
  },
  
  data() {
    return {
      categories: [
        { name: 'Tecnologia', color: '#4CAF50' },
        { name: 'Arte', color: '#FF5722' },
        { name: 'Cultura', color: '#2196F3' },
        { name: 'Direito', color: '#9C27B0' },
        { name: 'Esportes', color: '#FFC107' }
      ],
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // necessário para dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale:'pt-br',
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
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends
    },
    handleDateSelect(selectInfo) {
      let title = prompt('Digite o título do seu evento')
      let category = this.chooseCategory()

      if (title && category) {
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // limpa a seleção de data

        // Adicionando a categoria e cor ao evento
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          extendedProps: {
            category: category,
            color: category.color
          },
          backgroundColor: category.color, // A cor de fundo do evento
          borderColor: category.color // A cor da borda do evento
        })
      }
    },
    chooseCategory() {
      let categories = this.categories.map((category, index) => `${index + 1}. ${category.name}`).join('\n')
      let choice = prompt(`Escolha uma categoria para o evento:\n${categories}`)
      let categoryIndex = parseInt(choice) - 1

      if (categoryIndex >= 0 && categoryIndex < this.categories.length) {
        return this.categories[categoryIndex]
      }
      // Caso escolha inválida ou não escolha nada, retornamos uma categoria padrão
      return { name: 'Sem categoria', color: '#808080' }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Tem certeza de que deseja deletar o evento '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      this.currentEvents = events
    },
  }
})
</script>

<template>
    <NavBar />

  <div class="demo-app">
    <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>Instruções</h2>
        <ul>
          <li>Selecione as datas para criar um novo evento</li>
          <li>Arraste, solte e redimensione eventos</li>
          <li>Clique em um evento para deletá-lo</li>
        </ul>
      </div>

      <div class="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            :checked="calendarOptions.weekends"
            @change="handleWeekendsToggle"
          />
          Ativar/desativar fins de semana
        </label>
      </div>

      <div class="demo-app-sidebar-section">
        <h2>Áreas</h2>
        <ul>
          <li v-for="category in categories" :key="category.name" class="category-item">
            <span :style="{ backgroundColor: category.color }" class="category-color"></span>
            <span>{{ category.name }}</span>
          </li>
        </ul>
      </div>

      <div class="demo-app-sidebar-section">
        <h2>Todos os Eventos ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.startStr }}</b>
            <i>
              {{ event.title }} - 
              <span v-if="event.extendedProps.category">
                <span :style="{ color: event.extendedProps.category.color }">{{ event.extendedProps.category.name }}</span>
              </span>
              <span v-else>
                Sem categoria
              </span>
            </i>
          </li>
        </ul>
      </div>
    </div>

    <div class="demo-app-main">
      <FullCalendar
        class="demo-app-calendar"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang="css">
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
}

i {
  color: #555;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: 'Roboto', Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  background: #f7f7f7;
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
  color: #3c3c3c;
  margin-bottom: 0.5em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
  background: #fff;
}

.fc {
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.fc-header-toolbar {
  background-color: #0000006e;
  color: #fff;
  padding: 10px 0;
  border-radius: 6px;
}

.fc-header-toolbar .fc-button {
  background-color: #004d40;
  color: #fff;
  font-weight: 500;
  border-radius: 4px;
  padding: 8px 12px;
}

.fc-dayGridMonth-view, .fc-timeGridWeek-view, .fc-timeGridDay-view {
  background-color: #fafafa;
}

.fc-day, .fc-week, .fc-day-header {
  border: 1px solid #f0f0f0;
}

.fc-day-grid-event {
  border-radius: 6px;
  background-color: #00897b;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
}

.fc-dayGridMonth-view .fc-day-number {
  font-weight: 500;
  color: #3c3c3c;
}

.fc-dayGridMonth-view .fc-day {
  transition: background-color 0.2s ease;
}

.fc-dayGridMonth-view .fc-day:hover {
  background-color: #e0f2f1;
}

.fc-dayGridMonth-view .fc-day-today {
  background-color: #b2dfdb;
}

.fc-event-title {
  font-size: 12px;
  color: white;
}

.fc-timeGridWeek-view .fc-time-grid-event {
  font-size: 12px;
  background-color: #00796b;
}

.fc .fc-toolbar-title {
  font-size: 18px;
  font-weight: 700;
}

.fc-dayGridMonth-view .fc-day-header {
  font-size: 14px;
  font-weight: 500;
  color: #3c3c3c;
}

.fc-button.fc-prev-button, .fc-button.fc-next-button {
  background-color: transparent;
  color: white;
  border: none;
  font-size: 16px;
}

.fc-button.fc-prev-button:hover, .fc-button.fc-next-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.fc-header-toolbar .fc-button-group {
  margin: 0 10px;
}

/* Estilo das categorias */
.category-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.category-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
}
</style>
