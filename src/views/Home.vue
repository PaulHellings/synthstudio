<template>
  <v-container fluid>
    Synths and cats are cool
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
