<template>
  <nav>
    <v-app-bar flat>
      <v-toolbar-title class="text-uppercase grey--text text--darken-1">
        <v-avatar size="30" class="mr-3 mt-n1">
          <img alt="synth-logo" class="img-black-white" src="../assets/rev2.png"/>
        </v-avatar>
        <span class="font-weight-light">synth</span>
        <span>studio</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items v-for="navItem in navItems" :key="navItem.name">
        <v-btn text :to="navItem.route" class="grey--text text--darken-1">
          <v-icon left>mdi-{{ navItem.icon }}</v-icon>
          {{ navItem.name }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',

  data() {
    return {
      navItems: [
        {
          name: 'Home',
          icon: 'home',
          route: '/',
        },
        {
          name: 'Bookmarks',
          icon: 'bookmark-music',
          route: '/bookmarks',
        },
      ],
    };
  },
};
</script>

<style scoped>
.img-black-white {
  filter: grayscale(100%);
}
</style>