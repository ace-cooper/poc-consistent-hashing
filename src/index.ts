export { UserController as users } from './app/users/users.controller';

// import { exit } from "process";
// import { Database } from "./core/database";
// import { createInterface } from 'readline';

// const readline = createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// (async () => {
//     readline.question(`Write the hash key: `, async key => {
//         const nodeForKey = await Database.getNodeForKey(key);
        
//         console.log(`Key "${key}" is mapped to Node "${nodeForKey?.id}"`, Database.hash(key));
//         readline.close();
//         exit()
//     });
// }
// )();