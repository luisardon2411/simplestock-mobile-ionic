import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { InputComponent } from "../components/Input/input.component";
import { ButtonComponent } from "../components/Button/button.component";
import { Router, RouterLink } from "@angular/router";
import { patternValidator } from "../../utils/regex-validation";
import { LoadingService } from "../../services/loading.service";
import { AuthImplementationRepository } from "../../data/repositories/auth/auth-implementation.repository";
import { AuthRepository } from "../../domain/repositories/auth.repository";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
})
export class LoginComponent implements OnInit {
    rememberMe: boolean = false;

    private userValidation = [{ regex:/^[a-zA-Z]+\.[a-zA-Z]+$/, message: 'usuario no válido' }]
    
    form!: FormGroup;

    constructor(
       private fb: FormBuilder, 
       @Inject(AuthRepository) private authImplementation: AuthImplementationRepository,
       private loadingService: LoadingService,
       @Inject(Router) private router: Router
    ){
      this.createForm();
    }
    ngOnInit(): void {
        document.title = 'Iniciar sesión';
    }
    private createForm(){
        this.form = this.fb.group({
            username: ['', [Validators.required, patternValidator(this.userValidation)]],
            password: ['', [Validators.required]]
        })
    }
    async NgSubmit() {
        if( !this.form.valid ) return;
        try {
        await this.loadingService.presentLoading('Iniciando sesión');
        const credentials = {
            username: this.form.value.username,
            password: this.form.value.password
        }
        this.authImplementation.login(credentials).subscribe({
            next: e => {
                localStorage.setItem('token', e.token);
                this.router.navigateByUrl('/dashboard');
            },
            complete: () => {}
        })
        } catch(error) {
        }finally{
          await this.loadingService.dismissLoading();
        }
    }
    saveRememberMe(){
        this.rememberMe = !this.rememberMe;
    }
}

