import Api from '../Api';

class ApiCompra extends Api {
  constructor() {
    super();
  }
  /*** PROVEEDOR ***/
  async getProveedor( id = -1 ) {
    return await super.get( 'proveedor', id );
  }
  async saveProveedor( obj ) {
    return await super.save( 'proveedor', obj );
  }
  async delProveedor( id ) {
    return await super.delete( 'proveedor', id );
  }
  /*** COMPRA MAESTRO ***/
  async getCompra( id ) {
    return await super.get( 'compra', id );
  }
  async saveCompra( obj ) {
    return await super.save( 'compra', obj );
  }
  /*** COMPRA DETALLE ***/
  async saveDetalle( obj ) {
    return await super.save( 'compra-detalle', obj );
  }
  async delDetalle( id ) {
    return await super.delete( 'compra-detalle', id );
  }
}

export default new ApiCompra();