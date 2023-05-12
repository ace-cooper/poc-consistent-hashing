import { Database } from "../../core/database";
import { UserEntity } from "./user.entity";

export namespace UserService {

    export const normalizeToCreate = (user: any) => ({
        id: Database.genId(),
        name: user.name,
        username: user.username,
        password: user.password,
        version: Database.genId()       
    });

    export const create = async (user: any) => {
        const normalizedUser = normalizeToCreate(user);
        return await UserEntity.repo.create({ data: normalizedUser });
    }

    export const findOne = async (id: string) => {
        return await UserEntity.repo.findUnique({ where: { id } });
    }
}