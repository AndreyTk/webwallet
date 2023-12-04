//const { Web3 } = require("web3");

service wallet @(path: '/wallet') {    
  function getAddress() returns String;
  function getBalance() returns String;
  function changeCurrency(currency:String) returns String;
}