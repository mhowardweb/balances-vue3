<template>
  <v-app>
    <v-toolbar color="teal" app>
      <v-toolbar-title>Bitshares Account Balances</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <app-nav-bar></app-nav-bar>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    appNavBar: NavBar
  }
};
</script>


<style>
</style>
