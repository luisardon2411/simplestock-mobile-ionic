import { Observable } from "rxjs";

export interface UseCase<S, T>{
    execute(state: S): Observable<T>;
}