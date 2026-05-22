import { useState } from 'react';

import { DeviceNode } from '..';
import { DeviceTreeNode } from '.';

export const DeviceTree = () => {
  const [deviceTree, setDeviceTree] = useState(() => {
    const root = new DeviceNode(1, 'Root');
    root.add(2, 1, 'Disks');
    root.add(3, 1, 'Found');
    root.add(4, 1, 'Not Found');
    root.add(5, 2, 'Disks 1');
    root.add(6, 2, 'Disks 2');

    return root;
  });

  const handleAddNewDevice = () => {
    // 1. Najpierw modyfikujemy obecne drzewo (dodajemy element do tablicy)
    deviceTree.add(7, 3, 'Nowy Dysk');

    // 2. Tworzymy kopię całego drzewa o NOWYM adresie w pamięci
    const newTreeStructure = deviceTree.clone();

    // 3. Przekazujemy nowy adres do stanu Reacta
    setDeviceTree(newTreeStructure);
  };

  return (
    <>
      <ul>
        {deviceTree.children.map((child) => (
          <DeviceTreeNode {...child} />
        ))}
      </ul>
      <button onClick={handleAddNewDevice}>Add</button>
    </>
  );
};
