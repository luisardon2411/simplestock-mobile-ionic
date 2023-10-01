import { Observable } from "rxjs";
import { ForgotPasswordModel } from "../models/forgot-password.model";

export abstract class ForgotPasswordRepository{
    abstract sendCodeTwoFactor(param: { username: string }): Observable<ForgotPasswordModel>
    abstract verifyCodeTwoFactor(param: { code: string; username: string }): Observable<ForgotPasswordModel>
    abstract changePassword( param: { username: string; password: string } ): Observable<ForgotPasswordModel>
}