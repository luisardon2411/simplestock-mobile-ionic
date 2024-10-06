// clients-add.component.ts
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
    selector: 'app-clients-add',
    templateUrl: './clients-add.component.html',
    styleUrls: ['./clients-add.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CustomerModule
    ]
})
export class ClientsAddComponent implements OnInit {

    form!: FormGroup;
    user: AuthModel | null = this.authService.currentUser();

    constructor(
        private fb: FormBuilder, 
        @Inject( CustomerRepository ) private customerImplementationRepository :CustomerImplementationRepository,
        private loadingService: LoadingService,
        private alertService: AlertService,
        private authService: AuthenticationService
        ) {}

    ngOnInit(): void {
        this.createForm();
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
            userCreated: this.user?.authenticated.username
        }

        if (this.form.valid) {
            this.loadingService.presentLoading('Creando cliente...');
            this.customerImplementationRepository.createCustomer({ customer: body })
            .subscribe({
                next: response => {
                    this.alertService.showAlert('Cliente creado', response.respuesta);
                }
                ,
                complete: () => {
                    this.loadingService.dismissLoading();
                    this.form.reset();
                }
            })
        }
    }
}
