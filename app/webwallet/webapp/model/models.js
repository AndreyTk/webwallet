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
                        to : "0x000...001",
                        value : 1,
                        address: "",
                        transactions : [
                            {address: "address1", value:"10"},
                            {address: "address2", value:"20"},
                            {address: "address1", value:"10"},
                            {address: "address2", value:"20"},
                            {address: "address1", value:"10"},
                            {address: "address2", value:"20"},
                            {address: "address1", value:"10"},
                            {address: "address2", value:"20"},
                            {address: "address1", value:"10"},
                            {address: "address2", value:"20"},
                            {address: "address1", value:"10"},
                            {address: "address2", value:"20"}
                        ]
                    },
                    ERC20: {
                        symbol : "ERC20",
                        name : "ANTToken",
                        ico : "img/coins-solid.svg",
                        logo : "img/coins-solid.svg",
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