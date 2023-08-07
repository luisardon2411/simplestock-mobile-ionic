import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { UserLoginUseCase } from "../domain/uses-cases/authentication/user-login.usecase";
import { AuthImplementationRepository } from "./repositories/auth/auth-implementation.repository";
import { HttpErrorInterceptor } from "../interceptors/http-error-interceptor.interceptor";
import { ForgotPasswordRepository } from "../domain/repositories/forgot-password.repository";
import { SendCodeTwoFactorUseCase } from "../domain/uses-cases/authentication/send-code.usecase";
import { ForgotPasswordRepositoryImplementation } from "./repositories/auth/forgot-password-implementation.repository";
// Declarations useCases Factory
const authLoginUseCaseFactory = 
 (AuthRepo: AuthRepository) => new UserLoginUseCase(AuthRepo)
 export const AuthLoginUseCaseProvider = {
    provide: UserLoginUseCase,
    useFactory: authLoginUseCaseFactory,
    deps: [AuthRepository]
 }
const sendCodeTwoFactorUseCaseFactory =
( forgotPasswordRepo: ForgotPasswordRepository ) => new SendCodeTwoFactorUseCase(forgotPasswordRepo);
export const SendCodeTwoFactorUseCaseProvider = {
    provide: SendCodeTwoFactorUseCase,
    useFactory: sendCodeTwoFactorUseCaseFactory,
    deps: [ForgotPasswordRepository]
}
//Module
@NgModule({
    providers: [
        AuthLoginUseCaseProvider,
        {
            provide: AuthRepository, useClass: AuthImplementationRepository
        },
        SendCodeTwoFactorUseCaseProvider,
        {
            provide: ForgotPasswordRepository, useClass: ForgotPasswordRepositoryImplementation
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
    ],
    imports: [
        HttpClientModule,
        CommonModule
    ],
})
export class AuthenticationModule{}