import { Blockchain } from './blockchain';
import { Block } from './block';
import validator from './modules/validator';

describe('Blockchain', () => {
    let blockchain;
    let blockchain2;

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('every blockchain has a genesis blockchain', () => {
        const [genesisblock] = blockchain.blocks;

        expect(genesisblock).toEqual(Block.genesis);
        expect(blockchain.blocks.length).toEqual(1);
    });

    it('use addBlock', () => {
        const data = 'data';
        blockchain.addBlock(data);

        const [, lastBlock] = blockchain.blocks;
        expect(lastBlock.data).toEqual(data);
        expect(blockchain.blocks.length).toEqual(2);
    });

    it('replaces the chain with a valid chain', () => {
        blockchain2.addBlock('block-1');
        blockchain.replace(blockchain2.blocks);

        expect(blockchain.blocks.length).toBe(blockchain2.blocks.length);
    });

    it('does not replace the chain with one with less blocks', () => {
        blockchain.addBlock('data');

        expect(() => {
            blockchain.replace(blockchain2.blocks);
        }).toThrowError();
    });

    it('does not replace the chain with one with invalid blocks', () => {
        blockchain2.addBlock('data');
        blockchain2.blocks[1].hash = 'hack';

        expect(() => {
            blockchain.replace(blockchain2.blocks);
        }).toThrowError();
    });
});