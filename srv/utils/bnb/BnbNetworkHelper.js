const TESTNET = 97;
const MAINNET = 56;
const AbstractNetworkHelper = require('../AbstractNetworkHelper');
class BnbNetworkHelper extends AbstractNetworkHelper{
    static getMainnet(){
        return MAINNET;
    }

    static getTestnet(){
        return TESTNET;
    }

}

module.exports = BnbNetworkHelper;