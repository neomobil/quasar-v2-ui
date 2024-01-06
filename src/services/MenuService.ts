import { Menu } from 'src/models/menu';
import { MenuSerializer } from 'src/serializers/MenuSerializer';
import { FirebaseWebService } from 'src/services/FirebaseWebService';

export class MenuService extends FirebaseWebService {
  constructor() {
    super('menus');
  }
  getCollection(): Menu[] {
    const menus: Menu[] = [];
    const serializer = new MenuSerializer();
    this.GET('order').then((response) => {
      response.forEach((doc) => {
        menus.push(serializer.serialize(doc.data()));
      });
    });
    return menus;
  }
}
