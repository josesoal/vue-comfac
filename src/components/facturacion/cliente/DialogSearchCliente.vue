<template>
  <v-dialog v-model="dialog" max-width="500px">
    <!-- <v-form v-model="formValido"> -->
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="texto"
                  label="Ingrese texto"
                  autofocus
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="search"
                >
                  Buscar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <v-data-table
            :headers="headers"
            :items="store.clientes"
            class="elevation-1"
            @click:row="selectCliente"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Resultados</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <template v-slot:no-data>
              <p>Sin datos</p>
            </template>
          </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
        </v-card-actions>
      </v-card>
    <!-- </v-form> -->
  </v-dialog>
</template>

<script>
export default {
  name: "DialogSearchCliente.vue",
  data() {
    return {
      dialog: false,
      title: "Buscar Cliente por Nombre",
      texto: "",
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Nombre", value: "nombre" },
        { text: "Telefono", value: "telefono" },
        { text: "Email", value: "email" },
        { text: "Estado", value: "estado" },
      ],
    };
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
    initialize() {
      this.$store.dispatch( 'cleanClientes' ).moduleF;
    },
    show() {
      this.dialog = true;
    },
    clean() {
      this.texto = "";
      this.$store.dispatch( 'cleanClientes' ).moduleF;
    },
    close() {
      this.clean();
      this.dialog = false;
    },
    async search() {
      if ( this.$data.texto != '') {
        await this.$store.dispatch(
          "getClienteByName", this.$data.texto
        ).moduleF;
      }
      else {
        this.$store.dispatch( 'cleanClientes' ).moduleF;
      }
    },
    selectCliente( row ) {
      this.$store.dispatch( 
        'selectCliente', 
        {
          id: row.id, 
          nombre: row.nombre
        } 
      ).moduleF;

      this.close();
    }
  },
};
</script>

<style scoped></style>
