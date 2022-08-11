import { PlumoVerifier } from 'plumo-verifier';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { PLUMO_RPC_API } from './constants';

export default class Plumo {
    plumo;
    web3;
    logger = {
        debug: (...args) => console.debug(...args),
        info: (...args) => console.info(...args),
        warn: (...args) => console.warn(...args),
        error: (...args) => console.error(...args),
    };
    
    constructor() {
        // we setup a web3 instance using the plumo rpc stated in the docs
        const web3 = new Web3(PLUMO_RPC_API)
        const kit = newKitFromWeb3(web3);

        // create a plumo instance
        this.plumo = new PlumoVerifier(this.logger, kit.web3.eth, Buffer);
        this.web3 = web3;
    }

    getWeb3Client() {
        return this.web3;
    }

    /*
        fetchCeloBalanceVerified can also fetch balances of erc20 tokens
        for simplicity we wrapped this function so it only needs to accept an address
    */
    fetchCeloBalance(address) {
        return this.plumo.fetchCeloBalanceVerified(address);
    }
}