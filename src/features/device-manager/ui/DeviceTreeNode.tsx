import { memo } from 'react';
import type { DeviceNode } from '..';

interface DeviceTreeNodeProps {
  node: DeviceNode;
}

export const DeviceTreeNode = memo(({ node }: DeviceTreeNodeProps) => {
  const { id, name, children } = node;
  return (
    <li>
      {name}
      {children.length > 0 ? (
        <ul>
          {children.map((child) => (
            <DeviceTreeNode key={child.id} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
});

// Dobra praktyka przy React.memo, ułatwia debugowanie w React DevTools
DeviceTreeNode.displayName = 'DeviceTreeNode';