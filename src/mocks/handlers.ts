import { http, HttpResponse } from 'msw';

export const handlers = [
  // Nasłuchujemy na zapytanie GET pod konkretny URL
  http.get('https://api.example.com/devices', () => {
    
    // Zwracamy fałszywą odpowiedź po 1 sekundzie (symulacja opóźnienia)
    return HttpResponse.json([
      { id: 2, parentId: 1, name: 'Dysk 1' },
      { id: 3, parentId: 1, name: 'Dysk 2' }
    ]);
  }),

  // Symulacja błędu serwera (np. do testowania obsługi błędów)
  http.post('https://api.example.com/devices', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
  }),
];
