
export default class AuthModel{
    public authenticated!: AuthPayloadModel
    public token!: string;
}

abstract class AuthPayloadModel{
    public username!: string;
    public name!: string;
    public lastName!: string;
    public roles!: RoleModel[];
}

abstract class RoleModel {
    public idRol!: number;
    public nameRol!: string;
}