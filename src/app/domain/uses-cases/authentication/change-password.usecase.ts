import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { ForgotPasswordModel } from "../../models/forgot-password.model";
import { ForgotPasswordRepository } from "../../repositories/forgot-password.repository";

export class ChangePasswordUseCase implements UseCase<{ username: string }, ForgotPasswordModel>{
    constructor( private forgotPasswordRepository: ForgotPasswordRepository ){}
    execute(state: { username: string; }): Observable<ForgotPasswordModel> {
        return this.forgotPasswordRepository.changePassword(state);
    }
}