<template>
  <div>
    <v-data-table
        :headers="headersToShow"
        :items="gear"
        class="elevation-1 gear-data-table"
    >
      <template v-slot:item.url="{ item} ">
        <v-avatar v-if="item.url"
                  :size="avatarSize"
                  class="lighten-1"
                  :class="{ 'my-5':  $vuetify.breakpoint.xs }"
                  color="grey">
          <img alt="synth-image" :src="item.url"/>
        </v-avatar>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- normal button -->
        <v-btn icon class="d-none d-sm-inline-block">
          <v-icon @click="$emit('edit', item)"
                  small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <!-- mobile button -->
        <v-btn class="d-sm-none mr-3" elevation="0" @click="$emit('edit', item)">
          <v-icon left
                  small>
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
        <!-- normal button -->
        <v-btn icon class="d-none d-sm-inline-block">
          <v-icon color="red"
                  class="text--lighten-2"
                  @click="$emit('delete', item)"
                  small>mdi-delete
          </v-icon>
        </v-btn>
        <!-- mobile button -->
        <v-btn color="error" class="d-sm-none" elevation="0" @click="$emit('delete', item)">
          <v-icon left
                  class="text--lighten-2"
                  small>mdi-delete
          </v-icon>
          Delete
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GearGrid',

  data() {
    return {
      // data grid header config
      headers: [
        {
          text: '',
          value: 'url',
          width: '40px',
          align: 'center',
          cellClass: 'avatar-col',
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
          align: 'right',
          width: '110px',
        },
      ],
    };
  },

  computed: {
    ...mapState(['loggedIn', 'gear']),

    headersToShow() {
      if (this.loggedIn) {
        return this.headers;
      } else {
        return this.headers.filter(headerItem => headerItem.value !== 'actions');
      }
    },

    avatarSize() {
      return this.$vuetify.breakpoint.smAndUp ? '30' : '150';
    },
  },

  methods: {},

  created() {
    // get data
    this.$store.dispatch('asyncGetGear');
  },
};
</script>

<style scoped>
/* temp set mobile col css so cols without header are centered */
.gear-data-table ::v-deep .v-data-table__mobile-row__cell {
  flex-grow:  1;
  text-align: center;
}
</style>