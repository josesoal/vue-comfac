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
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
      }
    },
    async deleteCategoria( {commit}, id ) {
      try {
        await apiInve.delCategoria( id );
        commit( 'SET_CATEGORIAS', await apiInve.getCategoria() );
        alert('Categoria eliminada exitosamente' );
      }
      catch ( error ) {
        console.log( error );
        alert(error);
      }
    },

    /*** SUBCATEGORIA ***/
    async getSubCategoria( {commit, /*state*/} ) {
      try {
        commit( 'SET_SUBCATEGORIAS', await apiInve.getSubCategoria() );
      }
      catch ( error ) {
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
      }
    },
    async deleteSubCategoria( {commit}, id ) {
      try {
        await apiInve.delSubCategoria( id );
        commit( 'SET_SUBCATEGORIAS', await apiInve.getSubCategoria() );
        alert('SubCategoria eliminada exitosamente' );
      }
      catch ( error ) {
        console.log( error );
        alert(error);
      }
    },

    /*** PRODUCTO ***/
    async getProducto( {commit, /*state*/} ) {
      try {
        commit( 'SET_PRODUCTOS', await apiInve.getProducto() );
      }
      catch ( error ) {
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
      }
    },
    async deleteProducto( {commit}, id ) {
      try {
        await apiInve.delProducto( id );
        commit( 'SET_PRODUCTOS', await apiInve.getProducto() );
        alert('Producto eliminado exitosamente' );
      }
      catch ( error ) {
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
      }
    },
    async deleteProveedor( {commit}, id ) {
      try {
        await apiCompra.delProveedor( id );
        commit( 'SET_PROVEEDORES', await apiCompra.getProveedor() );
        alert('Proveedor eliminado exitosamente' );
      }
      catch ( error ) {
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
      }
    },
  }
}

const moduleFacturacion = {
  state: {
    clientes: [],
    /*compra: {
      id: -1,
      fecha: new Date().toISOString().substr(0,10),
      proveedor: '',
      detalle: []
    },*/
  },
  getters: {
  },
  mutations: {
    SET_CLIENTES( state, items ) {
      state.clientes = items;
    },
    /*SET_COMPRA( state, item ) {
      state.compra = item;
    },
    CLEAN_COMPRA( state ) {
      state.compra.id = -1;
      state.compra.fecha = new Date().toISOString().substr(0,10);
      state.compra.proveedor = '';
      state.compra.detalle = [];
    },*/
  },
  actions: {
    /*** CLIENTE ***/
    async getCliente( {commit, /*state*/} ) {
      try {
        commit( 'SET_CLIENTES', await apiFacturacion.getCliente() );
      }
      catch ( error ) {
        console.log( error );
        alert(error);
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
        console.log( error );
        alert(error);
      }
    },
    async deleteCliente( {commit}, id ) {
      try {
        await apiFacturacion.delCliente( id );
        commit( 'SET_CLIENTES', await apiFacturacion.getCliente() );
        alert('Cliente eliminado exitosamente' );
      }
      catch ( error ) {
        console.log( error );
        alert(error);
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