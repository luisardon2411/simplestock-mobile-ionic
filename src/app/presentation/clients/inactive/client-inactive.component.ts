import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CustomerImplementationRepository } from "src/app/data/repositories/customer/customer-implementation.repository";
import AuthModel from "src/app/domain/models/auth.model";
import { CustomerRepository } from "src/app/domain/repositories/customer.repository";
import { AlertService } from "src/app/services/alert.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { LoadingService } from "src/app/services/loading.service";
import { CustomerModule } from '../../../data/repositories/customer/customer.module';


@Component({
    selector: 'app-client-inactive',
    templateUrl: './client-inactive.component.html',
    styleUrls: ['./client-inactive.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CustomerModule
    ]

})
export class ClientInactiveCompoonet {
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
        if (this.form.valid) {
            const id: string = this.searchForm.get('customerId')?.value;
            const userUpdated = this.user?.authenticated.username;
            this.loadingService.presentLoading('Inhabilitando cliente...');
            this.customerImplementationRepository.deleteCustomer({ id, userUpdated: userUpdated as string })
                .subscribe({
                    next: response => {
                        this.alertService.showAlert(response.respuesta, 'Cliente inactivo');
                    },
                    error: (error) => {
                        this.alertService.showAlert('Error', error.respuesta);
                        this.loadingService.dismissLoading();
                    },
                    complete: () => {
                        this.loadingService.dismissLoading();
                    },
                });
        }
    }
}