import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomValidationDirective } from "./directives/validation.directive";

@NgModule({
    declarations: [
        CustomValidationDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CustomValidationDirective
    ],
})
export class SharedModule{}