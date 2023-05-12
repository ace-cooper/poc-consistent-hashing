import * as crypto from 'crypto';
import { RedisClientType, createClient } from 'redis';
import { cacheAddresses } from './config';

export namespace Cache {
    const hashRing: Map<number, Node> = new Map();
    
    export interface Node {
        id: string;
        client: RedisClientType
    }

    export const hash = (value: string): number => {
        const hash = crypto.createHash('md5').update(value).digest('hex');
        return parseInt(hash.slice(0, 8), 16);
    }
    
    export const addNode = (node: Node): void => {
        const position = hash(node.id);
        hashRing.set(position, node);
    }
    
    export const removeNode = (node: Node): void => {
        const position = hash(node.id);
        hashRing.delete(position);
    }
    
    export const getNodeForKey = async (key: string): Promise<Node | null> => {
        if (hashRing.size === 0) {
            return null;
        }

        const keyHash = hash(key);
        const positions = Array.from(hashRing.keys());
        positions.sort((a, b) => a - b);
        let node: Node = hashRing.get(positions[0])!;

        for (const position of positions) {
            if (keyHash <= position) {
                node = hashRing.get(position)!
                break;
            }
        }

        if (!node.client.isOpen) {
            await node.client.connect();
        }

        return node;
    }

    for (const address of cacheAddresses) {
        Cache.addNode({ id: address, client: createClient(address) });
    }
}