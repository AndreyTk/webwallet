const EthLib = require('../eth/EthLib');
//const PROVIDER_URL = require("../../isProduction")?process.env.PROD_BNB_PROVIDER_URL:process.env.DEV_BNB_PROVIDER_URL;
const PROVIDER_URL = process.env.BNB_PROVIDER_URL;
const buildProvider = require('../eth/ProviderBuilder');
const BnbNetworkHelper = require("./BnbNetworkHelper");
class BnbLib extends EthLib{
    constructor(app) {
        super(app);
        this.provider = buildProvider(PROVIDER_URL);
    }

    _getChainId(){
        return BnbNetworkHelper.getNetwork();
    }
}
module.exports = BnbLib;