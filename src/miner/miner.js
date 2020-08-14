import { Transaction, blockchainWallet } from '../wallet';
import { MESSAGE } from '../service/p2p';

export class Miner {
    constructor(blockchain, p2pService, wallet) {
        this.blockchain = blockchain;
        this.p2pService = p2pService;
        this.wallet = wallet;
    }

    mine() {
        const {
            blockchain: { memoryPool },
            wallet,
            p2pService,
        } = this;

        if (memoryPool.transactions.length === 0) throw Error('There are no unconfirmed transactions');

        /**
         * 1. Include reward to miner in transaction
         * 2. Create a block with all transactions in the pool
         * 3. Sync new blockchain with the network
         * 4. Wipe transaction from memory pool
         * 5. Broadcast wipe message to every node
         */
        memoryPool.transactions.push(Transaction.reward(wallet, blockchainWallet));
        const block = this.blockchain.addBlock(memoryPool.transactions);
        p2pService.sync();
        memoryPool.wipe();
        p2pService.broadcast(MESSAGE.WIPE);

        return block;
    }
}