import { Prisma, PrismaClient } from '@prisma/client';
import { getCtx } from './context';
import { ulid } from 'ulid';
import { Cache } from './cache';

export namespace Database {

    export const genId = (seedTime?: number) => ulid(seedTime);
    export const genVr = (seedTime?: number) => ulid(seedTime);

    export const createDBM = () => new PrismaClient()

    export const getDBM: () => PrismaClient = () => getCtx()?.get("dbm") as PrismaClient;

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

    export abstract class BaseEntity {
        protected static _repo;
        public static get repo(): any { throw new Error(`${this.name} must override repo getter`); }
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        deleted: boolean;
        version: string;
    }

    export class BaseService<T extends BaseEntity> {
        constructor(public readonly target: T) {}
      
        public get repository() {
          return this.target['repo'];
        }
      
        public async findById(id: string, bypassCache?: boolean): Promise<T> {
          try {
            if (!bypassCache) {
                const key = Cache.normalizeKey(this.target['name'], id);
                const cache = await Cache.getNodeForKey(key);

                if (cache) {
                    const data = await cache.client.get(key);
                    if (data) {
                        return JSON.parse(data);
                    }
                }
            }
          } catch (e) {
            console.log(e);
          }

          return this.repository.findUnique({
            where: {
              id,
            },
          });
        }

        public async create(data: Partial<T>): Promise<T> {
            const entity = await this.repository.create({ data });
            try {
                const key = Cache.normalizeKey(this.target['name'], entity.id);
                const cache = await Cache.getNodeForKey(key);
                await cache?.client.set(key, JSON.stringify(entity));
            } catch (e) {
                console.log(e);
            }
            return entity;
        }
      
      
        public async optimisticUpdate<U extends Partial<T | any>>(
          entity: T,
          data: Prisma.XOR<T, U>
        ): Promise<Prisma.BatchPayload> {
          data = {
            rowVersion: genVr(),
            updatedAt: new Date(),
            ...data,
          };

          const result: Prisma.BatchPayload = await this.repository.updateMany({
            where: {
              id: entity.id,
              version: entity.version,
            },
            data,
          });

          if (result.count > 0) {
            try {
                const key = Cache.normalizeKey(this.target['name'], entity.id);
                const cache = await Cache.getNodeForKey(key);
                const cacheEntity = JSON.parse(await cache?.client.get(key) || '{}');
                await cache?.client.set(key, JSON.stringify({
                    ...cacheEntity,
                    ...data
                }));
            } catch (e) {
                console.log(e);
            }
          }

          return result;
        }
      }

}