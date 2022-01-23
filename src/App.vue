<template>
  <v-app>
    <v-system-bar
      color="grey lighten-1" app
    >
      <v-spacer></v-spacer>
      <v-icon>mdi-account-tie</v-icon>
      <span>{{username}}</span>
      <v-icon @click="logout">mdi-exit-to-app</v-icon>
    </v-system-bar>
    <NavigationDrawer 
      ref="drawer" @click="showDrawer"
      v-if="showBar"
    ></NavigationDrawer>
    <v-main>
      <v-app-bar color="blue darken-2" dark v-if="showBar">
        <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Sistema de Compra y Facturación</v-toolbar-title>
      </v-app-bar>
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
  components: {
    NavigationDrawer
  },
  data() {
    return {
      showBar: this.isLogged(),
      username: localStorage.getItem('username'),
    }
  },
  mounted() {
    /* register handler for login event */
    this.$root.$on( 'login', (username) => this.login(username) );
  },
  methods: {
    showDrawer() {
      this.$refs.drawer.show();
    },
    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      this.username = '';
      this.showBar = false;
      this.$router.push('/login');
    },
    login( username ) {
      this.username = username;
      this.showBar = true;
    },
    isLogged() {
      return localStorage.getItem('access') != null;
    }
  }
};
</script>