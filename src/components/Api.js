import ApiAuth from './login/ApiAuth';
const apiAuth = new ApiAuth(); 

export default class Api {
  constructor() {
    this.SERVER_URL = 'http://127.0.0.1:8000/rest/v1/'
    this.TOKEN_URL = this.SERVER_URL + 'token/'
    /*this.USUARIO = 'dummy'
    this.PASSWORD = '9pass3word'
    this.credenciales = { 'username' : this.USUARIO, 'password': this.PASSWORD}*/
  }

  async getToken() {
    /*const res = await fetch (
      this.TOKEN_URL, {
        method : 'POST',
        body : JSON.stringify( this.credenciales ),
        mode : 'cors',
        headers : {
          'Content-Type' : 'application/json'
        }
      }
    )
  
    if ( !res.ok ) {
      throw new Error( res.status );
    }
  
    const token = await res.json();*/

    const token = await apiAuth.getToken();
    return token;
  }

  async get( nombre, id ) {
    const token = await this.getToken();
    let url = this.SERVER_URL + nombre + '/';
    if (id !== -1) url += id + '/';

    const res = await fetch (
      url, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + token.access
        }
      }
    );

    if ( !res.ok ) {
      throw new Error( res.status );
    }

    const items = await res.json();
    console.log(items);
    return items; 
  }

  async save ( nombre, obj ) {
    const token = await this.getToken();
    let url = this.SERVER_URL + nombre + '/';
    let method = 'POST';
    if ( obj.id !== -1 ) {
      url += obj.id + '/';
      method = 'PUT';
    }

    const res = await fetch (
      url, {
        method : method,
        body: JSON.stringify( obj ),
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + token.access
        }
      }
    );

    if ( !res.ok ) {
      throw new Error( res.status );
    }

    const item = await res.json();
    return item;
  }

  async delete( nombre, id ) {
    const token = await this.getToken();
    let url = this.SERVER_URL + nombre + '/' + id + '/';
    
    const res = await fetch (
      url, {
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + token.access
        }
      }
    )

    if ( !res.ok ) {
      throw new Error( res.status );
    }
  }

}