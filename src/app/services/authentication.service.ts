import { signal, inject, Injectable } from '@angular/core';
import AuthModel from "../domain/models/auth.model";
import { AuthImplementationRepository } from '../data/repositories/auth/auth-implementation.repository';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private _currentUser = signal<AuthModel | null >(null);
    private _stateAuthentication = signal<boolean>(false);
    private _authImplementationRepository: AuthImplementationRepository = inject(AuthImplementationRepository);
}