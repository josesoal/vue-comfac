<template>
  <v-dialog
    v-model="dialog"
    max-width="300px"
  >
    <v-form v-model="formValido">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="id"
                label="Id"
                :rules="textRules"
                autofocus
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
          text @click="search"
        >
          Buscar
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogSearchFactura.vue',
  data() {
    return {
      dialog: false,
      formValido: true,
      title: 'Digite Id de Factura',
      id: '',
      textRules: [
        v => !!v || "Requerido"
      ],
    }
  },
  methods: {
    show() {
      this.dialog = true;
    },
    clean() {
      this.id = '';
    },
    close() {
      this.clean();
      this.dialog = false;
    },
    async search() {
      await this.$store.dispatch( 
        'getFactura',
        this.$data.id
      ).moduleF;
      this.close();
    }
  }
}
</script>

<style scoped>

</style>