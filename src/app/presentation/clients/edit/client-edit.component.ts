// clients-edit.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomerImplementationRepository } from '../../../data/repositories/customer/customer-implementation.repository';
import { CustomerRepository } from 'src/app/domain/repositories/customer.repository';
import { CustomerModule } from '../../../data/repositories/customer/customer.module';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthenticationService } from '../../../services/authentication.service';
import AuthModel from 'src/app/domain/models/auth.model';

@Component({
    selector: 'app-clients-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CustomerModule
    ]
})
export class ClientsEditComponent implements OnInit {

    form!: FormGroup;
    searchForm!: FormGroup;
    user: AuthModel | null = this.authService.currentUser();

    constructor(
        private fb: FormBuilder, 
        @Inject(CustomerRepository) private customerImplementationRepository: CustomerImplementationRepository,
        private loadingService: LoadingService,
        private alertService: AlertService,
        private authService: AuthenticationService,
    ) {}

    ngOnInit(): void {
        this.createForm();
        this.createSearchForm();
    }

    createForm(): void {
        this.form = this.fb.group({
            nit: ['', Validators.required],
            alias: ['', Validators.required],
            name: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            occupation: ['', Validators.required],
            contact: ['', Validators.required],
            cellphone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    createSearchForm(): void {
        this.searchForm = this.fb.group({
            customerId: ['', Validators.required],
        });
    }

    onSearch(): void {
        const customerId = this.searchForm.get('customerId')?.value;
        if (this.searchForm.valid) {
            this.loadingService.presentLoading('Buscando cliente...');
            this.customerImplementationRepository.getCustomerById({ id: customerId })
                .subscribe({
                    next: customer => {
                        this.alertService.showAlert('Cliente encontrado', 'El cliente ha sido cargado correctamente.');
                        this.form.patchValue(customer);
                    },
                    error: () => {
                        this.loadingService.dismissLoading();
                        this.alertService.showAlert('Error', 'No se ha encontrado el cliente.');
                    },
                    complete: () => {
                        this.loadingService.dismissLoading();
                    },
                });
        }
    }

    onSubmit(): void {
        const body = {
            nit: this.form.get('nit')?.value,
            alias: this.form.get('alias')?.value,
            name: this.form.get('name')?.value,
            address: this.form.get('address')?.value,
            phone: this.form.get('phone')?.value,
            occupation: this.form.get('occupation')?.value,
            contact: this.form.get('contact')?.value,
            cellphone: this.form.get('cellphone')?.value,
            email: this.form.get('email')?.value,
            userUpdated: this.user?.authenticated.username
        }

        if (this.form.valid) {
            const id: string = this.searchForm.get('customerId')?.value;
            this.loadingService.presentLoading('Actualizando cliente...');
            this.customerImplementationRepository.updateCustomer({ customer: body })
                .subscribe({
                    next: response => {
                        this.alertService.showAlert('Cliente actualizado');
                    },
                    error: () => {
                        this.alertService.showAlert('Error', 'No se ha podido actualizar el cliente.');
                        this.loadingService.dismissLoading();
                    },
                    complete: () => {
                        this.loadingService.dismissLoading();
                    },
                });
        }
    }
}
