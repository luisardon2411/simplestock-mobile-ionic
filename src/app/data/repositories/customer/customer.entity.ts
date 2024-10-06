export interface CustomerEntity{
    customerNit: string;
    aliasOfCustomer?: string;
    nameCustomer: string;
    addressCustomer?: string;
    phoneCustomer?: string;
    occupationCustomer?: string;
    contactCustomer?: string;
    cellphoneCustomer?: string;
    emailCustomer?: string;
    userCreated?: string;
    dateCreated?: Date;
    userUpdated?: string;
    dateUpdated?: Date;
    customerStatus?: number;
}