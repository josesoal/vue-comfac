<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-app-bar color="teal darken-1" dense dark>
          <v-toolbar-title>Modulo Facturacion</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="chooseOpt(1)">
            <v-icon>mdi-shape</v-icon>
          </v-btn>

          <v-btn icon @click="chooseOpt(2)">
            <v-icon>mdi-file-tree</v-icon>
          </v-btn>
        </v-app-bar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Cliente v-if="opt==1"></Cliente>
        <Facturar v-if="opt==2"></Facturar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cliente from './cliente/Cliente.vue';
import Facturar from './facturar/Facturar.vue';

export default {
  name : 'Facturacion',
  components: {
    Cliente,
    Facturar
  },
  data() {
    return {
      opt: null,
    }
  },
  methods: {
    chooseOpt( opt ) {
      this.opt = opt;
    }
  }
}
</script>

<style scoped>
</style>