// відповідає за отримання балансу, за отримання адреси і за надсилання транзакцій
require('dotenv').config();
const EthLib = require("./eth/EthLib");
const ETH = "ETH";

class BlockchainService{
    constructor(app) {        
        this.app = app
        let eth = new EthLib(app);
        this.currencyLibraries = {
            ETH:eth,
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
                console.log("CurrencyLibrary.getAddress",address);
                return resolve(address);
            }catch (e){
                return reject(e);
            }
        })
    }
    //
    sendCurrency(){
        let _address = document.getElementById("transfer_address").value;
        console.log(_address);
        let _amount=document.getElementById("transfer_amount").value;
        let currency = this.app.getCurrency();
        console.log(currency)
        let result = "Sending "+_amount+" "+currency+" to "+_address;
        this.getCurrencyLibrary().sendCurrency(_address,_amount);
        alert(result);

    }
}

module.exports = BlockchainService;