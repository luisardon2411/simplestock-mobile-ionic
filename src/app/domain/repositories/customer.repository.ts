import { Observable } from "rxjs";
import { CustomerModel } from "../models/customer";

export abstract class CustomerRepository {
    abstract getCustomers(): Observable<CustomerModel[]>;
    abstract getCustomerById(param: { id: string }): Observable<CustomerModel>;
    abstract createCustomer(param: { customer: CustomerModel }): Observable<{ respuesta: string; }>;
    abstract updateCustomer(param: { customer: CustomerModel }): Observable<CustomerModel>;
    abstract deleteCustomer(param: { id: string }): Observable<{ respuesta: string; }>;
}