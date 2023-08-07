export interface AuthEntity {
    authenticated: AuthPayloadEntity,
    token: string,
}

interface AuthPayloadEntity {
    username: string;
    name: string;
    lastName: string;
    roles: AuthRoleEntity[];
}

interface AuthRoleEntity {
    idRol: number;
    nameRol: string;
}