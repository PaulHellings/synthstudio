<template>
  <div class="home">
    Synths and cats are cool

    <gear-grid></gear-grid>
  </div>
</template>

<script>

import GearGrid from '@/components/GearGrid.vue';
export default {
  name: 'Home',
  components: { GearGrid },
};
</script>
