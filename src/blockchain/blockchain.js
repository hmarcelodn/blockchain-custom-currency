import { Block } from './block';
import validator from './modules/validator';
import { MemoryPool } from './memoryPool';

export class Blockchain {
    constructor() {
        this.blocks = [Block.genesis];
        this.memoryPool = new MemoryPool();
    }

    addBlock(data) {
        const previousBlock = this.blocks[this.blocks.length - 1];
        const block = Block.mine(previousBlock, data);
        this.blocks.push(block);

        return block;
    }

    replace(newBlocks = []) {
        if (newBlocks.length < this.blocks.length) throw Error('Received chain is not lenger than current blockchain');
        try {
            validator(newBlocks);
        } catch(error) {
            throw Error('Received chain is invalid')
        }

        this.blocks = newBlocks;
    }
}