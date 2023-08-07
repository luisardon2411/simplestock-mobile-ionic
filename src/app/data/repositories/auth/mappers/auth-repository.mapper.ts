import { Mapper } from "src/app/base";
import { AuthEntity } from "../auth.entity";
import AuthModel from "src/app/domain/models/auth.model";

export class AuthImplementationRepositoryMapper extends Mapper<AuthEntity, AuthModel>{
    override mapFrom(param: AuthEntity): AuthModel {
        return {
            authenticated: param.authenticated,
            token: param.token,
        }
    }
    override mapTo(param: AuthModel): AuthEntity {
        return {
            authenticated: param.authenticated,
            token: param.token,
        }
    }

}