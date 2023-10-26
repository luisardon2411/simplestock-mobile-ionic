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
    }
]