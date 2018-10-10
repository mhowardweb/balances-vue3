  <template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Accounts</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" fab dark small color="teal"><v-icon dark>add</v-icon></v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field placeholder="account" @input="updateName" :value="account.name" label="Account Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field placeholder="details" @input="updateDetails" :value="account.details" label="Account Details"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal darken-1" flat @click.native="dialog = false">Cancel</v-btn>
            <v-btn color="teal darken-1" flat @click.native="save(account)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="accounts"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr>
        <td @click="handleBalance(props.item)">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.details }}</td>
        <td class="justify-center layout px-0">
          <v-icon class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon @click="handleDelete(props.item)">
            delete
          </v-icon>
        </td>
        </tr>
      </template>
    </v-data-table>
    
    <template>
  <v-snackbar
      v-model="toast"
      :color="'error'"
      :timeout="1000"
      
    >
      The Account {{account.name}} has been Selected.
    </v-snackbar>
</template>

 </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Account", align: "left", value: "name" },
      { text: "Details", align: "center", value: "details" },
      { text: "Actions", align: "center", value: "actions", sortable: false }
    ],
    editedIndex: -1
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Account" : "Edit Account";
    },
    ...mapState({
      account: state => state.account,
      accounts: state => state.accounts,
      toast: state => state.toast
    })
  },

  watch: {
    dialog(val) {
      val || this.editedIndex === -1;
    }
  },

  methods: {
    ...mapActions({
      handleBalance: "viewBalances",
      handleDelete: "deleteAccount",
      clearForm: "clearForm",
      updateAccount: "updateAccount",
      addAccount: "addAccount",
      updateName: "updateName",
      updateDetails: "updateDetails",
      selectAccount: "selectAccount",
      displayToast: "displayToast"
    }),
    editItem(item) {
      this.selectAccount(item);
      this.dialog = true;
      this.editedIndex = 1;
    },

    save(account) {
      console.log(this.editedIndex);
      if (this.editedIndex > -1) {
        this.updateAccount(account);
      } else {
        this.addAccount(account);
      }
      this.dialog = false;
      setTimeout(() => {
        this.clearForm();
        this.editedIndex = -1;
      }, 300);
    }
  },
  created() {
    this.displayToast(false);
  }
};
</script>
