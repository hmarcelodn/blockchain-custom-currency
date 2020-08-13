export class Miner {
    constructor(blockchain, p2pService, wallet) {
        this.blockchain = blockchain;
        this.p2pService = p2pService;
        this.wallet = wallet;
    }

    mine() {
        const {
            blockchain: { memoryPool }
        } = this;
        /**
         * 1. Include reward to miner in transaction
         * 2. Create a block with all transactions in the pool
         * 3. Sync new blockchain with the network
         * 4. Wipe transaction from memory pool
         * 5. Broadcast wipe message to every node
         */
    }
}