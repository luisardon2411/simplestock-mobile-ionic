import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import AuthModel from "../../models/auth.model";
import { AuthRepository } from "../../repositories/auth.repository";

export class UserLoginUseCase implements UseCase<{ username: string, password: string },AuthModel>{
    constructor(private authRepository: AuthRepository) {}
    execute(state: { username: string; password: string; }): Observable<AuthModel> {
        return this.authRepository.login(state);
    }
}