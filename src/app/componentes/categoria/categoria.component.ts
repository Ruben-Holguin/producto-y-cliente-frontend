import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [TableModule, NavbarComponent, ButtonModule, DialogModule, RouterModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias: Categoria[] = [];
  titulo: string = '';
  opc: string = '';
  categoria = new Categoria();
  op = 0; 
  visible: boolean = false; 
  isDeleteInProgress: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  showDialogCreate() {
    this.titulo = "Crear Categoria";
    this.opc = "Save";   
    this.op = 0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  showDialogEdit(id: number) {
    this.titulo = "Editar Categoria";
    this.opc = "Editar"; 
    this.categoriaService.getCategoriaById(id).subscribe((data) => {
      this.categoria = data; 
      this.op = 1;     
    });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  deleteCategoria(id: number) {
    this.isDeleteInProgress = true;
    this.categoriaService.deleteCategoria(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Categoria eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarCategorias();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el categoria',
        });
      },
    });
  }

  addCategoria(): void {
    this.categoriaService.createCategoria(this.categoria).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Categoria registrado',
        });
        this.listarCategorias();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el Categoria',
        });
      },
    });    
    this.visible = false;
  }

  editCategoria() {
    this.categoriaService.updateCategoria(this.categoria, this.categoria.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Categoria editado',
        });
        this.listarCategorias();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la categoria',
        });
      },
    });    
    this.visible = false;
  }

  opcion(): void {
    if (this.op == 0) {
      this.addCategoria();
    } else if (this.op == 1) {
      this.editCategoria();
    }
    this.limpiar();
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0; 
    this.categoria.id = 0;
    this.categoria.nombre = '';
  }
}
