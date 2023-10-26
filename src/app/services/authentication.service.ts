import { signal, Injectable, computed, Inject } from '@angular/core';
import AuthModel from "../domain/models/auth.model";
import { AuthImplementationRepository } from '../data/repositories/auth/auth-implementation.repository';
import { AuthRepository } from '../domain/repositories/auth.repository';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private _currentUser = signal<AuthModel | null >(null);
    private _stateAuthentication = signal<boolean>(false);
    public currentUser = computed( () => this._currentUser() );
    private token: string = localStorage.getItem('token') || '';

    setCurrentUser( user: AuthModel | null ): void {
        this._currentUser.set( user );
    }

    constructor(){}

    // persistSession(): void {
    //     const headers = new HttpHeaders({
    //         'Authorization': `Bearer ${this.token}` 
    //     });
    //     this.http.get<AuthModel>('https://localhost:7153/api.simplestock.core/authenticatedUser',{ headers: headers })
    //     .pipe(
    //         tap(
    //             (user) => {
    //                 this._currentUser.set(user);
    //             }
    //         )
    //     )
    // }
}