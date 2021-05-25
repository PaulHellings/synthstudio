<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="$store.state.gear"
        class="elevation-1"
    >
      <template v-slot:item.url="{ item} ">
        <v-avatar v-if="item.url" size="30" class="lighten-1" color="grey">
          <img alt="synth-image" :src="item.url"/>
        </v-avatar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon>
          <v-icon @click="$emit('edit', item)"
              small>
            mdi-eye
          </v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon color="red" class="text--lighten-2" @click="$emit('delete', item)"
                  small>
            mdi-delete
          </v-icon>
        </v-btn>

      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: 'GearGrid',

  data() {
    return {
      // gear to show
      gear: [],
      // data grid header config
      headers: [
        {
          text:'',
          value:'url',
          width:'40px'
        },
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
        {
          text: '',
          value: 'actions',
          sortable: false,
          align:'right'
        },
      ],
    };
  },

  methods: {},

  created() {
    // get data
    this.$store.dispatch('asyncGetGear');
  },
};
</script>

<style scoped>

</style>