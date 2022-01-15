<template>
  <v-container>
    <v-card>
      <v-card-title>
        Facturar
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            dark
            class="mb-2"
            v-on:click="nuevaFactura"
          >
            Nuevo
          </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="formValido">
          <!-- <v-container> -->
            <v-row>
              <v-col cols="2">
                <v-text-field
                  v-model="store_factura.id"
                  label="Id"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn 
                  color="warning"  
                  @click="showSearchFactura"
                  icon
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-col>

              <DialogSearchFactura ref="searchFactura"></DialogSearchFactura>
              
              <v-col cols="3">
                <v-text-field
                  v-model="store_factura.fecha"
                  label="Fecha"
                  :rules="dateRules"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="store_factura.cliente"
                  label="Codigo"
                  @blur="buscarCliente"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="store_cliente.nombre"
                  label="Cliente"
                  :rules="textRules"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn 
                  color="warning"  
                  @click="showSearchCliente"
                  icon
                >
                  <v-icon>mdi-account-multiple</v-icon>
                </v-btn>
              </v-col>

              <DialogSearchCliente ref="searchCliente"></DialogSearchCliente>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-autocomplete
                  v-model="detalle.producto"
                  :items="store_productos"
                  item-text="descripcion"
                  item-value="id"
                  label="Producto"
                  :rules="textRules"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="detalle.cantidad"
                  label="Cantidad"
                  :rules="numberRules"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="detalle.precio"
                  label="Precio"
                  :rules="numberRules"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn 
                  color="warning" 
                  :disabled="!formValido" 
                  @click="save"
                >
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
                <v-btn 
                  color="error" 
                  class="ml-sm-2"
                  @click="cleanDetalle"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          <!-- </v-container> -->
        </v-form>
        <v-divider></v-divider>
        <Detalle></Detalle>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Detalle from './Detalle.vue';
import DialogSearchFactura from './DialogSearchFactura.vue';
import DialogSearchCliente from './../cliente/DialogSearchCliente.vue';

export default {
  name: 'Facturar',
  components: {
    Detalle,
    DialogSearchFactura,
    DialogSearchCliente
  },
  data() {
    return {
      formValido: true,
      /*factura: {
        id: -1,
        fecha: '',
        cliente: '',
      },*/
      detalle: {
        id: -1,
        cantidad: '',
        precio: '',
        descuento: 0,
        producto: '',
        cabecera: -1,
      },
      textRules: [
        v => !!v || "Requerido"
      ],
      numberRules: [
        v => !!v || "Requerido",
        v => (v && v > 0) || "No se aceptan cero o negativos"
      ],
      dateRules: [
        v => !!v || "Fecha requerida",
        v => /^\d{4}-\d{2}-\d{2}$/.test(v) || "Formato de fecha YYYY-MM-DD"
        /* Data validation can be done with DayJS */
      ],
    };
  },
  computed: {
    store_factura() {
      return this.$store.state.moduleF.factura;
    },
    store_clientes() {
      return this.$store.state.moduleF.clientes;
    },
    store_cliente() {
      return this.$store.state.moduleF.cliente;
    },
    store_productos() {
      return this.$store.state.moduleI.productos;
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      await this.$store.dispatch( 'getProducto' ).moduleI;
    },
    nuevaFactura() {
      this.$store.dispatch( 'cleanFactura' ).moduleF;
      
      this.$data.detalle.cantidad = '';
      this.$data.detalle.precio = '';
      this.$data.detalle.descuento = 0;
      this.$data.detalle.producto = '';
      this.$data.detalle.cabecera = -1;

      this.$refs.form.resetValidation(); 
    },
    cleanDetalle() {
      this.$data.detalle.producto = '';
      this.$data.detalle.cantidad = '';
      this.$data.detalle.precio = '';

      this.$refs.form.resetValidation();
    },
    async buscarCliente() {
      await this.$store.dispatch( 
        'getClienteId', 
        this.store_factura.cliente 
      ).moduleF;
    },
    async save() {
      if ( this.store_factura.id === -1 ) {
        await this.$store.dispatch( 
          'saveFactura', 
          { 
            factura: this.store_factura,
            detalle: this.$data.detalle 
          } 
        ).moduleF;
      }
      else { /* compra ya existe! */
        this.$data.detalle.cabecera = this.store_factura.id;

        await this.$store.dispatch( 
          'saveDetalleFactura', 
          this.$data.detalle 
        ).moduleF;

        this.$data.detalle.cantidad = '';
        this.$data.detalle.precio = '';
        this.$data.detalle.descuento = 0;
        this.$data.detalle.producto = ''; 
        
        this.$refs.form.resetValidation(); 
      }      
    },
    showSearchFactura(){
      this.$refs.searchFactura.show();
    },
    showSearchCliente(){
      this.$refs.searchCliente.show();
    } 
  },
}
</script>

<style scoped>

</style>