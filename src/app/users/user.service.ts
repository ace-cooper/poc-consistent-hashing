import { Database } from "../../core/database";
import { UserEntity } from "./user.entity";

export const UserService = new (class extends Database.BaseService<UserEntity> {
    public normalizeToCreate(user: any) {
        return {
            id: Database.genId(),
            name: user.name,
            username: user.username,
            password: user.password,
            version: Database.genVr()       
        }
    }

    public async create(user: any) {
        const normalizedUser = this.normalizeToCreate(user);
        return await super.create(normalizedUser);
    }

})(UserEntity as any);