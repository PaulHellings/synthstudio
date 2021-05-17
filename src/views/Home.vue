<template>
  <v-container fluid>
    <span>Synths and cats are cool</span>
    <gear-grid></gear-grid>
  </v-container>
</template>

<script>

import GearGrid from '@/components/GearGrid.vue';

export default {
  name: 'Home',
  components: { GearGrid },
};
</script>
