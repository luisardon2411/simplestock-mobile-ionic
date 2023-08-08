import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class LoadingService{
    loading!: HTMLIonLoadingElement;
    constructor(public loadingController: LoadingController){}

    async presentLoading(message: string){
        this.loading = await this.loadingController.create({
            message: message,
            translucent: true,
            spinner: 'bubbles',
            cssClass: 'custom-loading',
        });
        return await this.loading.present();
    }
    async dismissLoading(){
        if(this.loading) await this.loading.dismiss()
    }
}