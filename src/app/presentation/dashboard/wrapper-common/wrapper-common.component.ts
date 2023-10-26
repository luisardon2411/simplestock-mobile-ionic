import { Component, OnInit, Renderer2 } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import AuthModel from "src/app/domain/models/auth.model";
import { AuthenticationService } from "src/app/services/authentication.service";


@Component({
    selector: "app-wrapper-common",
    templateUrl: "./wrapper-common.component.html",
    styleUrls: ["./wrapper-common.component.scss"],
    standalone: true,
    imports: [IonicModule]
})
export class WrapperCommonComponent implements OnInit {

    public user: AuthModel | null = null;

    constructor( 
        private renderer: Renderer2,
        private authenticationService: AuthenticationService
     ){}

    onScroll(event: any) {
        if (event.detail.scrollTop > 0) {
            this.renderer.addClass(document.querySelector('.blurred-header'), 'active-blur');
        } else {
            this.renderer.removeClass(document.querySelector('.blurred-header'), 'active-blur');
        }
    }

    ngOnInit(): void {
        this.user = this.authenticationService.currentUser();
        console.log(this.authenticationService.currentUser())
    }
}