import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    getValidationErrorMessage(errors: ValidationErrors | null | undefined): string {
        if( !errors ) return '';
        const err = Object.keys(errors);
        if( err.includes('required') ) return 'El campo es requerido';
        if( err.includes('minlength') ) return `El campo debe tener al menos ${errors['minlength'].requiredLength}`
        if( err.includes('maxlength') ) return `El campo debe tener menos de ${errors['maxlength'].requiredLength}`
        if( err.includes('pattern') ) return `${errors['pattern'].message}`
        return '' 
    }
}