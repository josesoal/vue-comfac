<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col class="d-flex align-center" style="height: 100vh;">
        <v-card width="400" class="mx-auto pa-4">
          <v-card-title>
            <h4>Login</h4>
          </v-card-title>
          <v-form>
            <v-text-field
              v-model="username"
              prepend-icon="mdi-account"
              label="Username"
              ref="username"
            ></v-text-field>
            <v-text-field
              v-model="password"
              prepend-icon="mdi-lock"
              label="Password"
              type="password"
            ></v-text-field>
            <v-card-actions>
              <v-btn large block @click="login">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiAuth from './ApiAuth';

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      apiAuth: new ApiAuth
    }
  },
  mounted() {
    this.$refs.username.focus();
  },
  methods: {
    async login() {
      if ( this.username == '') {
        alert('Usuario requerido');
        return;
      }
      if ( this.password == '' || this.password.length <= 3) {
        alert('Password requerido o debe ser mayor a 3 digitos');
        return;
      }
      
      let token = await this.apiAuth.login( this.username, this.password );

      if ( 'access' in token ) {
        localStorage.setItem( 'username', this.username );
        localStorage.setItem( 'access', token.access );
        localStorage.setItem( 'refresh', token.refresh );
        this.$router.push('/');
        /* this event can be executed by any component */
        this.$root.$emit('login', this.username);
      }
      else if ( 'detail' in token ) {
        alert( token.detail );
      }
      else if ( 'error' in token ) {
        alert( token.error );
      }
      else {
        alert( 'Error inesperado' );
      }
    }
  }
}
</script>

<style scoped>
</style>