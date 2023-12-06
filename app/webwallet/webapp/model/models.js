sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";
                
        return {
            

            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");                
                return oModel;
            },
            
            createWalletsModel: function () {
                let walletsJSON = {
                    currentProtocol: "ETH",
                    ETH: {
                        symbol : "ETH",
                        name : "Ethereum",
                        ico : "img/ethereum.svg",
                        logo : "img/ethereum.svg",
                        balance : null,
                        owner : "",
                        to : "",
                        value : null,
                        address: "",
                        externalSite: `https://sepolia.etherscan.io/tx/#id`,
                        transactions : [
                            /*{
                                blockHash: "0xfa163f52082901b9ae52d910cabacc19eb818e3b517baed4b2811384384fd07b",
                                transactionHash: "0x762815cf74111318251dcd70225f37f49ebcb1987de87b3f5a061959b225f165",
                                to: "0xe27e9ed99a55eef67647262a2b159a7c04346615",                                
                                blockNumber: 4833995,
                                cumulativeGasUsed: 147000,
                                effectiveGasPrice: 20000000000,
                                gasUsed: 21000,
                                transactionIndex: 6,
                                status: true
                            }*/
                        ]                          
                    },
                    ERC20: {
                        symbol : "ERC20",
                        name : "ANTToken",
                        ico : "img/coins-solid.svg",
                        logo : "img/coins-solid.svg",
                        balance : 0,
                        owner : "",
                        to : "",
                        value : null,
                        address: "",
                        externalSite: `https://sepolia.etherscan.io/tx/#id`,
                        transactions : []
                    },
                    BTC: {
                        symbol : "BTC",
                        name : "Bitcoin",
                        ico : "img/btc.svg",
                        logo : "img/btc.svg",
                        balance : 0,
                        owner : "",
                        to : "0x000...002",
                        value : 2,
                        transactions : [
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"}
                        ]
                    },
                    BNB: {
                        symbol : "BNB",
                        name : "AirBNB",
                        ico : "img/bnb.png",
                        logo : "img/bnb.png",
                        balance : 0,
                        owner : "",
                        to : "0x000...002",
                        value : 2,
                        transactions : [
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"},
                            {address: "address1", value:"100"},
                            {address: "address2", value:"200"}
                        ]
                    },
                    
                };

                var oWalletsModel = new JSONModel(walletsJSON);
                oWalletsModel.setDefaultBindingMode("TwoWay");                
                return oWalletsModel;
            }
        }
});