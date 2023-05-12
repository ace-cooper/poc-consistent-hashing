import { PrismaClient } from '@prisma/client';
import { getCtx } from './context';
import { ulid } from 'ulid';

export namespace Database {

    export const genId = (seedTime?: number) => ulid(seedTime);

    export const createDBM = () => new PrismaClient()

    export const getDBM = () => getCtx()?.get("dbm") as PrismaClient;

    export const withDBM = async (block: (dbm: PrismaClient) => any) => {
        const ctx = getCtx();
        const dbm = ctx?.get("dbm");
        if (dbm) {
        return block(dbm);
        } else {
        const dbm = createDBM();
        
        await dbm.$connect();

        ctx.set("dbm", dbm);
        
        try {
            return await block(ctx.get('dbm'));
        } catch (e) {
            console.log(e);
        } finally {
            await dbm.$disconnect();
        }
        }
    };

    export async function withTransaction(block) {
        const ctx = getCtx();
        const dbm = ctx?.get("dbm") as PrismaClient;
        if (!dbm) {
            throw new Error("Transaction Error: The context must has a db manager");
        }

        const transaction = ctx.get("transaction");

        if (transaction) {
        return await block(transaction);
        } else {
        return await dbm.$transaction(async (transaction) => {

            ctx.set("transaction", transaction);
            try {
            return await block(transaction);
            } catch(e) {
            console.log(e)
            } finally {
            ctx.set("transaction", null);
            }
        })
        }
    }

    export const getCurrentTransaction = () => getCtx()?.get("transaction");

    export const getCurrentDBMX = () => (getCurrentTransaction() || getDBM())  as PrismaClient;

    export const getCtxModels = () => getCtx()?.get('dbm')?.models;

}