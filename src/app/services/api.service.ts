import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, timeout } from "rxjs";

@Injectable()
export class ApiService{
    private apiUrl: string = 'https://localhost:7153/api.simplestock.core';

    constructor( private http: HttpClient) { }

    async get(url: string): Promise<any> {
        const response = await firstValueFrom(this.http.get(`${this.apiUrl}/${url}`).pipe(timeout(5000)));
        return response;
    }

    async post(url: string, body: any): Promise<any> {
        const response = await firstValueFrom(this.http.post(`${this.apiUrl}/${url}`, body).pipe(timeout(5000)));
        return response;
    }

    async put(url: string, body: any): Promise<any> {
        const response = await firstValueFrom(this.http.put(`${this.apiUrl}/${url}`, body).pipe(timeout(5000)));
        return response;
    }
}
