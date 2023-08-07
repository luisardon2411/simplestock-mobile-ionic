import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { ForgotPasswordModel } from "../../models/forgot-password.model";
import { ForgotPasswordRepository } from "../../repositories/forgot-password.repository";

export class VerifyCodeTwoFactorUseCase implements UseCase<{ code: string; username: string }, ForgotPasswordModel>{
    constructor( private forgotPasswordRepository: ForgotPasswordRepository ){}
    execute(state: { code: string; username: string }): Observable<ForgotPasswordModel> {
        return this.forgotPasswordRepository.verifyCodeTwoFactor(state);
    }
}