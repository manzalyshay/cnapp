<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Repositories Scan Results</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggle_theme_change">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    toggle_theme_change() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
