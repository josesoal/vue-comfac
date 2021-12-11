<template>
  <v-app>
    <NavigationDrawer></NavigationDrawer>
    <v-app-bar app color="blue darken-2" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Sistema de Compra y Facturación</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-row>
          <router-view></router-view>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue'

export default {
  name: 'App',
  components : {
    NavigationDrawer
  }
};
</script>