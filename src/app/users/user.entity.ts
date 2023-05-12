import { Prisma } from "@prisma/client";
import { Database } from "../../core/database";

export class UserEntity extends Database.BaseEntity implements Prisma.UserEntityCreateInput {
    name!: string;
    username!: string;
    password: string;
    isHotUser?: boolean;

    static get repo() {
        return Database.getDBM().userEntity;
    }
}