const {networks} = require("bitcoinjs-lib");
const testnet = networks.testnet;
const mainnet = networks.bitcoin;
const AbstractNetworkHelper = require('../AbstractNetworkHelper');
class BtcNetworkHelper extends AbstractNetworkHelper{
    static getMainnet(){
        return mainnet;
    }

    static getTestnet(){
        return testnet;
    }

}

module.exports = BtcNetworkHelper;