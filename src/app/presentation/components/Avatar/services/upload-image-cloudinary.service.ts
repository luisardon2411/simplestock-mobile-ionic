import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import AuthModel from "src/app/domain/models/auth.model";
import { AlertService } from "src/app/services/alert.service";
import { AuthenticationService } from "src/app/services/authentication.service";


@Injectable({
    providedIn: "platform"
})
export class UploadImageCloudinaryService {

    readonly CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/luisardon/image/upload';
    readonly apiUrl: string = 'https://localhost:7153/api.simplestock.core/changePhotoProfile';
    readonly CLOUDINARY_UPLOAD_PRESET = 'simplestock';
    user: AuthModel | null = this.authenticationService.currentUser();

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { }

    uploadImage(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
        formData.append('cloud_name', 'luisardon');

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
            formData.append('cloud_name', 'luisardon');

            this.http.post<any>(this.CLOUDINARY_URL, formData).subscribe({
                next: (response) => {
                    this.user!.authenticated.photo = response.secure_url;
                    this.http.post<any>(this.apiUrl,
                        { username: this.user?.authenticated.username, secureUrl: response.secure_url })
                        .subscribe({
                            next: (response) => {
                                this.alertService.showAlert(`${response.respuesta}`, 'Éxito');
                            },
                            error: (error) => {
                                this.alertService.showAlert(`${error.error.respuesta}`, 'Error');
                            }
                        })
                },
                error: (error) => {
                    this.alertService.showAlert(`${error.error.respuesta}`, 'Error');
                }
            });
        }
    }
}