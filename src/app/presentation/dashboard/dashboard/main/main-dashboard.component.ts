import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular';
import { DigitalClockComponent } from 'src/app/presentation/components/digital-clock/digital-clock.component';
import { GreetingComponent } from 'src/app/presentation/components/greeting/greeting.component';
import { CardsDashboardComponent } from '../cards-dashboard/cards-dashboard.component';
import { LineChartComponent } from 'src/app/presentation/components/charts/linechart.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import AuthModel from 'src/app/domain/models/auth.model';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: ['./main-dashboard.component.scss'],
    standalone: true,
    imports: [
        IonicModule, 
        DigitalClockComponent, 
        GreetingComponent,
        CardsDashboardComponent,
        LineChartComponent
    ]
})
export class MainDashboardComponent{
    
    user: AuthModel | null = this.authenticationService.currentUser();

    constructor( private authenticationService: AuthenticationService ){}

    getFirstName(): string {
        if( !this.user) return '';
        return this.user.authenticated.name.split(' ')[0];
    }
}