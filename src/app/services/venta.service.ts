import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl ='http://localhost:8080/api/ventas';

  constructor(private http:HttpClient) { }

  //listar las Venta
  getVentas():Observable<Venta[]>{
    return this.http.get<Venta[]>(this.apiUrl);
  }

  getVentaById(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  createVenta(Venta: Venta): Observable<Venta> {    
    return this.http.post<Venta>(this.apiUrl, Venta);
  }

  deleteVenta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateVenta(Venta:Venta, id:number): Observable<Venta>{
    return this.http.put<Venta>(`${this.apiUrl}/${id}`, Venta);
  }
}
