export interface MenuElementInterface {
  icon?: string;
  name: string;
  order: number;
  path: string;
}

export class Menu implements MenuElementInterface {
  icon?: string;
  name: string;
  order: number;
  path: string;

  constructor(name: string, order: number, path: string, icon?: string) {
    this.icon = icon;
    this.name = name;
    this.order = order;
    this.path = path;
  }
}
