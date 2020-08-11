import { Block } from './block';
import validator from './modules/validator';

export class Blockchain {
    constructor() {
        this.blocks = [Block.genesis];
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