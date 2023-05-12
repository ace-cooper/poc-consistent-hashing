import * as index from '../../src';

const _exports: any = {};
console.log(index)
for (let key in index) {
    _exports[key] = {};

    for (let method in index[key]) {
        
        _exports[key][method] = {};

        for (let subMethod in index[key][method]) {
            _exports[key][method][subMethod] = async (...args: any[]) => {
                const result = await index[key][method][subMethod](...args);
                return result;
            }
        }
        
    }
}

export default _exports;