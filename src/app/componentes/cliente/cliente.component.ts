import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [NavbarComponent,TableModule,ButtonModule,DialogModule,RouterModule,InputTextModule,FormsModule,ConfirmDialogModule,ToastModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clientes:Cliente[]=[];
  titulo:string='';
  opc:string='';
  cliente= new Cliente();
  op = 0; 
  visible: boolean = false; 
  isDeleteInProgress: boolean = false;
 
   constructor(
     private clienteService: ClienteService,
     private messageService: MessageService
   ){}
 
   ngOnInit():void{
     this.listarClientes();
   }
   listarClientes(){
     this.clienteService.getClientes().subscribe((data)=>{
       this.clientes=data;
     });
   }
   hola(id:number){
     console.log('button clicked '+id);
   }
   showDialogCreate() {
     this.titulo="Crear Cliente"
     this.opc="Save";   
     this.op=0;
     this.visible = true; // Cambia la visibilidad del diálogo
   }
   showDialogEdit(id:number) {
     this.titulo="Editar Cliente"
     this.opc="Editar"; 
    this.clienteService.getClienteById(id).subscribe((data)=>{
       this.cliente=data; 
       this.op=1;     
    });    
     this.visible = true; // Cambia la visibilidad del diálogo
   }
   deleteCliente(id: number) {
     this.isDeleteInProgress = true;
     this.clienteService.deleteCliente(id).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'error',
           summary: 'Correcto',
           detail: 'Cliente eliminado',
         });
         this.isDeleteInProgress = false;
         this.listarClientes();
       },
       error: () => {
         this.isDeleteInProgress = false;
         this.messageService.add({
           severity: 'error',
           summary: 'Error',
           detail: 'No se pudo eliminar el cliente',
         });
       },
     });
   }
   addCliente():void{ 
     this.clienteService.createCliente(this.cliente).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Correcto',
           detail: 'Cliente Registrado',
         });
         this.listarClientes();
         this.op=0;
       },
       error: () => {
         this.isDeleteInProgress = false;
         this.messageService.add({
           severity: 'error',
           summary: 'Error',
           detail: 'No se pudo Agregar el cliente',
         });
       },
     });    
     this.visible = false;
   }
   editCliente(){
     this.clienteService.updateCliente(this.cliente,this.cliente.id).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Correcto',
           detail: 'Cliente Editado',
         });
         this.listarClientes();
         console.log(this.cliente.id+' '+this.cliente.nombres+' '+this.cliente.apellidos+' ');
         this.op=0;
       },
       error: () => {
         this.isDeleteInProgress = false;
         this.messageService.add({
           severity: 'error',
           summary: 'Error',
           detail: 'No se pudo Editar el cliente',
         });
       },
     });    
     this.visible = false;
   }
   opcion():void{
     if(this.op==0){
       this.addCliente();
       this.limpiar();
     }else if(this.op==1){
       console.log("Editar");
       this.editCliente();
       this.limpiar();
     }else{
       console.log("No se hace nada");
       this.limpiar();
     }
     
   }
  limpiar(){
   this.titulo='';
   this.opc='';
   this.op = 0; 
   this.cliente.id=0;
   this.cliente.nombres='';
   this.cliente.apellidos='';
  }
}
