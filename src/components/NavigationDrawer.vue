<template>
  <v-navigation-drawer app>
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            SisComFac
          </v-list-item-title>
          <v-list-item-subtitle>
            Compra y Facturación
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list 
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name : 'NavigationDrawer',
  data () {
    return {
      items: [
        { title: 'Inventario', icon: 'mdi-view-dashboard', route: '/inventario' },
        { title: 'Compra', icon: 'mdi-image', route: '/compra' },
        { title: 'Facturación', icon: 'mdi-help-box', route: '/facturacion' },
      ],
      right: null,
    }
  },
}
</script>

<style scoped>

</style>