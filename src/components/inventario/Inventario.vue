<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-app-bar color="teal darken-1" dense dark>
          <v-toolbar-title>Inventario</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="chooseOpt(1)">
            <v-icon>mdi-shape</v-icon>
          </v-btn>

          <v-btn icon @click="chooseOpt(2)">
            <v-icon>mdi-file-tree</v-icon>
          </v-btn>

          <v-btn icon @click="chooseOpt(3)">
            <v-icon>mdi-view-comfy</v-icon>
          </v-btn>
        </v-app-bar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Categoria v-if="opt==1"></Categoria>
        <SubCategoria v-if="opt==2"></SubCategoria>
        <Producto v-if="opt==3"></Producto>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Categoria from './categoria/Categoria.vue';
import SubCategoria from './subcategoria/SubCategoria.vue';
import Producto from './producto/Producto.vue';

export default {
  name: "Inventario",
  components: {
    Categoria,
    SubCategoria,
    Producto,
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
};
</script>

<style scoped></style>
