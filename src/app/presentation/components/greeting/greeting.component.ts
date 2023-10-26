import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Subscription, interval } from "rxjs";

@Component({
    selector: 'app-greeting',
    templateUrl: './greeting.component.html',
    styleUrls: ['./greeting.component.scss'],
    standalone: true,
    imports: [IonicModule]
})
export class GreetingComponent implements OnInit, OnDestroy {

    @Input() user: string = '';
    saludo: string = '';
    tip: string = '';
    subscription!: Subscription;
    // tips
    tips = [
        'Revisa las estadísticas regularmente para mantener tu inventario siempre optimizado.',
        'Un vistazo rápido a los dashboards te ayudará a tomar decisiones informadas sobre tu inventario.',
        'Analiza las tendencias de inventario y ajusta tus estrategias de stock accordingly.',
        'Con la información a tu alcance, gestionar tu inventario nunca ha sido tan fácil.',
        'Recuerda registrar todas las entradas y salidas de inventario para mantener la precisión del sistema.',
    ];
    getCurrentTime( hour: number, user: string ){
        const time = [
            { range: [1,2,3,4,5,6,7,8,9,10,11], greeting: `Buenos días, ${ user }` },
            { range: [12,13,14,15,16,17,18], greeting: `Buenas tardes, ${ user }` },
            { range: [19,20,21,22,23,0], greeting: `Buenas noches, ${ user }` }
        ]
        const match = time.find( ({ range }) => range.includes(hour) );
        if( !match){
            return `Bienvenido, ${ user } `;
        }
        return match.greeting;
    }

    seleccionarTip(): string {
        const indice = Math.floor(Math.random() * this.tips.length);
        return this.tips[indice];
    }

    ngOnInit(): void {

        const observable = interval(1000);
        this.subscription = observable.subscribe( () => {
            this.saludo = this.getCurrentTime( new Date().getHours(), this.user );
        });

        this.tip = this.seleccionarTip();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}