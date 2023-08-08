import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    modal!: HTMLIonModalElement
    constructor( public modalController: ModalController ){}
}