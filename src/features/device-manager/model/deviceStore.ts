import { create } from 'zustand';
import { DeviceNode } from './DeviceNode';

interface DeviceStore {
  deviceTree: DeviceNode;
  setInitialTree: (tree: DeviceNode) => void;
  addDevice: (id: number, parentId: number, name: string) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  // Początkowo pusty root, zainicjalizowany poprawnie po fetchu danych
  deviceTree: new DeviceNode(1, 'Główny Serwer'),

  setInitialTree: (tree) => set({ deviceTree: tree }),

  addDevice: (id, parentId, name) =>
    set((state) => {
      state.deviceTree.add(id, parentId, name);
      // Wymuszamy nową referencję poprzez .clone()
      return { deviceTree: state.deviceTree.clone() };
    }),
}));