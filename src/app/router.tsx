import { createBrowserRouter } from 'react-router';
import { AppLayout } from './AppLayout';
import { HomePage } from '../pages/home';
import { DevicesPage } from '../pages/devices';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'devices', element: <DevicesPage /> },
    ],
  },
]);