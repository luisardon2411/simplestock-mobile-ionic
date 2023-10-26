import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import AuthModel from "src/app/domain/models/auth.model";
import { AuthRepository } from "src/app/domain/repositories/auth.repository";
import { AuthImplementationRepositoryMapper } from './mappers/auth-repository.mapper';

/**
 * 
 * @description
 * This class is the implementation of the AuthRepository interface.
 * 
 * @implements AuthRepository
 * 
 * @see AuthRepository
 * @see AuthImplementationRepositoryMapper
 */

@Injectable({
    providedIn: 'root'
})
export class AuthImplementationRepository extends AuthRepository{
    private apiUrl: string = 'https://localhost:7153/api.simplestock.core'
    authMapper = new AuthImplementationRepositoryMapper();
    constructor(private http: HttpClient){
        super();
    }
    login(params: { username: string; password: string; }): Observable<AuthModel> {
        return this.http.post<AuthModel>(`${this.apiUrl}/authentication`, params)
        .pipe( map(this.authMapper.mapFrom) );
    }
    persistSession(): Observable<AuthModel>{
        return this.http.get<AuthModel>(`${this.apiUrl}/authenticatedUser`)
        .pipe( map(this.authMapper.mapFrom) );
    }
}