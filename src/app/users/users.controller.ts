import { UserService } from "./user.service";

export namespace UserController {
    export namespace POST {
        export const create = async (user: any) => {
            return await UserService.create(user);
        }
    }

    export namespace GET {
        export const findOne = async (id: string) => {
            return await UserService.findById(id);
        }
    }
}