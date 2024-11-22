// src/components/event-utils.js

let nextEventId = 0;

export function createEventId() {
  return String(nextEventId++);
}

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: new Date().toISOString().slice(0, 10), // data atual
    allDay: true,
  },
  // Adicione mais eventos iniciais se necessário
];
