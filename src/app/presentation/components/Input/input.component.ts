import { CommonModule } from "@angular/common";
import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ValidationService } from "src/app/services/custom-validation.service";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    standalone: true,
    imports: [IonicModule, CommonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => InputComponent ),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    @Input() type: 'text' | 'number' | 'password' = 'text';
    @Input() placeholder: string = '';
    @Input() set errorMessage(errors: ValidationErrors | null | undefined){
        this._errors = this.customValidation.getValidationErrorMessage(errors);
    }
    isDisabled: boolean = false;
    private _value: any = '';
    _errors: string = '';
    touched: boolean = false;
    get value(): any {
        return this._value;
    }
    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }
    constructor(private customValidation: ValidationService){}
    // Implementar los métodos de ControlValueAccessor
    onChange: any = () => {};
    onTouch: any = () => {
        this.touched = true;
    }
    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = () => {
            this.touched = true;
            fn();
        }
    }

    setDisabledState(isDisabled: boolean): void {
        // Tu lógica para habilitar/deshabilitar el componente
    }

    updateValue(event: Event) {
        this.value = ((event.target as HTMLInputElement).value) 
    }
}