<template>
  <div>
    <v-toolbar color="blue-grey lighten-4">
      <v-toolbar-title>Balances for Account: {{account.name}}</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="balances"
      hide-actions
      class="elevation-1"
    >
      <template v-if="props.item.qty > 0.1" slot="items" slot-scope="props">
        <td>{{ props.item.coin }}</td>
        <td class="text-xs-center">{{ props.item.qty }}</td>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    headers: [
      { text: "Coin", align: "left", value: "coin" },
      { text: "Balance", align: "center", value: "qty" }
    ]
  }),
  computed: {
    ...mapState({
      balances: state => state.balances,
      account: state => state.account
    })
  }
};
</script>
