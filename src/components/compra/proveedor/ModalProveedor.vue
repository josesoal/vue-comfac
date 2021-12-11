<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <v-form v-model="formValido">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="proveedor.id"
                label="Id"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-model="proveedor.nombre"
                :rules="nameRules"
                label="Nombre"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="proveedor.telefono"
                :rules="textRules"
                label="Telefono"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="proveedor.email"
                :rules="emailRules"
                label="Email"
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
          :disabled="!formValido"
          text @click="save"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
  </v-dialog> 
</template>

<script>
export default {
  name: 'ModalProveedor',
  data() {
    return {
      dialog: false,
      proveedor: {
        id: -1,
        nombre: '',
        telefono: '',
        email: ''
      },
      emailRules: [
        v => !!v || "Email es requerido",
        v => /.+@.+\..+/.test(v) || "Email debe ser valido"
      ], 
      textRules: [
        v => !!v || "Requerido"
      ],
      nameRules: [
        v => !!v || "Nombre Requerido",
        v => (v && v.length >= 4) || "Nombre debe tener al menos 4 caracteres"
      ],
      formValido: true,
    }
  },
  computed: {
    title() {
      return this.proveedor.id === -1 ? 'Nuevo Proveedor' : 'Editar Proveedor';
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
        this.proveedor.id = item.id;
        this.proveedor.nombre = item.nombre;
        this.proveedor.telefono = item.telefono;
        this.proveedor.email = item.email;
      }
      this.dialog = true;
    },
    clean() {
      this.proveedor.id = -1;
      this.proveedor.nombre = '';
      this.proveedor.telefono = '';
      this.proveedor.email = '';
    },
    close() {
      this.clean();
      this.dialog = false;
    },
    async save() {
      await this.$store.dispatch( 
        'saveProveedor', 
        this.$data.proveedor 
      ).moduleC;

      this.close();
    },
  }
}
</script>

<style scoped>

</style>