import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    standalone: true,
    imports: [IonicModule, NgClass]
})
export class ButtonComponent {
    @Input() text: string = '';
    @Input() type: 'submit' | 'reset' | 'button' = 'submit'
    @Input() disabled: boolean = false;
    @Output() click = new EventEmitter<HTMLButtonElement>();

    constructor() { }

    onClick(){
        this.click.emit();
    }
}