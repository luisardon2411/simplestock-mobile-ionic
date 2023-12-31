import { Component, Inject, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { InputComponent } from "../components/Input/input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../components/Button/button.component";
import { RouterLink } from "@angular/router";
import { patternValidator } from "../../utils/regex-validation";
import { ForgotPasswordRepository } from "src/app/domain/repositories/forgot-password.repository";
import { ForgotPasswordRepositoryImplementation } from "src/app/data/repositories/auth/forgot-password-implementation.repository";
import { LoadingService } from "src/app/services/loading.service";
import { CommonModule } from "@angular/common";
import { VerifyCodeComponent } from "./verify-code/verify-code.component";
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationModule } from '../../data/authentication.module';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    standalone: true,
    imports: 
    [
        IonicModule, 
        InputComponent, 
        ButtonComponent, 
        ReactiveFormsModule, 
        RouterLink,
        CommonModule,
        VerifyCodeComponent,
        AuthenticationModule
    ],
})
export class ForgotPasswordComponent implements OnInit {
    private userValidation = [{ regex:/^[a-zA-Z]+\.[a-zA-Z]+$/, message: 'usuario no válido' }]
    isSendCode: boolean = false;
    _form!: FormGroup;
    constructor
    (
    private fb: FormBuilder, 
    @Inject(ForgotPasswordRepository) private forgotPasswordImplementation: ForgotPasswordRepositoryImplementation ,
    private loadingService: LoadingService,
    private alertService: AlertService,
    )
    {
        this.createForm();
    }
    private createForm(){
        this._form = this.fb.group({
            username: ['', [Validators.required, patternValidator(this.userValidation)]],
        })
    }
    ngOnInit(): void {
        document.title = 'Recuperar contraseña';
    }
    async NgSubmit(){
        if(!this._form.valid) return;
        try {
            await this.loadingService.presentLoading('Enviado codigo');
            const credential = {
                username: this._form.value.username,
            }
            this.forgotPasswordImplementation.sendCodeTwoFactor(credential)
            .subscribe({
                next: (data) => {
                    this.loadingService.dismissLoading();
                    this.isSendCode = true;
                    this.alertService.showAlert('Ingresa el codigo que se te envio a tu correo electrónico', 'Codigo enviado', ['Entendido'])
                },
                complete: () => {
                },
                error: (error) => {
                    this.loadingService.dismissLoading();
                }
            });
        } catch (error) {
        }
    }
}