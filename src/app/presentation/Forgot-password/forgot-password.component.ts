import { Component, Inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { InputComponent } from "../components/Input/input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../components/Button/button.component";
import { RouterLink } from "@angular/router";
import { patternValidator } from "../../utils/regex-validation";
import { ForgotPasswordRepository } from "src/app/domain/repositories/forgot-password.repository";
import { ForgotPasswordRepositoryImplementation } from "src/app/data/repositories/auth/forgot-password-implementation.repository";
import { LoadingService } from "src/app/services/loading.service";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    standalone: true,
    imports: [IonicModule, InputComponent, ButtonComponent, ReactiveFormsModule, RouterLink],
})
export class ForgotPasswordComponent{
    private userValidation = [{ regex:/^[a-zA-Z]+\.[a-zA-Z]+$/, message: 'usuario no válido' }]
    _form!: FormGroup;
    constructor
    (
    private fb: FormBuilder, 
    @Inject(ForgotPasswordRepository) private forgotPasswordImplementation: ForgotPasswordRepositoryImplementation ,
    private loadingService: LoadingService
    )
    {
        this.createForm();
    }
    private createForm(){
        this._form = this.fb.group({
            username: ['', [Validators.required, patternValidator(this.userValidation)]],
        })
    }
    async NgSubmit(){
        if(!this._form.valid) return;
        try {
            await this.loadingService.presentLoading('Enviado codigo');
            const credential = {
                username: this._form.value.username,
            }
            this.forgotPasswordImplementation.sendCodeTwoFactor(credential)
            .subscribe(console.log);
        } finally {
            await this.loadingService.dismissLoading();
        }
    }
}