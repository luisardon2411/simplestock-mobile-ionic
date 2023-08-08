import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthenticationModule } from './data/authentication.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, AuthenticationModule],
})
export class AppComponent {
  constructor() {}
}
