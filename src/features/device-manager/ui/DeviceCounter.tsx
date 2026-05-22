import { useDeviceStore } from '../model/deviceStore';

export const DeviceCounter = () => {
  // Wydajny selektor - komponent re-renderuje się TYLKO gdy zmienia się ta liczba
  const totalDirectDevices = useDeviceStore((state) => state.deviceTree.children.length);

  return (
    <div style={{ padding: '10px', background: '#f0f2f5', borderRadius: '4px', marginBottom: '15px' }}>
      <strong>Liczba głównych gałęzi:</strong> {totalDirectDevices}
    </div>
  );
};