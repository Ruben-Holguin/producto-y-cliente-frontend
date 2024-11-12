export class Cliente {
  id: number;
  nombres: string;
  apellidos: string;
  constructor(id: number = 0, nombres: string = '', apellidos: string = '') {
      this.id = id;
      this.nombres = nombres;
      this.apellidos = apellidos;
  }
}
  