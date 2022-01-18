import Vue from 'vue'
import Vuex from 'vuex'
import apiInve from './components/inventario/ApiInventario'
import apiCompra from './components/compra/ApiCompra'
import apiFacturacion from './components/facturacion/ApiFacturacion'

Vue.use(Vuex)

const moduleInventario = {
  state: {
    categorias: [],
    subcategorias: [],
    productos: [],
  },
  getters: {
  },
  mutations: {
    SET_CATEGORIAS( state, items ) {
      state.categorias = items;
    },
    SET_SUBCATEGORIAS( state, items ) {
      state.subcategorias = items;
    },
    SET_PRODUCTOS( state, items ) {
      state.productos = items;
    },
  },
  actions: {
    /*** CATEGORIA ***/
    async getCategoria( {commit, /*state*/} ) {
      try {
        commit( 'SET_CATEGORIAS', await apiInve.getCategoria() );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async saveCategoria( {commit}, item ) {
      try {
        await apiInve.saveCategoria( item );
        commit( 'SET_CATEGORIAS', await apiInve.getCategoria() );
        if (item.id === -1)
          alert('Categoria insertada exitosamente');
        else
          alert('Categoria actualizada exitosamente');
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async deleteCategoria( {commit}, id ) {
      try {
        await apiInve.delCategoria( id );
        commit( 'SET_CATEGORIAS', await apiInve.getCategoria() );
        alert('Categoria eliminada exitosamente' );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },

    /*** SUBCATEGORIA ***/
    async getSubCategoria( {commit, /*state*/} ) {
      try {
        commit( 'SET_SUBCATEGORIAS', await apiInve.getSubCategoria() );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async saveSubCategoria( {commit}, item ) {
      try {
        await apiInve.saveSubCategoria( item );
        commit( 'SET_SUBCATEGORIAS', await apiInve.getSubCategoria() );
        if (item.id === -1)
          alert('SubCategoria insertada exitosamente');
        else
          alert('SubCategoria actualizada exitosamente');       
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async deleteSubCategoria( {commit}, id ) {
      try {
        await apiInve.delSubCategoria( id );
        commit( 'SET_SUBCATEGORIAS', await apiInve.getSubCategoria() );
        alert('SubCategoria eliminada exitosamente' );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },

    /*** PRODUCTO ***/
    async getProducto( {commit, /*state*/} ) {
      try {
        commit( 'SET_PRODUCTOS', await apiInve.getProducto() );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async saveProducto( {commit}, item ) {
      try {
        await apiInve.saveProducto( item );
        commit( 'SET_PRODUCTOS', await apiInve.getProducto() );
        if (item.id === -1)
          alert('Producto insertado exitosamente');
        else
          alert('Producto actualizado exitosamente');       
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async deleteProducto( {commit}, id ) {
      try {
        await apiInve.delProducto( id );
        commit( 'SET_PRODUCTOS', await apiInve.getProducto() );
        alert('Producto eliminado exitosamente' );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
  }
}

const moduleCompra = {
  state: {
    proveedores: [],
    compra: {
      id: -1,
      fecha: new Date().toISOString().substr(0,10),
      proveedor: '',
      detalle: []
    },
  },
  getters: {
  },
  mutations: {
    SET_PROVEEDORES( state, items ) {
      state.proveedores = items;
    },
    SET_COMPRA( state, item ) {
      state.compra = item;
    },
    CLEAN_COMPRA( state ) {
      state.compra.id = -1;
      state.compra.fecha = new Date().toISOString().substr(0,10);
      state.compra.proveedor = '';
      state.compra.detalle = [];
    },
  },
  actions: {
    /*** PROVEEDOR ***/
    async getProveedor( {commit, /*state*/} ) {
      try {
        commit( 'SET_PROVEEDORES', await apiCompra.getProveedor() );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async saveProveedor( {commit}, item ) {
      try {
        await apiCompra.saveProveedor( item );
        commit( 'SET_PROVEEDORES', await apiCompra.getProveedor() );
        if (item.id === -1)
          alert('Proveedor insertado exitosamente');
        else
          alert('Proveedor actualizado exitosamente');
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async deleteProveedor( {commit}, id ) {
      try {
        await apiCompra.delProveedor( id );
        commit( 'SET_PROVEEDORES', await apiCompra.getProveedor() );
        alert('Proveedor eliminado exitosamente' );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    /*** COMPRA MAESTRO ***/
    cleanCompra( {commit} ) {
      commit( 'CLEAN_COMPRA' );
    },
    async getCompra( {commit, /*state*/}, id ) {
      try {
        commit( 'SET_COMPRA', await apiCompra.getCompra(id) );
      }
      catch ( error ) {
        if ( error.toString() === 'Error: 404') {
          commit( 'CLEAN_COMPRA' );
          console.log( 'HTTP error! status: ' + error );
          alert('Compra no encontrada');
        }
        else {
          console.log( 'HTTP error! status: ' + error );
          alert('Error inesperado');
        }
      }
    },
    async saveCompra( {commit}, {compra, detalle} ) {
      try {
        const e = await apiCompra.saveCompra( compra );
 
        detalle.cabecera = e.id;
        await apiCompra.saveDetalle( detalle );
        
        commit( 'SET_COMPRA', await apiCompra.getCompra( e.id ) );
        
        if (compra.id === -1)
          alert('Compra registrada exitosamente');
        else
          alert('Compra actualizada exitosamente');
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    /*** COMPRA DETALLE ***/
    async saveDetalle( {commit, state}, item ) {
      try {
        await apiCompra.saveDetalle( item );
        commit( 
          'SET_COMPRA', 
          await apiCompra.getCompra( state.compra.id ) 
        );
        if (item.id === -1)
          alert('Detalle insertado exitosamente');
        else
          alert('Detalle actualizado exitosamente');
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async deleteDetalle( {commit, state}, id ) {
      try {
        await apiCompra.delDetalle( id );
        commit( 
          'SET_COMPRA', 
          await apiCompra.getCompra(state.compra.id) 
        );
        alert('Detalle eliminado exitosamente' );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
  }
}

const moduleFacturacion = {
  state: {
    clientes: [],
    cliente: {
      id: -1,
      nombre: '',
      telefono: '',
      email: '',
      estado: true,
    },
    factura: {
      id: -1,
      fecha: new Date().toISOString().substr(0,10),
      cliente: '',
      detalle: []
    },
  },
  getters: {
  },
  mutations: {
    SET_CLIENTES( state, items ) {
      state.clientes = items;
    },
    CLEAN_CLIENTES( state ) {
      state.clientes = [];
    },
    SET_CLIENTE( state, item ) {
      state.cliente = item;
    },
    SELECT_CLIENTE( state, item ) {
      state.factura.cliente = item.id;
      state.cliente.nombre = item.nombre;
    },
    SET_FACTURA( state, item ) {
      state.factura = item;
    },
    CLEAN_FACTURA( state ) {
      state.factura.id = -1;
      state.factura.fecha = new Date().toISOString().substr(0,10);
      state.factura.cliente = '';
      state.factura.detalle = [];
      state.cliente.nombre = '';
    },
  },
  actions: {
    /*** CLIENTE ***/
    cleanClientes( {commit} ) {
      commit( 'CLEAN_CLIENTES' );
    },
    async getClienteId( {commit, /*state*/}, id ) {
      try {
        commit( 'SET_CLIENTE', await apiFacturacion.getCliente( id ) );
      }
      catch ( error ) {
        if ( error.toString() === 'Error: 404') {
          commit( 'SET_CLIENTE', {} );
          console.log( 'HTTP error! status: ' + error );
          alert('Cliente no encontrado');
        }
        else {
          console.log( 'HTTP error! status: ' + error );
          alert('Error inesperado');
        }
      }
    },
    async getClienteByName( {commit, /*state*/}, texto ) {
      try {
        const e = await apiFacturacion.getClienteByName(texto);
      
        if ( e.detail !== undefined ){
          alert( e.detail );
          commit( 'CLEAN_CLIENTES' );
        }
        else {
          commit( 'SET_CLIENTES', e );
        }        
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    selectCliente( {commit}, {id, nombre} ) {
      commit( 'SELECT_CLIENTE', {id: id, nombre: nombre} );
    },
    async getCliente( {commit, /*state*/} ) {
      try {
        commit( 'SET_CLIENTES', await apiFacturacion.getCliente() );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async saveCliente( {commit}, item ) {
      try {
        await apiFacturacion.saveCliente( item );
        commit( 'SET_CLIENTES', await apiFacturacion.getCliente() );
        if (item.id === -1)
          alert('Cliente insertado exitosamente');
        else
          alert('Cliente actualizado exitosamente');
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async deleteCliente( {commit}, id ) {
      try {
        await apiFacturacion.delCliente( id );
        commit( 'SET_CLIENTES', await apiFacturacion.getCliente() );
        alert('Cliente eliminado exitosamente' );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    /*** FACTURA MAESTRO ***/
    cleanFactura( {commit} ) {
      commit( 'CLEAN_FACTURA' );
    },
    async getFactura( {commit, state}, id ) {
      try {
        commit( 'SET_FACTURA', await apiFacturacion.getFactura( id ) );
        commit( 'SET_CLIENTE', await apiFacturacion.getCliente( state.factura.cliente ) );
      }
      catch ( error ) {
        if ( error.toString() === 'Error: 404') {
          commit( 'CLEAN_FACTURA' );
          console.log( 'HTTP error! status: ' + error );
          alert('Factura no encontrada');
        }
        else {
          console.log( 'HTTP error! status: ' + error );
          alert('Error inesperado');
        }
      }
    },
    async saveFactura( {commit}, {factura, detalle} ) {
      try {
        const e = await apiFacturacion.saveFactura( factura );
 
        detalle.cabecera = e.id;
        const res = await apiFacturacion.saveDetalle( detalle );
        
        commit( 'SET_FACTURA', await apiFacturacion.getFactura( e.id ) );
        alert('Factura creada exitosamente');

        if ( res.id === undefined ){
          alert( res );
        }
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    /*** FACTURA DETALLE ***/
    async saveDetalleFactura( {commit, state}, item ) {
      try {
        const res = await apiFacturacion.saveDetalle( item );
        if ( res.id === undefined ){
          alert( res );
        } 
        else {
          commit( 
            'SET_FACTURA', 
            await apiFacturacion.getFactura( state.factura.id ) 
          );
        }        
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
    async deleteDetalleFactura( {commit, state}, id ) {
      try {
        await apiFacturacion.delDetalle( id );
        commit( 
          'SET_FACTURA', 
          await apiFacturacion.getFactura(state.factura.id) 
        );
        alert('Detalle eliminado exitosamente' );
      }
      catch ( error ) {
        console.log( 'HTTP error! status: ' + error );
        alert('Error inesperado');
      }
    },
  }
}

export default new Vuex.Store({
  modules: {
    moduleI: moduleInventario,
    moduleC: moduleCompra,
    moduleF: moduleFacturacion
  }
});