import { memo } from 'react';
import { DeviceNode } from '../model/DeviceNode';

interface DeviceTreeNodeProps {
  node: DeviceNode;
}

// React.memo zapobiega re-renderom gałęzi, w których nic się nie zmieniło
export const DeviceTreeNode = memo(({ node }: DeviceTreeNodeProps) => {
  const { id, name, children } = node;

  return (
    <li style={{ margin: '5px 0', listStyleType: 'square' }}>
      <span style={{ fontFamily: 'monospace', color: '#333' }}>[{id}] {name}</span>
      
      {children.length > 0 && (
        <ul style={{ paddingLeft: '20px', borderLeft: '1px dashed #ccc' }}>
          {children.map((child) => (
            <DeviceTreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
});

DeviceTreeNode.displayName = 'DeviceTreeNode';