import { Cliente } from "./cliente";
import { Producto } from "./producto";

export class Venta {
    id:number;
    cantidad:number;
    cliente:Cliente;
    producto:Producto;
    constructor(id:number=0,cantidad:number=0,cliente:Cliente=new Cliente(),producto:Producto=new Producto()){
        this.id=id;
        this.cantidad=cantidad;
        this.cliente=cliente;
        this.producto=producto;
    }
}
