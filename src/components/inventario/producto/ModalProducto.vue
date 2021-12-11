<template>
  <v-dialog
    v-model="dialog"
    max-width="800px"
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
            <v-col cols="5">
              <v-autocomplete
                v-model="subcategoria"
                :items="store.subcategorias"
                item-text="descripcion"
                item-value="id"
                label="Sub Categoria"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="codigo"
                label="Código"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="descripcion"
                label="Descripción"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="existencia"
                label="Existencia"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="precio"
                label="Precio"
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
  name: 'ModalProducto',
  data() {
    return {
      dialog: false,
      id:-1,
      codigo: '',
      descripcion: '',
      existencia: 0,
      precio: 0,
      subcategoria: -1,
      scat_descripcion: '',
    }
  },
  computed: {
    title() {
      return this.id === -1 ? 'Nuevo Producto' : 'Editar Producto';
    },
    store() {
      return this.$store.state.moduleI;
    },
  },
  created() {
    this.initialize();
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
    async initialize() {
      await this.$store.dispatch( 'getSubCategoria' ).moduleI;
    },
    show( item = null ) {
      if (item !== null){
        this.id = item.id;
        this.codigo = item.codigo;
        this.descripcion = item.descripcion;
        this.existencia = item.existencia;
        this.precio = item.precio;
        this.subcategoria = item.subcategoria;
        this.scat_descripcion = item.scat_descripcion;
      }
      this.dialog = true;
    },
    clean() {
      this.id = -1;
      this.codigo = '';
      this.descripcion = '';
      this.existencia = 0;
      this.precio = 0;
      this.subcategoria = -1;
      this.scat_descripcion = '';
    },
    close() {
      this.clean();
      this.dialog = false;
    },
    async save() {
      let {dialog, ...remaining} = this.$data;
      await this.$store.dispatch( 'saveProducto', remaining ).moduleI;

      this.clean();
      dialog = false;
      this.dialog = dialog;
    },
  }
}
</script>