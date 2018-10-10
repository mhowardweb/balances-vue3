<template>
  <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent"
    >
      <v-btn color="teal" flat value="home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="balances">
        <span>Balances</span>
        <v-icon>account_balance_wallet</v-icon>
      </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "home"
    };
  },
  watch: {
    bottomNav(event) {
      this.$router.push(event);
    }
  }
};
</script>
