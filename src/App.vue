<template>
  <v-app>
    <nav-bar class="mb-2"></nav-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>

import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
