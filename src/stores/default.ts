import { PiniaCustomStateProperties, defineStore } from 'pinia';
import UserMetadata = firebase.auth.UserMetadata;
import { MenuService } from 'src/services/MenuService';
import firebase from 'firebase/compat/app';
import { Menu } from 'src/models/menu';

export interface DefaultStoreStateInterface extends PiniaCustomStateProperties {
  menu: Menu[];
}

export interface StoreUserInterface {
  displayName: string | null;
  email: string | null;
  metadata: UserMetadata;
  uid: string | null;
}

export interface UserStateInterface {
  loggedIn: boolean;
}

export const useDefaultStore = defineStore('default', {
  actions: {
    getMenus() {
      const menuService = new MenuService();
      this.menu = menuService.getCollection();
    },
  },
  state: (): DefaultStoreStateInterface => ({
    menu: [] as Menu[],
  }),
});
