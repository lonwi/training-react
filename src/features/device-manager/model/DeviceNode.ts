export class DeviceNode {
  public id: number;
  public name: string;
  public children: DeviceNode[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.children = [];
  }

  // Algorytm przeszukiwania w głąb (DFS)
  public findNode(targetId: number): DeviceNode | null {
    if (this.id === targetId) return this;

    for (const child of this.children) {
      const found = child.findNode(targetId);
      if (found !== null) return found;
    }

    return null;
  }

  // Dodawanie nowego węzła do wskazanego rodzica
  public add(id: number, parentId: number, name: string): void {
    const parentNode = this.findNode(parentId);
    if (!parentNode) {
      throw new Error(`Parent node with ID ${parentId} not found.`);
    }
    parentNode.children.push(new DeviceNode(id, name));
  }

  // Głębokie klonowanie dla zachowania immutability w stanie React/Zustand
  public clone(): DeviceNode {
    const newClone = new DeviceNode(this.id, this.name);
    newClone.children = this.children.map((child) => child.clone());
    return newClone;
  }
}
