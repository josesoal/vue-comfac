import Api from '../Api';

class ApiFacturacion extends Api {
  constructor() {
    super();
  }
  /*** CLIENTE ***/
  async getCliente( id = -1 ) {
    return await super.get( 'cliente', id );
  }
  async saveCliente( obj ) {
    return await super.save( 'cliente', obj );
  }
  async delCliente( id ) {
    return await super.delete( 'cliente', id );
  }
  /*** FACTURA ***/
  
}

export default new ApiFacturacion();