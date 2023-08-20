import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { DropdownComponent } from "../../components/Dropdown/dropdown.component";
import { CommonModule } from "@angular/common";
import { WrapperCommonComponent } from "../wrapper-common/wrapper-common.component";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    standalone: true,
    imports: [IonicModule, RouterLink, RouterLinkActive, DropdownComponent, CommonModule, WrapperCommonComponent]
})
export class DashboardComponent implements OnInit {

    public dropdowns: Array<any> = [
        {
            title: 'Clientes',
            icon: 'fa-solid fa-user',
            items: [
                {
                    subtitle: 'Agregar cliente',
                    icon: 'fa-solid fa-plus',
                },
                {
                    subtitle: 'Modificar cliente',
                    icon: 'fa-solid fa-pen',
                },
                {
                    subtitle: 'Eliminar cliente',
                    icon: 'fa-solid fa-trash',
                }
            ]
        },
        {
            title: 'Proveedores',
            icon: 'fa-solid fa-users',
            items: [
                {
                    subtitle: 'Agregar proveedor',
                    icon: 'fa-solid fa-plus',
                },
                {
                    subtitle: 'Modificar proveedor',
                    icon: 'fa-solid fa-pen',
                },
                {
                    subtitle: 'Eliminar proveedor',
                    icon: 'fa-solid fa-trash',
                }
            ]
        },
        {
            title: 'Productos',
            icon: 'fa-solid fa-boxes-stacked',
            items: [
                {
                    subtitle: 'Agregar producto',
                    icon: 'fa-solid fa-plus',
                },
                {
                    subtitle: 'Modificar producto',
                    icon: 'fa-solid fa-pen',
                },
                {
                    subtitle: 'Eliminar producto',
                    icon: 'fa-solid fa-trash',
                }
            ]
        }
    ]
    public services: Array<any> = [
        {
            title: 'Ventas',
            icon: 'fa-solid fa-cart-shopping',
            items: [
                {
                    subtitle: 'Registrar venta',
                    icon: 'fa-solid fa-plus',
                    link: '/sales/register'
                }
            ],
        },
        {
            title: 'Sucursales',
            icon: 'fa-solid fa-store',
            items: [
                {
                    subtitle: 'Nueva sucursal',
                    icon: 'fa-solid fa-plus',

                },
                {
                    subtitle: 'Modificar sucursal',
                    icon: 'fa-solid fa-pen',

                },
                {
                    subtitle: 'Eliminar sucursal',
                    icon: 'fa-solid fa-trash',
                }
            ]
        }
    ]
    public menuType: string = 'overlay'
    ngOnInit(): void {
        document.title = 'dashboard'
    }
}