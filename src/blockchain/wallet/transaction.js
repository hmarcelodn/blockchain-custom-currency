import { v1 as uuidV1 } from 'uuid';

export class Transaction {
    constructor() {
        this.id = uuidV1();
        this.input = null;
        this.outputs = [];
    }

    static create(senderWallet, recipientAddress, amount) {
        const { balance, publicKey } = senderWallet;

        if (amount > balance) throw Error(`Amount: ${amount} exceeds balance.`);

        const transaction = new Transaction();
        transaction.outputs.push(...[
            { amount: balance - amount, address: publicKey },
            { amount, address: recipientAddress }
        ])

        return transaction;
    }
}