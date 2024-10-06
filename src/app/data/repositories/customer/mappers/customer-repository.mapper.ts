import { Mapper } from "src/app/base";
import { CustomerEntity } from "../customer.entity";
import { CustomerModel } from "src/app/domain/models/customer";

export class CustomerRepositoryMapper extends Mapper<CustomerEntity, CustomerModel>{

    override mapFrom(param: CustomerEntity): CustomerModel {
        return {
            nit: param.customerNit,
            alias: param.aliasOfCustomer,
            name: param.nameCustomer,
            address: param.addressCustomer,
            phone: param.phoneCustomer,
            occupation: param.occupationCustomer,
            contact: param.contactCustomer,
            cellphone: param.cellphoneCustomer,
            email: param.emailCustomer,
            userCreated: param.userCreated,
            userUpdated: param.userUpdated,
            dateCreated: param.dateCreated,
            dateUpdated: param.dateUpdated,
            active: param.customerStatus
        }
    }

    override mapTo(param: CustomerModel): CustomerEntity{
        return {
            customerNit: param.nit,
            aliasOfCustomer: param.alias,
            nameCustomer: param.name,
            addressCustomer: param.address,
            phoneCustomer: param.phone,
            occupationCustomer: param.occupation,
            contactCustomer: param.contact,
            cellphoneCustomer: param.cellphone,
            emailCustomer: param.email,
            userCreated: param.userCreated,
            userUpdated: param.userUpdated,
            dateCreated: param.dateCreated,
            dateUpdated: param.dateUpdated,
            customerStatus: param.active
        }
    }
}