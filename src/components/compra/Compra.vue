<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-app-bar color="teal darken-1" dense dark>
          <v-toolbar-title>Modulo Compra</v-toolbar-title>

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
        <Proveedor v-if="opt==1"></Proveedor>
        <Comprar v-if="opt==2"></Comprar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Proveedor from './proveedor/Proveedor.vue';
import Comprar from './comprar/Comprar.vue';

export default {
  name : 'Compra',
  components: {
    Proveedor,
    Comprar,
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