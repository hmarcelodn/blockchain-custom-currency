import { Block } from './src/blockchain/block';

const genesis = Block.genesis;
const block1 = Block.mine(genesis, 'data-1');
const block2 = Block.mine(block1, 'data-2');

console.log(block1.toString());
console.log(block2.toString());
