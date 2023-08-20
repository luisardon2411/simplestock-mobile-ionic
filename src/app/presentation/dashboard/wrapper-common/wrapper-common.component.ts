import { Component, Renderer2 } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: "app-wrapper-common",
    templateUrl: "./wrapper-common.component.html",
    styleUrls: ["./wrapper-common.component.scss"],
    standalone: true,
    imports: [IonicModule]
})
export class WrapperCommonComponent{
    
    constructor( private renderer: Renderer2 ){}

    onScroll(event: any) {
        if (event.detail.scrollTop > 0) {
            this.renderer.addClass(document.querySelector('.blurred-header'), 'active-blur');
        } else {
            this.renderer.removeClass(document.querySelector('.blurred-header'), 'active-blur');
        }
    }
}