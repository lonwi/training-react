import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Eksportujemy instancję workera z naszymi handlerami
export const worker = setupWorker(...handlers);
