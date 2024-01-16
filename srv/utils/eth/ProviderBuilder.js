const Web3 = require("web3");
module.exports = function(provider_url){
    return new Web3(new Web3.providers.HttpProvider(provider_url));
}