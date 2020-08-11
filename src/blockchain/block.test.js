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

        expect(block.hash.length).toEqual(64);
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(block.data).toEqual(data);
    });

    it('use static hash()', () => {
        hash = Block.hash(timestamp, previousBlock.hash, data, nonce);

        expect(hash).toEqual('85a72cca0cbc22697fee66999738c12ea15cbcb1e9d7ba13b6ff4adf4d2e18c6');
    });

    it('use toString()', () => {
        const block = Block.mine(previousBlock, data);

        expect(typeof block.toString()).toEqual('string');
    })
});