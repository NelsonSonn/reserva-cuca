<template>
  <div>
    <h1>Simple Scheduler</h1>
    <div class="calendar">
      <div class="header">
        <button @click="prevMonth">Previous</button>
        <h2>{{ monthYear }}</h2>
        <button @click="nextMonth">Next</button>
      </div>
      <div class="days">
        <div class="day" v-for="day in days" :key="day">{{ day }}</div>
        <div
          class="date"
          v-for="date in monthDates"
          :key="date.date"
          @click="selectDate(date.date)"
          :class="{ selected: selectedDate === date.date }"
        >
          {{ date.date }}
          <div v-if="date.events.length">
            <ul>
              <li v-for="(event, index) in date.events" :key="event">
                {{ event }}
                <button @click.stop="editEvent(date.date, index)">Edit</button>
                <button @click.stop="deleteEvent(date.date, index)">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showEventForm">
      <input v-model="newEventTitle" placeholder="Event Title" />
      <button @click="saveEvent">Save Event</button>
      <button @click="showEventForm = false">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      monthDates: [],
      selectedDate: null,
      newEventTitle: '',
      showEventForm: false,
      currentMonth: new Date(),
      editingEventIndex: null,
    };
  },
  computed: {
    monthYear() {
      return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    },
    days() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    },
  },
  methods: {
    generateMonthDates() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      this.monthDates = Array.from({ length: firstDay }).map(() => ({ date: '', events: [] }));

      for (let date = 1; date <= lastDate; date++) {
        this.monthDates.push({ date, events: [] });
      }
    },
    prevMonth() {
      this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
      this.generateMonthDates();
    },
    nextMonth() {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
      this.generateMonthDates();
    },
    selectDate(date) {
      this.selectedDate = date;
      this.editingEventIndex = null; // Reset index when selecting a date
      this.showEventForm = true;
    },
    saveEvent() {
      if (this.newEventTitle && this.selectedDate) {
        const dateObj = this.monthDates.find(d => d.date === this.selectedDate);
        if (dateObj) {
          if (this.editingEventIndex !== null) {
            dateObj.events[this.editingEventIndex] = this.newEventTitle; // Update existing event
          } else {
            dateObj.events.push(this.newEventTitle); // Add new event
          }
        }
        this.resetForm();
      }
    },
    editEvent(date, index) {
      this.selectedDate = date;
      this.newEventTitle = this.monthDates.find(d => d.date === date).events[index]; // Load event title
      this.editingEventIndex = index; // Set index to edit
      this.showEventForm = true;
    },
    deleteEvent(date, index) {
      const dateObj = this.monthDates.find(d => d.date === date);
      if (dateObj) {
        dateObj.events.splice(index, 1); // Remove event by index
      }
    },
    resetForm() {
      this.newEventTitle = '';
      this.selectedDate = null;
      this.editingEventIndex = null;
      this.showEventForm = false;
    },
  },
  mounted() {
    this.generateMonthDates();
  },
};
</script>

<style>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
}
.day {
  font-weight: bold;
}
.date {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
}
.selected {
  background-color: #007bff;
  color: white;
}
input {
  margin-top: 10px;
  padding: 5px;
}
button {
  margin-left: 5px;
}
</style>
