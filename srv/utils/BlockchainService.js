// відповідає за отримання балансу, за отримання адреси і за надсилання транзакцій
require('dotenv').config();
const EthLib = require("./eth/EthLib");
const Erc20Lib = require("./erc20/Erc20Lib");

class BlockchainService{
    constructor(app) {        
        this.app = app
        let eth = new EthLib(app);
        let erc20 = new Erc20Lib(app);
        this.currencyLibraries = {
            ETH:eth,
            ERC20:erc20
        }
    }

    getCurrencyLibrary(){
        let currentCurrency = this.app.getCurrency();
        return this.currencyLibraries[currentCurrency];
    }
    
    getBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();
                let balance = await this.getCurrencyLibrary().getBalance(address);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address =await this.getCurrencyLibrary().getAddress();                
                return resolve(address);
            }catch (e){
                return reject(e);
            }
        })
    }
    
    sendCurrency(receiver,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.getCurrencyLibrary().sendCurrency(receiver,amount);
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }
}

module.exports = BlockchainService;