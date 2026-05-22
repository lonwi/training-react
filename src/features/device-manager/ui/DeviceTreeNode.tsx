import type { DeviceNode } from '..';

interface DeviceTreeNodeProps {
  id: number;
  name: string;
  children: DeviceNode[];
}

export const DeviceTreeNode = ({ id, name, children }: DeviceTreeNodeProps) => {
  return (
    <li key={id}>
      {name}
      {children.length > 0 ? (
        <ul>
          {children.map((child) => (
            <DeviceTreeNode {...child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};
