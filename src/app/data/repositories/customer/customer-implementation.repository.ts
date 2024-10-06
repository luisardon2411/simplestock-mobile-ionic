import { Injectable } from "@angular/core";
import { CustomerRepository } from "src/app/domain/repositories/customer.repository";
import { CustomerRepositoryMapper } from "./mappers/customer-repository.mapper";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { CustomerModel } from "src/app/domain/models/customer";
import { CustomerEntity } from "./customer.entity";


@Injectable({
    providedIn: 'root'
})
export class CustomerImplementationRepository extends CustomerRepository {

    private apiUrl: string = 'https://localhost:7153/api.simplestock.core'
    customerMapper = new CustomerRepositoryMapper();

    constructor(private http: HttpClient){
        super();
    }

    override getCustomers(): Observable<CustomerModel[]> {
        return this.http.post<CustomerEntity[]>(`${this.apiUrl}/getCustomers`, {})
        .pipe(
            map(entities => entities.map(this.customerMapper.mapFrom))
        );
    }
    override getCustomerById(param: { id: string; }): Observable<CustomerModel> {
        return this.http.post<CustomerEntity>(`${this.apiUrl}/findCustomerByPk`, { customerNit: param.id })
        .pipe(
            map(this.customerMapper.mapFrom)
        );
    }
    override createCustomer(param: { customer: CustomerModel; }): Observable<{ respuesta: string }> {
        return this.http.post<{ respuesta: string }>(`${this.apiUrl}/createCustomer`, this.customerMapper.mapTo(param.customer))
        .pipe();
    }
    override updateCustomer(param: { customer: CustomerModel; }): Observable<CustomerModel> {
        return this.http.put<CustomerEntity>(`${this.apiUrl}/updateCustomer`, this.customerMapper.mapTo(param.customer))
        .pipe(
            map(this.customerMapper.mapFrom)
        );
    }
    override deleteCustomer(param: { id: string; userUpdated: string; }): Observable<{ respuesta: string; }> {
        return this.http.post<{ respuesta: string }>(`${this.apiUrl}/inactiveCustomer`, { customerNit: param.id, userUpdated: param.userUpdated } )
        .pipe();
    }
}