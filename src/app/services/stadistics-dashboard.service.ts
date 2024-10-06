import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class StadisticsDashboardService{

    constructor(private http: HttpClient){}

    getStadisticsDashboard(){
        return this.http.get('https://localhost:7153/api.simplestock.core/getStadisticsDashboard');
    }
}