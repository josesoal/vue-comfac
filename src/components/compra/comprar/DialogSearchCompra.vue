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
  name: 'DialogSearchCompra.vue',
  data() {
    return {
      dialog: false,
      formValido: true,
      title: 'Digite Id de Compra',
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
        'getCompra',
        this.$data.id
      ).moduleC;
      this.close();
    }
  }
}
</script>

<style scoped>

</style>