import { Database } from "../../core/database";

export class UserEntity extends Database.BaseEntity {
    name!: string;
    username!: string;
    password?: string;
    isHotUser?: boolean;

    static get repo() {
        return Database.getDBM().userEntity;
    }
}