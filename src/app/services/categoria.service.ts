import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl ='http://localhost:8080/api/categorias';

  constructor(private http:HttpClient) { }

  //listar las Categoria
  getCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getCategoriaById(id:number):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  createCategoria(Categoria: Categoria): Observable<Categoria> {    
    return this.http.post<Categoria>(this.apiUrl, Categoria);
  }

  deleteCategoria(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateCategoria(Categoria:Categoria, id:number): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, Categoria);
  }
}
