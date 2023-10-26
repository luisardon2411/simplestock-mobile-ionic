import { NgIf } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import AuthModel from "src/app/domain/models/auth.model";
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { ModalUploadImageService } from './services/modal-upload-image.service';

@Component({
    selector: "app-avatar",
    templateUrl: "./avatar.component.html",
    styleUrls: ["./avatar.component.scss"],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        HttpClientModule,
        ImageUploadComponent
    ]
})
export class AvatarComponent{
    defaultAvatar = "../../../../assets/images/default-profile.png"
    @Input() user!: AuthModel | null;
    @Input() avatarType!: 'sidebar' | 'header';
    @ViewChild('fileInput') fileInput!: ElementRef;
    hovering: boolean = false;

    nameLastname(): string {
        if(this.user) {
            const firstName = this.user.authenticated.name.split(' ')[0];
            const lastName = this.user.authenticated.lastName.split(' ')[0];
            return `${firstName} ${lastName}`;
        }
        return '';
    }

    constructor( 
        private modalUploadImageService:  ModalUploadImageService
     ){}

    triggerFileInput() {
        this.modalUploadImageService.openImageUploadModal();
    }
    
}