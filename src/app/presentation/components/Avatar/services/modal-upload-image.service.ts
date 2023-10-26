import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ImageUploadComponent } from "../../image-upload/image-upload.component";

@Injectable({
    providedIn: 'root'
})
export class ModalUploadImageService {

    modal!: HTMLIonModalElement

    constructor( private modalController: ModalController ){}

    async openImageUploadModal() {
        this.modal = await this.modalController.create({
            component: ImageUploadComponent,
            cssClass: 'modal-upload-image'
        });
        return await this.modal.present();
    }


    closeModal(){
        this.modalController.dismiss();
    }

}