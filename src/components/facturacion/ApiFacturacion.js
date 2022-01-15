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
  async getClienteByName( texto ) {
    return await super.get( 'cliente/by-name', texto );
  }
  /*** FACTURA MAESTRO ***/
  async getFactura( id ) {
    return await super.get( 'factura', id );
  }
  async saveFactura( obj ) {
    return await super.save( 'factura', obj );
  }
  /*** FACTURA DETALLE ***/
  async saveDetalle( obj ) {
    return await super.save( 'factura-detalle', obj );
  }
  async delDetalle( id ) {
    return await super.delete( 'factura-detalle', id );
  }
}

export default new ApiFacturacion();