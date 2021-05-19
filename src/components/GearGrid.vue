<template>
  <div>
<!--    <v-text-field-->
<!--        v-model="search"-->
<!--        label="Search"-->
<!--    ></v-text-field>-->
  <v-data-table
      :headers="headers"
      :items="gear"
      :search="search"
      class="elevation-1"
  ></v-data-table>
  </div>
</template>

<script>
import db from '@/fb.js';

export default {
  name: 'GearGrid',

  data() {
    return {
      search: "",
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
      gear: [],
    };
  },

  methods: {
    async getGearData() {
      // TODO: add loader
      const gear = await db.collection('gear').get();
      this.gear = gear.docs.map(doc => doc.data());
    },
  },

  mounted() {
    this.getGearData();
  },
};
</script>

<style scoped>

</style>