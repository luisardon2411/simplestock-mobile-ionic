import { Component, Inject, Input } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { patternValidator } from '../../../utils/regex-validation';
import { Subscription } from "rxjs";
import { InputComponent } from "../../components/Input/input.component";
import { ButtonComponent } from "../../components/Button/button.component";
import { ForgotPasswordRepositoryImplementation } from '../../../data/repositories/auth/forgot-password-implementation.repository';
import { ForgotPasswordRepository } from '../../../domain/repositories/forgot-password.repository';
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { LoadingService } from "src/app/services/loading.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        InputComponent,
        ButtonComponent,
        NgIf
    ],
})
export class NewPasswordComponent {

    @Input() username: string = '';

    public passwordStrength: number = 0;
    public passwordMessage: string = 'Débil';
    public passwordColor: string = 'danger';
    private subscription?: Subscription;
    private passwordValidation = [{ regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{10,}$/, message: '' }]
    public _form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        @Inject(ForgotPasswordRepository)
        private forgotPasswordImplementation: ForgotPasswordRepositoryImplementation,
        private router: Router,
        private loadingService: LoadingService,
        private alertService: AlertService,
    ) {
        this._form  = this.fb.group({
            password: ['', [patternValidator(this.passwordValidation)]],
        });
        this.subscription = this._form.get('password')?.valueChanges.subscribe((value) => {
            this.updatePasswordStrength(value);
        })
    }
    public passwordCriteria = {
        hasUpperCase: false,
        hasLowerCase: false,
        hasDigit: false,
        hasSpecialChar: false,
        isLengthValid: false,
    }
    updatePasswordStrength(password: string) {
        this.passwordCriteria.hasUpperCase = /[A-Z]/.test(password);
        this.passwordCriteria.hasLowerCase = /[a-z]/.test(password);
        this.passwordCriteria.hasDigit = /\d/.test(password);
        this.passwordCriteria.hasSpecialChar = /[!@#$%&*.?]/.test(password);
        this.passwordCriteria.isLengthValid = password.length >= 10;

        let score = Object.values(this.passwordCriteria).filter(Boolean).length;
    
        this.passwordStrength = score / 5;
    
        if (score <= 2) {
            this.passwordMessage = 'Débil';
            this.passwordColor = 'danger';
        } else if (score <= 3) {
            this.passwordMessage = 'Moderada';
            this.passwordColor = 'warning';
        } else {
            this.passwordMessage = 'Fuerte';
            this.passwordColor = 'success';
        }
    }
    
    getFirstPasswordFeedback(): string | null {
        if (!this.passwordCriteria.hasUpperCase) {
            return 'Debe contener al menos una letra mayúscula.';
        }
        if (!this.passwordCriteria.hasLowerCase) {
            return 'Debe contener al menos una letra minúscula.';
        }
        if (!this.passwordCriteria.hasDigit) {
            return 'Debe contener al menos un número.';
        }
        if (!this.passwordCriteria.hasSpecialChar) {
            return 'Debe contener al menos un caracter especial (ej: !, @, #, $, .)';
        }
        if (!this.passwordCriteria.isLengthValid) {
            return 'Debe tener una longitud de al menos 10 caracteres.';
        }
        return null;
    }
    
    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    NgSubmit(){
        if( !this._form.valid ) return;
        this.loadingService.presentLoading('Cambiando contraseña, por favor espere');
        setTimeout( () => {
            this.forgotPasswordImplementation.changePassword({ username: this.username, password: this._form.get('password')?.value })
            .subscribe({
                next: response => {
                    this.alertService.showAlert('Su contraseña ha sido cambiada con éxito, por favor inicie sesión con su nueva contraseña', 'Contraseña cambiada', ['Aceptar']);
                },
                complete: () => {
                    this.loadingService.dismissLoading();
                    this.router.navigateByUrl('/login');
                }
            })
        }, 2000);
    }
}