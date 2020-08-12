import { INITIAL_BALANCE, Wallet } from './wallet';

describe('Wallet', () => {

    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
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
});
