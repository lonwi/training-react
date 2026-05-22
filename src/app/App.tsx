import { DeviceTreeManager } from '../features/device-manager';

export const App = () => {
  return (
    <main style={{ padding: '20px', background: '#fafafa', minHeight: '100vh' }}>
      <DeviceTreeManager />
    </main>
  );
};