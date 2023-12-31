import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";


export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./dashboard/main/main-dashboard.component').then( m => m.MainDashboardComponent ),
            },
            // {
            //     path: 'clients',
            // }
            {
                path: 'clientes',
                loadChildren: () => import('../clients/clients.routes').then( m => m.routes )
            }
        ]
    },
    {
        path: 'dashboard',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }

]