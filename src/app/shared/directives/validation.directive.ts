import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

@Directive({
    selector: '[customValidation]',
})
export class CustomValidationDirective implements OnInit {

    private htmlElemet?: ElementRef<HTMLElement> = this.elementRef
    private _errors?: ValidationErrors | null;

    @Input() set errors(value: ValidationErrors | null | undefined) {
        this._errors = value;
        this.setErrorMessage();
    }

    constructor(private elementRef: ElementRef) {
        console.log(elementRef);
    }

    ngOnInit(): void {
    }

    setErrorMessage(): void {
        if(!this.htmlElemet) return;
        if(!this._errors){
            this.htmlElemet.nativeElement.innerText = '';
            return;
        }
        const errors = Object.keys(this._errors);
        
        if( errors.includes('required') ){
            this.htmlElemet.nativeElement.innerText = 'El campo es requerido';
            return;
        }
    } 
}