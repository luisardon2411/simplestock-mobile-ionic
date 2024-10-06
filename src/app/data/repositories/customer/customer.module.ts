import { NgModule } from "@angular/core";
import { CustomerRepository } from "src/app/domain/repositories/customer.repository";
import { GetCustomerUseCase } from "src/app/domain/uses-cases/customer/get-customer.usecase";
import { CustomerImplementationRepository } from "./customer-implementation.repository";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AuthInterceptor } from "src/app/interceptors/http-auth-interceptor.interceptor";

const getCustomerUseCaseFactory = 
( customerRepo: CustomerRepository ) => new GetCustomerUseCase( customerRepo )
export const GetCustomerUseCaseProvider = {
    provide: GetCustomerUseCase,
    useFactory: getCustomerUseCaseFactory,
    deps: [CustomerRepository]
}

@NgModule({
    providers: [
        GetCustomerUseCaseProvider,
        {
            provide: CustomerRepository, useClass: CustomerImplementationRepository
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
    ],
    imports: [
        HttpClientModule,
        CommonModule
    ],
})
export class CustomerModule{}