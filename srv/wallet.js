const DEFAULT_CURRENCY = "ETH";

const BlockchainService = require('./utils/BlockchainService');

module.exports = class wallet {    

    constructor(){
      this.currency = DEFAULT_CURRENCY;
      let blockchainService = new BlockchainService(this);
      this.blockchainService = blockchainService;
    }
   
    getCurrency(){
      return this.currency;
      
    }

    changeCurrency(req){
      let {currency} = req.data;      
      this.setCurrency(currency);      
      return this.getCurrency(); //OK
    }

    setCurrency(currency){
      this.currency = currency;
    }

    sendCurrency(){
        return this.blockchainService.sendCurrency();
    }

    async getAddress() {      
      let address = await this.blockchainService.getAddress();// BigInt(await provider.eth.getBalance(DEFAULT_ADDRESS));              
      return address.toString();
    }

    async getBalance(){
      let balance = await this.blockchainService.getBalance();
      return balance.toString();
    }
   
  }