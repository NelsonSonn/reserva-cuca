<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBR from '@fullcalendar/core/locales/pt-br' // Importando a localização pt-BR

export default {
  components: {
    FullCalendar // torna a tag <FullCalendar> disponível
  },
  data() {
    return {
      locales: [ptBR], // Corrigido para 'locales' e 'ptBR'
      locale: 'pt-br', // Define o idioma padrão como pt-BR
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [
          { title: 'evento 1', date: '2019-04-01' },
          { title: 'evento 2', date: '2019-04-02' }
        ],
        locale: 'pt-br', // Define o idioma do calendário
        height: 650 // Ajuste a altura aqui
      }
    }
  },
  methods: {
    handleDateClick(arg) {
      alert('Clique na data! ' + arg.dateStr)
    }
  }
}
</script>
