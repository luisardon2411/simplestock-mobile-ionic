import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-digital-clock',
    templateUrl: './digital-clock.component.html',
    styleUrls: ['./digital-clock.component.scss'],
    standalone: true,
    imports: [IonicModule]
})
export class DigitalClockComponent implements OnInit {
    time: string = new Date().toLocaleTimeString();
    day: string = this.formatDay(new Date());
    date: string = this.formatDate(new Date());

    constructor() { }

    ngOnInit(): void {
        setInterval(() => {
            const now = new Date();
            this.time = now.toLocaleTimeString();
            this.day = this.formatDay(now);
        }, 1000);
    }

    formatDay(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
        };
        return date.toLocaleDateString('es-ES', options);
    }
    formatDate( date: Date ): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('es-ES', options);
    }
}
