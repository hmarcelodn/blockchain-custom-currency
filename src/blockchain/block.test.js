import { Block, DIFFICULTY } from './block';

describe('Block', () => {
    let timestamp;
    let previousBlock;
    let data;
    let hash;
    let nonce;

    beforeEach(() => {
        timestamp = new Date(2010, 0, 1);
        previousBlock = Block.genesis;
        data = 'test-data';
        hash = 'h4s4';
        nonce = 128;
    });

    it('create an instance with parameters', () => {
        const block = new Block(timestamp, previousBlock.hash, hash, data, nonce);

        expect(block.timestamp).toEqual(timestamp);
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
    });

    it('use static mine()', () => {
        const block = Block.mine(previousBlock, data);
        const { difficulty } = block;

        expect(block.hash.length).toEqual(64);
        expect(block.hash.substring(0, difficulty)).toEqual('0'.repeat(difficulty));
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(block.data).toEqual(data);
    });

    it('use static hash()', () => {
        hash = Block.hash(timestamp, previousBlock.hash, data, nonce);

        expect(hash).toEqual('a66cabff32b23fa98dc84c5377638665c1b577112c73175bc559e50667b1a42f');
    });

    it('use toString()', () => {
        const block = Block.mine(previousBlock, data);

        expect(typeof block.toString()).toEqual('string');
    })
});