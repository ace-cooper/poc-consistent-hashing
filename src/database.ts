import * as crypto from 'crypto';

export namespace Database {

    const hashRing: Map<number, Node> = new Map();

    export interface Node {
        id: string;
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
    
    export const getNodeForKey = (key: string): Node | null => {
        if (hashRing.size === 0) {
            return null;
        }

        const keyHash = hash(key);
        const positions = Array.from(hashRing.keys());
        positions.sort((a, b) => a - b);

        for (const position of positions) {
            if (keyHash <= position) {
            return hashRing.get(position)!;
            }
        }

        return hashRing.get(positions[0])!;
    }

}