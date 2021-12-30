<template>
  <v-container>
    <v-data-table 
      :headers="headers" 
      :items="store.categorias" 
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Categoria</v-toolbar-title>
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

          <ModalCategoria ref="modal"></ModalCategoria>
          
          <DeleteDialog action="deleteCategoria" ref="dialog"></DeleteDialog>
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
import ModalCategoria from './ModalCategoria.vue';
import DeleteDialog from './../../DeleteDialog.vue';

export default {
  name: 'Categoria',
  components: {
    ModalCategoria,
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
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Acciones', value: 'acciones', sortable: false },
      ],
    };
  },
  computed: {
    store() {
      return this.$store.state.moduleI;
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      await this.$store.dispatch( 'getCategoria' ).moduleI;
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
};
</script>

<style scoped></style>
