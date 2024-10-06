import { Routes } from "@angular/router";
import { ClientComponent } from "./client.component";


export const routes: Routes = [
    {
        path: '',
        component: ClientComponent
    },
    {
        path: 'nuevo-cliente',
        loadComponent: () => import('./add/clients-add.component').then( m => m.ClientsAddComponent )
    },
    {
        path: 'modificar-cliente',
        loadComponent: () => import('./edit/client-edit.component').then( m => m.ClientsEditComponent )
    },
    {
        path: 'eliminar-cliente',
        loadComponent: () => import('./inactive/client-inactive.component').then( m => m.ClientInactiveCompoonet )
    }
]