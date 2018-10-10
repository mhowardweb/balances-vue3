<template>
  <v-snackbar
      v-model="snackbar"
      :color="color || 'success'"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout || 6000"
      :vertical="mode === 'vertical'"
    >
      {{ text || "Toast" }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
