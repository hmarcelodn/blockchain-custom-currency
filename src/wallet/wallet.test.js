import { INITIAL_BALANCE, Wallet } from './wallet';
import { Blockchain } from '../blockchain/blockchain';

describe('Wallet', () => {

    let wallet;
    let blockchain = new Blockchain();

    beforeEach(() => {
        blockchain = new Blockchain();
        wallet = new Wallet(blockchain);
    })

    it('it is a healthy wallet', () => {
        expect(wallet.balance).toEqual(INITIAL_BALANCE);
        expect(typeof wallet.keyPair).toEqual('object');
        expect(typeof wallet.publicKey).toEqual('string');
        expect(wallet.publicKey.length).toEqual(130);
    });

    it('use sign()', () => {
        const signature = wallet.sign('h3110');
        expect(typeof signature).toEqual('object');
        expect(signature).toEqual(wallet.sign('h3110'));
    });

    describe(('creating a transaction'), () => {
        let tx;
        let recipientAddress;
        let amount;

        beforeEach(() => {
            recipientAddress = 'random-address';
            amount = 5;
            tx = wallet.createTransaction(recipientAddress, amount);
        });

        describe(('and doing the same transaction'), () => {
            beforeEach(() => {
                tx = wallet.createTransaction(recipientAddress, amount);
            });

            it('double the `amount` subtracted from the wallet balance', () => {
                const output = tx.outputs.find(({ address }) =>  address === wallet.publicKey);
                expect(output.amount).toEqual(wallet.balance - (amount * 2));
            });

            it('clones the `amount` output for the recipient', () => {
                const amounts = tx.outputs
                    .filter(({ address }) => address === recipientAddress)
                    .map(output => output.amount);

                expect(amounts).toEqual([amount, amount]);
            });
        });
    });
});
