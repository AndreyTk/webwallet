service wallet 
  @(path: '/wallet')
  @(requires: 'any') 
{    
  function getAddress() returns String;
  function getBalance() returns String;
  function changeCurrency(currency:String) returns String;
  function sendCurrency(receiver:String, amount:String) returns String;
  function getCurrentBalance() returns String;
  function generateMnemonic() returns String;
  function importMnemonic(mnemonic:String) returns String;  
}