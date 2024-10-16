import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);

// Use plugin defaults (opcional)
app.use(setupCalendar, {});

// Registre os componentes
app.component('VCalendar', Calendar);
app.component('VDatePicker', DatePicker);

// Use o router
app.use(router);

// Monte a aplicação
app.mount('#app');
