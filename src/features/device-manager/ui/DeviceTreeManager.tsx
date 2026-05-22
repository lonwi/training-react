import { useEffect } from 'react';
import { useFetch } from '../../../shared/hooks/useFetch';
import { useDeviceStore } from '../model/deviceStore';
import { DeviceNode } from '../model/DeviceNode';
import { DeviceTreeNode } from './DeviceTreeNode';
import { DeviceCounter } from './DeviceCounter';

interface ApiDeviceResponse {
  id: number;
  parentId: number;
  name: string;
}

export const DeviceTreeManager = () => {
  const { deviceTree, addDevice, setInitialTree } = useDeviceStore();
  
  // Symulacja pobierania płaskiej struktury z API
  const { data, isLoading, error } = useFetch<ApiDeviceResponse[]>('https://api.example.com/devices');

  useEffect(() => {
    if (data) {
      const root = new DeviceNode(1, 'Główny Serwer');
      // Przykładowe budowanie struktury z płaskiej listy z API
      data.forEach(item => {
        try {
          root.add(item.id, item.parentId, item.name);
        } catch (e) {
          console.error(e);
        }
      });
      setInitialTree(root);
    }
  }, [data, setInitialTree]);

  const handleQuickAdd = () => {
    const newId = Date.now();
    // Dodajemy nowe urządzenie bezpośrednio pod roota (ID: 1)
    addDevice(newId, 1, `Nowy Sensor (${newId.toString().slice(-4)})`);
  };

  if (isLoading) return <div>Ładowanie infrastruktury urządzeń...</div>;
  if (error) return <div>Błąd pobierania danych: {error.message}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>Menedżer Urządzeń</h2>
      <DeviceCounter />
      
      <button 
        onClick={handleQuickAdd}
        style={{ padding: '8px 12px', background: '#0052cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
      >
        + Dodaj szybkie urządzenie do Roota
      </button>

      <ul>
        <DeviceTreeNode node={deviceTree} />
      </ul>
    </div>
  );
};