import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHandlerService } from "../services/error-handle.service";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private errorHandlerService: ErrorHandlerService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => this.errorHandlerService.handleHttpError(error))
            })
        )
    }
}