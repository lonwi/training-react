export class DeviceNode {
  public id: number;
  public name: string;
  public children: DeviceNode[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.children = [];
  }

  private findNode(targetId: number): DeviceNode | null {
    if (this.id === targetId) {
      return this;
    }

    for (const child of this.children) {
      const found = child.findNode(targetId);
      if (found !== null) return found;
    }

    return null;
  }

  public add(id: number, parentId: number, name: string): void {
    const node = this.findNode(parentId);
    if (node) {
      node.children.push(new DeviceNode(id, name));
    } else {
      throw Error('Parent element not found');
    }
  }

  public clone(): DeviceNode {
    // nowy adres w pamieci
    const newClone = new DeviceNode(this.id, this.name);

    // rekurencyjnie żeby dzieci miały nowy adres
    newClone.children = this.children.map((child) => child.clone());

    // zwracamy nowy obiekt
    return newClone;
  }
}
