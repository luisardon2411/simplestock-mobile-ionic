import { Component, Inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DataTableComponent } from "../components/datatable/datatable.component";
import { CustomerModule } from '../../data/repositories/customer/customer.module';
import { CustomerImplementationRepository } from "src/app/data/repositories/customer/customer-implementation.repository";
import { CustomerModel } from '../../domain/models/customer';
import { CustomerRepository } from "src/app/domain/repositories/customer.repository";

@Component({
    selector: 'app-clients',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        DataTableComponent,
        CustomerModule
    ]

})
export class ClientComponent implements OnInit {

    rows: CustomerModel[] = [];

    columns: any = [
        'nit',
        'alias',
        'name',
        'address',
        'phone',
        'email',
        'occupation',
        'contact',
        'cellphone',
        'userCreated',
        'userUpdated',
        'dateCreated',
        'dateUpdated',
        'active'
    ]

    constructor( @Inject(CustomerRepository) private customerImplmentation: CustomerImplementationRepository ){}

    ngOnInit(): void  {
       this.getAllCustomers();
    }

    getAllCustomers(): void {
        this.customerImplmentation.getCustomers()
        .subscribe({
            next: customers => {
                this.rows = customers;
            },
            error: err => console.log(err)
        })
    }
}