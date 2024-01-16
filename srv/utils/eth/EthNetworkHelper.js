const TESTNET = 11155111;
const MAINNET = 1;
const AbstractNetworkHelper = require('../AbstractNetworkHelper');
class EthNetworkHelper extends AbstractNetworkHelper{
    static getMainnet(){
        return MAINNET;
    }

    static getTestnet(){
        return TESTNET;
    }

}

module.exports = EthNetworkHelper;