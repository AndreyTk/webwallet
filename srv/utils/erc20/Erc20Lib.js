const EthLib = require('../eth/EthLib');
const Converter = require('../../helpers/Erc20Converter');

const ERC20_ABI = require("./erc20_abi");

const GAS_LIMIT = 100000;

const contractAddress =process.env.ERC20_CONTRACT_ADDRESS;

class Erc20Lib extends EthLib{

    constructor(app) {
        super(app);
        this.setContract();
        this.converter = new Converter()
    }
    composeContract(){
        let contract =new this.provider.eth.Contract(ERC20_ABI,this.getContractAddress());
        return contract;
    }

    cacheDecimals(){
        return new Promise(async(resolve,reject)=>{
            try{
                let decimals = await this.getContract().methods.decimals().call();
                this.setDecimals(decimals);

                return resolve(decimals);
            }catch (e) {
                return reject(e);
            }
        });
    }

    setContract(){
        this.contract = this.composeContract();
    }
    getContractAddress(){
        return contractAddress;
    }
    getContract(){
        return this.contract;
    }

    getCurrentBalance(){        
        return new Promise(async(resolve,reject)=>{
            try{                
                let address = await this.getAddress();                
                let balance = await this.getBalance(address)                
                return resolve(balance);
            }catch (e) {
                return reject(e);
            }
        });
    }
    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{                
                await this.cacheDecimalsIfUndefined();
                this.validator.validateAddress(address);
                let balance = await this.getContract().methods.balanceOf(address).call();                
                balance = this.toDecimals(balance);                
                return resolve(balance);
            }catch (e) {
                return reject(e);
            }
        });
    }

    getGasLimit(){
        return GAS_LIMIT;
    }
    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                amount = this.fromDecimals(amount);
                let data = this.getContract().methods.transfer(to, amount).encodeABI();                
                let txData = await this._formatTransactionParams(this.getContractAddress(),"0",data);
                let hash = await this._makeTransaction(txData);
                return resolve(hash);
            }catch (e){
                return reject(e);
            }
        });
    }

    toDecimals(amount){
        return this.converter.toDecimals(amount,this.getDecimals());
    }

    fromDecimals(amount){
        return this.converter.fromDecimals(amount,this.getDecimals());
    }

    getDecimals(){
        return this.decimals;
    }

    setDecimals(decimals){
        this.decimals = decimals;
        this.converter.setDecimals(decimals);
    }

    isDecimalsUndefined(){
        // if this.decimals is undefined, convert to boolean and return false
        return !this.decimals;
    }
    cacheDecimalsIfUndefined(){
        return new Promise(async(resolve,reject)=>{
            try{
                if(this.isDecimalsUndefined()){
                    await this.cacheDecimals();
                }
                return resolve(true);
            }catch (e){                
                return reject(e);
            }
        });
    }
}
module.exports = Erc20Lib;