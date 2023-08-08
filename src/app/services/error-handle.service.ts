import { Injectable } from "@angular/core";
import { AlertService } from "./alert.service";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService{
    constructor(private alertservice: AlertService){}
    handleHttpError(error: any){
        let message = 'Ocurrió un error inesperado';
        switch(error.status){
            case  0:
                message = 'Ocurrio un error de conexión, verifica tu conexion o intenta más tarde';
                break;
            case 400:
                message = 'Petición incorrecta';
                break;
            case 401:
                message = 'No está autorizado';
                break;
            case 404:
                message = 'Recurso no encontrado';
                break;
            case 500:
                message = 'Ocurrión un error en el servidor';
                break;
        }
        if( error.error && error.error.response){
            // cuando el servidor devuelve un error personalizado
            message = error.error.response;
        }
        this.alertservice.showAlert(message)
    }
}