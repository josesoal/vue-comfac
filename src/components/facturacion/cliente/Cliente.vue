<template>
  <v-container>
    <v-data-table 
      :headers="headers" 
      :items="store.clientes" 
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Cliente</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-on:click="showModal"
          >
            Nuevo
          </v-btn>

          <ModalCliente ref="modal"></ModalCliente>
          
          <DeleteDialog action="deleteCliente" ref="dialog"></DeleteDialog>
        </v-toolbar>
      </template>

      <template v-slot:item.acciones="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Actualizar </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import ModalCliente from './ModalCliente.vue';
import DeleteDialog from './../../DeleteDialog.vue';

export default {
  name: 'Cliente',
  components: {
    ModalCliente,
    DeleteDialog,
  },
  data() {
    return {
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Email', value: 'email' },
        { text: 'Estado', value: 'estado' },
        { text: 'Acciones', value: 'acciones', sortable: false },
      ],
    }
  },
  computed: {
    store() {
      return this.$store.state.moduleF;
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      await this.$store.dispatch( 'getCliente' ).moduleF;
    },
    showModal() {
      this.$refs.modal.show();
    },
    editItem( item ) {
      this.$refs.modal.show( item );
    },
    deleteItem( item ) {
      this.$refs.dialog.show( item );
    },
  },
}
</script>

<style scoped>

</style>