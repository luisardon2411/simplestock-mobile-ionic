import { Observable } from "rxjs";
import { CustomerModel } from "../../models/customer";
import { CustomerRepository } from "../../repositories/customer.repository";
import { UseCase } from "../../base/use-case";

export class GetCustomerUseCase implements UseCase<{}, CustomerModel[]> {
    constructor( private customerRepository: CustomerRepository ){}

    execute(): Observable<CustomerModel[]>{
        return this.customerRepository.getCustomers();
    }
}