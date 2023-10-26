import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLinkActive, RouterModule } from '@angular/router';
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    standalone: true,
    imports: [IonicModule, CommonModule, RouterModule],
    animations: [
        trigger('slideToggle', [
            state('open', style({ height: '*', opacity: 1 })),
            state('closed', style({ height: '0px', opacity: 0 })),
            transition('closed <=> open', [
              animate('200ms ease-in-out')
            ])
          ]),
        trigger('rotateArrow', [
            state('closed', style({ transform: 'rotate(270deg)' })),  
            state('open', style({ transform: 'rotate(360deg)' })),
            transition('closed <=> open', [
                animate('200ms ease-in-out')
            ])
        ])
    ]
})
export class DropdownComponent {
    @Input() title: string = '';
    @Input() icon: string = '';
    @Input() routerLinkActivate: string | string[] = '';
    @Input() route: string | string[] = '';
    isOpen = false;

    toggleDropdown(): void {
        this.isOpen = !this.isOpen;
    }
}