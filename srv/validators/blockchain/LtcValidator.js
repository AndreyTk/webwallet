const BtcValidator= require('./BtcValidator');
const LTC = "LTC";
class LtcValidator extends BtcValidator{
    validateAddress(address){
        return this.validateString(address,"LTC ADDRESS");
    }
    getSymbol(){
        return LTC;
    }
}

module.exports = LtcValidator;