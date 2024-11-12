import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { VentaComponent } from './componentes/venta/venta.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent,
        title:"Home"
    },
    {
        path:"prod",
        component: ProductoComponent,
        title:"Producto"
    },
    {
        path:"cliente",
        component: ClienteComponent,
        title:"Cliente"
    },
    {
        path:"categoria",
        component: CategoriaComponent,
        title:"Categoria"
    },
    {
        path:"venta",
        component: VentaComponent,
        title:"Venta"
    },
    {
        path:"**",
        redirectTo:"",
        pathMatch:"full"
    }
];
