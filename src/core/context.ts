import {createNamespace, getNamespace} from 'cls-hooked';
const callContextLocalStorage = createNamespace('main');

export type Ctx = {
    [key: string]: any;
  };
  

export const withCtx = async <R>(
    ctx: any,
    block: (ctx: Ctx) => R
  ): Promise<R> => {
  const localCtx = { ...ctx };

  return new Promise(async resolve => callContextLocalStorage.run(async (data) => {
    for (const key in localCtx) {
        data.set(key, localCtx[key]);
    }
    resolve(await block(localCtx));
  }));
};

export const getCtx = (name = 'main') => getNamespace(name);
