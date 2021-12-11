import Api from '../Api';

class ApiInventario extends Api {
  constructor() {
    super();
  }
  /*** CATEGORIA ***/
  async getCategoria( id = -1 ) {
    return await super.get( 'categoria', id );
  }
  async saveCategoria( obj ) {
    return await super.save( 'categoria', obj );
  }
  async delCategoria( id ) {
    return await super.delete( 'categoria', id );
  }
  /*** SUBCATEGORIA ***/
  async getSubCategoria( id = -1 ) {
    return await super.get( 'subcategoria', id );
  }
  async saveSubCategoria( obj ) {
    return await super.save( 'subcategoria', obj );
  }
  async delSubCategoria( id ) {
    return await super.delete( 'subcategoria', id );
  }
  /*** PRODUCTO ***/
  async getProducto( id = -1 ) {
    return await super.get( 'producto', id );
  }
  async saveProducto( obj ) {
    return await super.save( 'producto', obj );
  }
  async delProducto( id ) {
    return await super.delete( 'producto', id );
  }
}

export default new ApiInventario();