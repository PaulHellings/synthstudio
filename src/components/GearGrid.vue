<template>
  <v-data-table
      :headers="headers"
      :items="gear"
      class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: 'GearGrid',

  data() {
    return {
      headers: [
        {
          text: 'Model',
          value: 'model',
        },
        {
          text: 'Brand',
          value: 'brand',
        },
        {
          text: 'Type',
          value: 'type',
        },
      ],
      gear: [
        {
          id: 1,
          type: 'synthesizer',
          model: 'Virus',
          brand: 'Access',
        },
        {
          id: 2,
          type: 'synthesizer',
          model: 'Streichfett',
          brand: 'Waldorf',
        },
        {
          id: 3,
          type: 'drummachine',
          model: 'Analog Rytm',
          brand: 'Elektron',
        },
        {
          id: 4,
          type: 'drummachine',
          model: 'RD-8',
          brand: 'Behringer',
        },
        {
          id: 5,
          type: 'synthesizer',
          model: 'Quasar',
          brand: 'Quasimidi',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>