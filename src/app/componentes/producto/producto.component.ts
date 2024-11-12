import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule, NavbarComponent],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  visible: boolean = false; 
  isDeleteInProgress: boolean = false;
  producto = new Producto();
  titulo: string = '';
  opc: string = '';
  op = 0; 
  selectedCategoria: Categoria | undefined;

  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarProductos();
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
      console.log(this.categorias);
    });
  }

  listarProductos() {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  showDialogCreate() {
    this.titulo = "Crear Producto";
    this.opc = "Save";   
    this.op = 0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  showDialogEdit(id: number) {
    this.titulo = "Editar Producto";
    this.opc = "Editar"; 
    this.productoService.getProductoById(id).subscribe((data) => {
      this.producto = data; 
      this.op = 1;     
    });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  deleteProducto(id: number) {
    this.isDeleteInProgress = true;
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Producto eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarProductos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto',
        });
      },
    });
  }

  addProducto(): void {
    this.productoService.createProducto(this.producto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Producto registrado',
        });
        this.listarProductos();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el producto',
        });
      },
    });    
    this.visible = false;
  }

  editProducto() {
    this.productoService.updateProducto(this.producto, this.producto.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Producto editado',
        });
        this.listarProductos();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el producto',
        });
      },
    });    
    this.visible = false;
  }

  opcion(): void {
    if (this.op == 0) {
      this.addProducto();
    } else if (this.op == 1) {
      this.editProducto();
    }
    this.limpiar();
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0; 
    this.producto.id = 0;
    this.producto.nombre = '';
    this.producto.categoria;
  }
}
