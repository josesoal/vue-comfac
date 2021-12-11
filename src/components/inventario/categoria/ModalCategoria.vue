<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="id"
                label="Id"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-model="descripcion"
                label="Descripción"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text @click="close"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="blue darken-1"
          text @click="save"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalCategoria',
  data() {
    return {
      dialog: false,
      id:-1,
      descripcion: ''
    }
  },
  computed: {
    title() {
      return this.id === -1 ? "Nueva Categoria" : "Editar Categoria";
    },
  },
  watch: {
    /* Watch when the user makes click outside of the v-dialog or press ESC */
    dialog: function( newValue, /*old*/ ) {
      if ( !newValue ) {//closing
        this.clean();
      }
    }
  },
  methods: {
    show( item = null ) {
      if (item !== null){
        this.id = item.id;
        this.descripcion = item.descripcion;
      }
      this.dialog = true;
    },
    clean() {
      this.id = -1;
      this.descripcion = '';
    },
    close() {
      this.clean();
      this.dialog = false;
    },
    async save() {
      let {dialog, ...remaining} = this.$data;
      await this.$store.dispatch( 'saveCategoria', remaining ).moduleI;

      this.clean();
      dialog = false;
      this.dialog = dialog;
    },
  }
}
</script>