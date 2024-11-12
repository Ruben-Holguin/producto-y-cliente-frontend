import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl ='http://localhost:8080/api/clientes';

  constructor(private http:HttpClient) { }

  //listar las cliente
  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClienteById(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {    
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateCliente(cliente:Cliente, id:number): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }
}
