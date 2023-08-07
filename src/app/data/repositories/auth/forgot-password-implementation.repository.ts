import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ForgotPasswordModel } from "src/app/domain/models/forgot-password.model";
import { ForgotPasswordRepository } from "src/app/domain/repositories/forgot-password.repository";
import { ForgotPasswordRepositoryMapper } from './mappers/forgot-password-repository.mapper';


@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordRepositoryImplementation extends ForgotPasswordRepository {
    private forgotPasswordMapper = new ForgotPasswordRepositoryMapper();
    private apiUrl: string = 'https://localhost:7153/api.simplestock.core';
    constructor(private http: HttpClient){
        super();
    }
    override sendCodeTwoFactor(param: { username: string; }): Observable<ForgotPasswordModel> {
        return this.http.post<ForgotPasswordModel>(`${this.apiUrl}/sendCodeTwoFactor`, param)
        .pipe( map( this.forgotPasswordMapper.mapFrom ) )
    }
    override verifyCodeTwoFactor(param: { code: string; username: string; }): Observable<ForgotPasswordModel> {
        return this.http.post<ForgotPasswordModel>(`${ this.apiUrl }/verifyCodeTwoFactor`, param)
        .pipe( map( this.forgotPasswordMapper.mapFrom ) )
    }
    override changePassword(param: { username: string; }): Observable<ForgotPasswordModel> {
        return this.http.post<ForgotPasswordModel>(`${ this.apiUrl }/changePassword`, param)
        .pipe( map( this.forgotPasswordMapper.mapFrom ) )
    }

}