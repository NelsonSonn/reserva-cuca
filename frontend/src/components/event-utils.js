// src/components/event-utils.js

let nextEventId = 0;

export function createEventId() {
  return String(nextEventId++);
}

export const INITIAL_EVENTS = [
  {
   
  },
  // Adicione mais eventos iniciais se necessário
];
