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
}

export default new ApiCompra();