import { AbstractControl, ValidatorFn } from "@angular/forms";

export function patternValidator(patternObj: { regex: RegExp, message: string }[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      for(const pattern of patternObj){
        if(!pattern.regex.test(control.value)){
          return { 'pattern': { message: pattern.message } } }
        }
        return null;
      }
};