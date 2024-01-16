const BtcLib = require('../btc/BtcLib')

const LtcValidator = require('../../validators/blockchain/LtcValidator');
const LtcConverter = require('../../helpers/LtcConverter');
const BlockcypherProvider = require('./LtcBlockcypherProvider');
const LtcNetworkHelper = require('./LtcNetworkHelper');
class LtcLib extends BtcLib{

    constructor(app) {
        let validator = new LtcValidator();
        let converter = new LtcConverter();
        let provider = new BlockcypherProvider(app,validator,converter);
        super(app);
        this.validator = validator;
        this.converter = converter;
        this.provider = provider;

    }

    getNetwork(){
        return LtcNetworkHelper.getNetwork();
    }
}

module.exports = LtcLib;