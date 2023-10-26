import { Component, ElementRef, Inject, Input, NgZone, OnInit, QueryList, ViewChildren } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../components/Button/button.component";
import { InputCodeRefModule } from "../shared/input-code-ref.module";
import { ForgotPasswordRepositoryImplementation } from "src/app/data/repositories/auth/forgot-password-implementation.repository";
import { ForgotPasswordRepository } from "src/app/domain/repositories/forgot-password.repository";
import { LoadingService } from "src/app/services/loading.service";
import { NewPasswordComponent } from "../new-password/new-password.component";
import { AlertService } from "src/app/services/alert.service";

@Component({
    selector: 'app-verify-code',
    templateUrl: './verify-code.component.html',
    standalone: true,
    imports: [
        IonicModule, 
        ButtonComponent, 
        ReactiveFormsModule, 
        NgFor, 
        InputCodeRefModule, 
        NgIf,
        NewPasswordComponent,
        NgClass
    ],
})
export class VerifyCodeComponent implements OnInit {
    @Input() username: string = '';
    @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;
    codes: Array<string> = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'];
    isValidCode: boolean = false;
    timer: number = 60;
    allowResend: boolean = false;
    intervalId?: number;
    public _form: FormGroup = this.fb.group({
        code1: ['', [Validators.required,]],
        code2: ['', [Validators.required,]],
        code3: ['', [Validators.required,]],
        code4: ['', [Validators.required,]],
        code5: ['', [Validators.required,]],
        code6: ['', [Validators.required,]],
    });
    constructor( private fb: FormBuilder, 
    @Inject(ForgotPasswordRepository) 
    private forgotPassImplentation: ForgotPasswordRepositoryImplementation,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private ngZone: NgZone ){}

    startTimer() {
        this.allowResend = false;
        this.timer = 60;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = window.setInterval(() => {
            this.ngZone.run(() => {
                this.timer--;
                if(this.timer === 0){
                    this.allowResend = true;
                    clearInterval(this.intervalId)
                }
            });
        }, 1000);
    }
    // Validar que solo se ingresen números
    onlyNumber(event: KeyboardEvent) {
        if (!(/[0-9]/.test(event.key))) {
          event.preventDefault();
        }
      }
      // Mover el foco al siguiente input
      moveFocus(event: KeyboardEvent, currentIndex: number) {
        const inputElements = this.codeInputs.toArray();
        const currentInput = inputElements[currentIndex].nativeElement as HTMLInputElement;
    
        if (event.key === 'Backspace' && !currentInput.value && currentIndex > 0) {
            const prevInput = inputElements[currentIndex - 1].nativeElement as HTMLInputElement;
            prevInput.focus();
        } else if (currentInput.value && /[0-9]/.test(currentInput.value) && currentIndex < inputElements.length - 1) {
            const nextInput = inputElements[currentIndex + 1].nativeElement as HTMLInputElement;
            nextInput.focus();
        }
    }

    private codeUnify(){
        const code1 = this._form.value.code1;
        const code2 = this._form.value.code2;
        const code3 = this._form.value.code3;
        const code4 = this._form.value.code4;
        const code5 = this._form.value.code5;
        const code6 = this._form.value.code6;
        const code = code1 + code2 + code3 + code4 + code5 + code6;
        return code;
    }

    NgSubmit(){
        if(!this._form.valid) return;
        this.loadingService.presentLoading('Verificando código...');
        setTimeout( () => {
            this.forgotPassImplentation.verifyCodeTwoFactor({ code: this.codeUnify(), username: this.username }).subscribe({
                next: response => {
                    this.isValidCode = true;
                    this.loadingService.dismissLoading();
                },
                complete: () => {
                },
                error: err => {
                    this.loadingService.dismissLoading();
                }
            })
        },2000)
    }

    resendCodeTwoFactor(){
        this.loadingService.presentLoading('Reenviando el codigo');
        this.forgotPassImplentation.sendCodeTwoFactor({ username: this.username })
        .subscribe({
            next: response => {
                this.loadingService.dismissLoading();
                this.alertService.showAlert('Se envio un nuevo codigo a tu correo', 'Reenvio de código',['Ok'])
                this.startTimer();
            }
        })
    }


    ngOnInit(): void {
        this.startTimer();
    }

}