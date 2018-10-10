<template>
  <v-layout row justify-center>
    <v-dialog v-model="displayDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete Account</v-card-title>
        <v-card-text>Are you sure you wish to delete this Account ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="buttonClicked(false)">Cancel</v-btn>
          <v-btn color="green darken-1" flat @click.native="buttonClicked(true)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
 

<script>
export default {
  props: {
    displayDialog: Boolean
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    buttonClicked(value) {
      this.$emit("dialogDelete", value);
    }
  }
};
</script>
