<template>
  <v-container fluid>
    <v-list>
      <v-list-item v-for="bookmark in bookmarks" :key="bookmark.id">
        <v-list-item-content>
          <v-list-item-title><a class="text-decoration-none" :href="bookmark.url" target="_blank">{{ bookmark.name }}</a></v-list-item-title>
          <v-list-item-subtitle>{{ bookmark.url }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'BookMarks',

  data() {
    return {
      bookmarks: [
        {
          id: 0,
          name: 'Synthforum',
          url: 'http://www.synthforum.nl',
        },
        {
          id: 1,
          name: 'Modulargrid',
          url: 'http://www.modulargrid.net',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>