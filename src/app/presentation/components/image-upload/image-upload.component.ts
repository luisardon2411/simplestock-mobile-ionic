import { NgClass, NgIf } from "@angular/common";
import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { UploadImageCloudinaryService } from "../Avatar/services/upload-image-cloudinary.service";
import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { ButtonComponent } from "../Button/button.component";
import { ModalUploadImageService } from "../Avatar/services/modal-upload-image.service";

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        NgClass,
        HttpClientModule,
        ButtonComponent
    ],
    providers: [
        UploadImageCloudinaryService,
        HttpClient
    ]
})
export class ImageUploadComponent{

    @ViewChild('fileInput') fileInput!: ElementRef;
    @Output() imageUploaded = new EventEmitter<string>();

    imageUrl: string = '';
    loading: boolean = false;
    progress: number = 0;
    file!: File
    constructor(
        private uploadImageCloudinaryService: UploadImageCloudinaryService,
        private modalUploadImageService: ModalUploadImageService
    ){}

    dragOverEvent( ev: Event ): void {
        ev.preventDefault();
        ev.stopPropagation();
    }

    dragLeaveEvent( ev: Event ): void {
        ev.preventDefault();
        ev.stopPropagation();
    }

    dropEvent( ev: any ): void {
        ev.preventDefault();
        ev.stopPropagation();

        if (ev.dataTransfer.items && ev.dataTransfer.items.length > 0) {
            const file = ev.dataTransfer.items[0].getAsFile();
            this.handleFile(file);
        }
    }

    fileChangeEvent(event: any): void {
        const file = event.target.files[0];
        this.handleFile(file);
    }
    
    handleFile(file: File): void {
        if (file.type.match(/image\/*/) == null) {
          alert("Solo se admiten imágenes.");
          return;
        }
        this.file = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            this.imageUrl = (event.target as FileReader).result as string;
            this.loading = true;
            this.simulateUpload();
        };
    }
    uploadImage(): void {
        this.uploadImageCloudinaryService.uploadImage(this.file);
        this.modalUploadImageService.closeModal();
    }
    simulateUpload() {
        let interval = setInterval(() => {
            if (this.progress < 1) {
                this.progress += 0.1;
            } else {
                clearInterval(interval);
                this.loading = false;
            }
        }, 200);
    }
    
    openFileSelector(): void {
        this.fileInput.nativeElement.click();
    }
}