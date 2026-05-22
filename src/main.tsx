import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';

// Funkcja asynchroniczna, która dynamicznie importuje MSW
async function enableMocking() {
  // Sprawdzamy zmienną środowiskową Vite - kod wykona się tylko przy 'npm run dev'
  if (!import.meta.env.DEV) {
    return;
  }

  // Dynamiczny import sprawia, że plik 'browser.ts' NIE wejdzie do paczki produkcyjnej
  const { worker } = await import('./mocks/browser');

  // worker.start() zwraca Promise.
  // onUnhandledRequest: 'bypass' wycisza ostrzeżenia w konsoli,
  // gdy aplikacja pobiera obrazki lub czcionki, których nie zamockowaliśmy.
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

// Najpierw czekamy na uruchomienie MSW, a DOPIERO POTEM renderujemy aplikację
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
