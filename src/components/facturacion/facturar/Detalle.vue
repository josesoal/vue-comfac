<template>
  <v-container>
    <v-data-table 
      :headers="headers" 
      :items="store_factura.detalle" 
      class="elevation-1"
    >
      <template v-slot:top>
        <DeleteDialog action="deleteDetalleFactura" ref="dialog"></DeleteDialog>
      </template>

      <template v-slot:item.acciones="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template> 

      <template v-slot:no-data>
        <p></p>
      </template>

      <template slot="body.append">
        <tr class="font-weight-bold">
          <td></td>
          <td></td>
          <td>{{totales.cantidad}}</td>
          <td></td>
          <td>{{totales.descuento}}</td>
          <td>{{totales.subtotal}}</td>
          <td>{{totales.total}}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import DeleteDialog from './../../DeleteDialog.vue';

export default {
  name: "Detalle",
  components: {
    DeleteDialog,
  },
  data() {
    return {
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Producto', value: 'producto_descripcion' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Precio', value: 'precio' },
        { text: 'Descuento', value: 'descuento' },
        { text: 'Subtotal', value: 'subtotal' },
        { text: 'Total', value: 'total' },
        { text: 'Acciones', value: 'acciones', sortable: false },
      ],
    }
  },
  computed: {
    store_factura() {
      return this.$store.state.moduleF.factura;
    },
    totales() {
      let t = {
        cantidad: 0,
        subtotal: 0,
        descuento: 0,
        total: 0
      }

      if ( this.store_factura.detalle.length > 0 ) {
        this.store_factura.detalle.reduce( (i, obj) => {
          t.cantidad += obj.cantidad;
          t.subtotal += obj.subtotal;
          t.descuento += obj.descuento;
          t.total += obj.total; 
        }, 0 );
      }
      
      return t;
    }
  },
  created() {
    //this.initialize();
  },
  methods: {
    deleteItem( item ) {
      this.$refs.dialog.show( item );
    },
  }
}
</script>

<style scoped>
</style>