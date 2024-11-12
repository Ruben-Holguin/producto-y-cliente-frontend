import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Cliente } from '../../models/cliente';
import { Producto } from '../../models/producto';
import { Venta } from '../../models/venta';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';
import { VentaService } from '../../services/venta.service';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [NavbarComponent,TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  ventas: Venta[] = [];
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  venta = new Venta();
  titulo: string = '';
  opc: string = '';
  op = 0; 
  selectedCliente: Cliente | undefined;
  selectedProducto: Producto | undefined;

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarClientes();
    this.listarProductos();
    this.listarVentas();
  }

  listarClientes() {
    this.clienteService.getClientes().subscribe((data) => {
        this.clientes = data;
        console.log(this.clientes);
    });
  }

  listarProductos() {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
    });
  }

  listarVentas() {
    this.ventaService.getVentas().subscribe((data) => {
      this.ventas = data;
    });
  }

  showDialogCreate() {
    this.titulo = "Crear venta";
    this.opc = "Save";   
    this.op = 0;
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = "Editar venta";
    this.opc = "Editar"; 
    this.ventaService.getVentaById(id).subscribe((data) => {
      this.venta = data; 
      this.op = 1;     
    });    
    this.visible = true;
  }

  deleteVenta(id: number) {
    this.isDeleteInProgress = true;
    this.ventaService.deleteVenta(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'venta eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarVentas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el venta',
        });
      },
    });
  }

  opcion() {
    if (this.op == 0) {
      this.addVenta();
      this.limpiar();
    } else if (this.op == 1) {
      this.editVenta();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  addVenta() {
    this.ventaService.createVenta(this.venta).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'venta Registrada',
        });
        this.listarVentas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear la venta',
        });
      },
    });    
    this.visible = false;
  }

  editVenta() {
    this.ventaService.updateVenta(this.venta, this.venta.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'venta Editada',
        });
        this.listarVentas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la venta',
        });
      },
    });    
    this.visible = false;
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0; 
    this.venta.id = 0;
    this.venta.cliente;
    this.venta.producto;
    this.venta.cantidad = 0;
  }
}
