<template>
  <q-item clickable tag="a" target="_blank" :href="path">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-capitalize">{{ name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuComponent',
  props: {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      default: '#',
    },
    icon: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      required: true,
    },
  },
});
</script>
