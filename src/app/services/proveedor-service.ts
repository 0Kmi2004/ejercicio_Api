import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(
    public httpClient: HttpClient
    ) {
      console.log('Hola Proveedor');

    }

    obtenerDatos(){
      return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
    }
  
}
