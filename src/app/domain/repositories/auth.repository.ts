import { Observable } from "rxjs";
import AuthModel from "../models/auth.model";

export abstract class AuthRepository{
    abstract login(params: { username: string, password: string }): Observable<AuthModel>
}