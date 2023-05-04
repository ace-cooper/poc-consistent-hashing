import { Database } from "./database";

Database.addNode({ id: 'node1' });
Database.addNode({ id: 'node2' });
Database.addNode({ id: 'node3' });
Database.addNode({ id: 'node4' });

const key = 'testKey';
const nodeForKey = Database.getNodeForKey(key);

console.log(`Key "${key}" is mapped to Node "${nodeForKey?.id}"`, Database.hash(key));