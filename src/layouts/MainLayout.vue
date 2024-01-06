<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn icon="home" flat dense round aria-label="Home" to="/" />

        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>

        <q-btn flat dense round icon="person" aria-label="Menu" to="/login" />
        <q-btn
          v-if="loggedIn"
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          @click="logout"
        />
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" show-if-above bordered side="right">
      <q-list>
        <q-item-label header class="text-capitalize">
          {{ $t('menu') }}
        </q-item-label>
        <MenuComponent v-for="link in menus" :key="link.name" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-grey text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
        <div>v{{ version }}</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import MenuComponent from 'components/Menu.vue';
import { useUserStore } from 'src/stores/user-store';
import { useDefaultStore } from 'src/stores/default';

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuComponent,
  },

  setup() {
    const rightDrawerOpen = ref(false);
    const version = process.env.APP_VERSION;
    const appName = process.env.APP_NAME;
    const userStore = useUserStore();
    const defaultStore = useDefaultStore();
    const logout = () => userStore.logout();
    const menus = computed(() => defaultStore.menu);
    onMounted(() => defaultStore.getMenus());
    return {
      version,
      menus,
      appName,
      logout,
      userStore,
      rightDrawerOpen,
      toggleLeftDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  computed: {
    loggedIn() {
      return this.userStore.loggedIn;
    },
  },
});
</script>
