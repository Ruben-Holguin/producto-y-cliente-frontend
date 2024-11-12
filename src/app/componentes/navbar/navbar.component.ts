import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {label: 'inicio',icon: 'pi pi-home',route: '/a'},
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Categoria',
                        route: '/categoria'
                    },
                    {
                        label: 'Producto',
                        route: '/prod'
                    },
                    {
                        label: 'Cliente',
                        route: '/cliente'
                    },
                    {
                        label: 'Venta',
                        route: '/venta'
                    }
                ]
            },
            {
                label: 'Programmatic',
                icon: 'pi pi-link',
                command: () => {
                    this.router.navigate(['/installation']);
                }
            }
        ];
    }
}
