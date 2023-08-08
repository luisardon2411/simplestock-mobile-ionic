import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class AlertService{
    constructor(private alertController: AlertController){}

    async showAlert(message: string, header: string = 'Atención', buttons: any[] = ['Aceptar']){
        const alert = await this.alertController.create({
            header: header,
            message: `${message}`,
            buttons: buttons,
            cssClass: 'custom-alert',
            mode: 'ios'
        });
        await alert.present();
    }
}