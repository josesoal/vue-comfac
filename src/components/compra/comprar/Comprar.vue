<template>
  <v-container>
    <v-card>
      <v-card-title>
        Comprar
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            dark
            class="mb-2"
            v-on:click="nuevaCompra"
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
                  v-model="store_compra.id"
                  label="Id"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn 
                  color="warning"  
                  @click="showSearch"
                  icon
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-col>

              <DialogSearchCompra ref="search"></DialogSearchCompra>
              
              <v-col cols="4">
                <v-text-field
                  v-model="store_compra.fecha"
                  label="Fecha"
                  :rules="dateRules"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-autocomplete
                  v-model="store_compra.proveedor"
                  :items="store_proveedores"
                  item-text="nombre"
                  item-value="id"
                  label="Proveedor"
                  :rules="textRules"
                >
                </v-autocomplete>
              </v-col>
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
import DialogSearchCompra from './DialogSearchCompra.vue';

export default {
  name: 'Comprar',
  components: {
    Detalle,
    DialogSearchCompra
  },
  data() {
    return {
      formValido: true,
      /*compra: {
        id: -1,
        fecha: '',
        proveedor: '',
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
    store_compra() {
      return this.$store.state.moduleC.compra;
    },
    store_proveedores() {
      return this.$store.state.moduleC.proveedores;
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
      await this.$store.dispatch( 'getProveedor' ).moduleC;
      await this.$store.dispatch( 'getProducto' ).moduleI;
    },
    nuevaCompra() {
      this.$store.dispatch( 'cleanCompra' ).moduleC;
      
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
    async save() {
      if ( this.store_compra.id === -1 ) {
        await this.$store.dispatch( 
          'saveCompra', 
          { 
            compra: this.store_compra,
            detalle: this.$data.detalle 
          } 
        ).moduleC;
      }
      else { /* compra ya existe! */
        this.$data.detalle.cabecera = this.store_compra.id;

        await this.$store.dispatch( 
          'saveDetalle', 
          this.$data.detalle 
        ).moduleC;

        this.$data.detalle.cantidad = '';
        this.$data.detalle.precio = '';
        this.$data.detalle.descuento = 0;
        this.$data.detalle.producto = ''; 
        
        this.$refs.form.resetValidation(); 
      }      
    },
    showSearch(){
      this.$refs.search.show();
    } 
  },
  
};
</script>

<style scoped></style>
