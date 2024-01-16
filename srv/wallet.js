const DEFAULT_CURRENCY = "ETH";
const NODE_ENV = process.env.NODE_ENV;

const HttpService = require("./services/HttpService");
const BlockchainService = require('./utils/BlockchainService');

module.exports = class wallet {    

    constructor(){
      this.currency = DEFAULT_CURRENCY;
      this.httpService = new HttpService(this);      
      let blockchainService = new BlockchainService(this);
      this.blockchainService = blockchainService;      
    }

    isProduction(){
        return NODE_ENV == "production";
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

    async sendCurrency(req){
      let {receiver} = req.data;
      let {amount} = req.data;
      let result = await this.blockchainService.sendCurrency(receiver,amount);
      return result;
    }

    async getAddress() {      
      let address = await this.blockchainService.getAddress();// BigInt(await provider.eth.getBalance(DEFAULT_ADDRESS));              
      return address.toString();
    }

    async getBalance(){
      let balance = await this.blockchainService.getBalance();
      return balance.toString();
    }

    async getCurrentBalance(){
      let result = await this.blockchainService.getCurrentBalance();
      return result.toString();
    }

    async generateMnemonic(){      
      let result = await this.blockchainService.generateMnemonic();
      return result.toString();
    }

    async importMnemonic(req){
      let {mnemonic} = req.data;      
      let result = await this.blockchainService.importMnemonic(mnemonic);           
      //this.walletUi.renderUi();
      return result.toString();
    }
   
  }