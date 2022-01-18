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
                v-model="cliente.id"
                label="Id"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-model="cliente.nombre"
                :rules="nameRules"
                label="Nombre"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cliente.telefono"
                :rules="textRules"
                label="Telefono"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cliente.email"
                :rules="emailRules"
                label="Email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-switch
                v-model="cliente.estado"
                label="Estado"
              ></v-switch>
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
  name: 'ModalCliente',
  data() {
    return {
      dialog: false,
      cliente: {
        id: -1,
        nombre: '',
        telefono: '',
        email: '',
        estado: true,
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
      return this.cliente.id === -1 ? 'Nuevo cliente' : 'Editar cliente';
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
        this.cliente.id = item.id;
        this.cliente.nombre = item.nombre;
        this.cliente.telefono = item.telefono;
        this.cliente.email = item.email;
        this.cliente.estado = item.estado;
      }
      this.dialog = true;
    },
    clean() {
      this.cliente.id = -1;
      this.cliente.nombre = '';
      this.cliente.telefono = '';
      this.cliente.email = '';
      this.cliente.estado = true;
    },
    close() {
      this.clean();
      this.dialog = false;
    },
    async save() {
      await this.$store.dispatch( 
        'saveCliente', 
        {...this.cliente} 
      ).moduleF;

      this.close();
    },
  }
}
</script>

<style scoped>

</style>