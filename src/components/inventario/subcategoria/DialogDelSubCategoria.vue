<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">¿Estás seguro que quieres eliminar este <hr> elemento?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogDelSubCategoria',
  data() {
    return {
      dialog: false,
      id: -1,
    }
  },
  methods: {
    show( item) {
      this.id = item.id;
      this.dialog = true;
    },
    closeDelete() {
      this.dialog = false;
    },
    async deleteItemConfirm() {
      await this.$store.dispatch( 'deleteSubCategoria', this.id ).moduleI;
      this.dialog = false;
    }
  }
}
</script>

<style scoped>
</style>