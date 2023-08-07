import { Mapper } from "src/app/base";
import { ForgotPasswordEntity } from "../forgot-password.entity";
import { ForgotPasswordModel } from "src/app/domain/models/forgot-password.model";

export class ForgotPasswordRepositoryMapper extends Mapper<ForgotPasswordEntity, ForgotPasswordModel >{
    override mapFrom(param: ForgotPasswordEntity): ForgotPasswordModel {
        return {
            status: param.status,
            response: param.response
        }
    }
    override mapTo(param: ForgotPasswordModel): ForgotPasswordEntity {
        return {
            status: param.status,
            response: param.response,
        }
    }
}