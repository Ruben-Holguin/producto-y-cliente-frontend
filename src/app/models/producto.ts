import { Categoria } from "./categoria";

export class Producto {
  id: number;
  nombre: string;
  categoria: Categoria;
  constructor(id: number = 0, nombre: string = '', categoria:Categoria=new Categoria()) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
  }
}
