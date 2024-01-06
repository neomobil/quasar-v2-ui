import { DocumentData } from 'firebase/firestore';
import { Menu } from 'src/models/menu';

export class MenuSerializer {
  serialize(data: DocumentData): Menu {
    return new Menu(data.name, data.order, data.path, data.icon);
  }
}
