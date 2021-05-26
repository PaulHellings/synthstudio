<template>
  <nav>
    <v-app-bar flat>
      <v-toolbar-title class="text-uppercase grey--text text--darken-1"
                       style="cursor: pointer"
                       @click="navToHome">
        <v-avatar size="30" class="mr-3 mt-n1">
          <img alt="synth-logo" class="img-black-white" src="../assets/rev2.png"/>
        </v-avatar>
        <span class="font-weight-light">synth</span>
        <span>studio</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items v-for="navItem in navItems" :key="navItem.name">
        <v-btn v-if="navItem.name !== 'Login' || (navItem.name === 'Login' && !$store.state.loggedIn)"
               text
               :to="navItem.route"
               class="grey--text text--darken-1">
          <v-icon left>mdi-{{ navItem.icon }}</v-icon>
          {{ navItem.name }}
        </v-btn>
      </v-toolbar-items>
      <v-btn class="grey--text text--darken-1" v-if="$store.state.loggedIn" text @click="logout">
        <v-icon left>mdi-logout</v-icon>
        logout
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

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
        {
          name: 'Login',
          icon: 'login',
          route: '/login',
        },
      ],
    };
  },

  methods: {
    logout() {
      firebase.auth().signOut()
          .then(() => {
            this.$router.push({ name: 'Login' });

          });
    },

    navToHome() {
      if (this.$route.name !== 'Home') this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>
.img-black-white {
  filter: grayscale(100%);
}
</style>