/* global MyLib:true */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
    //"front/utils/MyLib"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        var toast;
        var walletsModel;
        var protocol;
        var oData;
        var currency;        
        var mainModel;
        
        return Controller.extend("front.controller.index", {
            onInit: function () {                                
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.getRoute("form").attachMatched(this._onRouteFound, this);
                
                mainModel = this.getOwnerComponent().getModel();
                
                walletsModel = this.getOwnerComponent().getModel("wallets");   
                this.getView().setModel(walletsModel);

                oData = walletsModel.getData();

                toast = this.getView().byId("toast");                
            },

            _onRouteFound: function(oEvent) {
                protocol = oEvent.getParameter("arguments").protocol;                
                var path = "/"+protocol;
                this.getView().bindElement(path);
                walletsModel.setProperty("/currentProtocol", protocol);
                currency = walletsModel.getProperty("/"+protocol+"/symbol");
                
                this.changeCurrency();                
            },

            emptyBussy: function(value){                
                return (value=="" || value==null);
            },

            clickSend: function(oEvent) {                                                    
                /*this.blockchainService.getBalance(currency)
                    .then((balance)=>walletsModel.setProperty("/"+protocol+"/balance",balance));*/
                
                //toast.setText("Відправлено " + oData[protocol].name + "\n на адресу " + oData[protocol].to + "\n в кількості " + oData[protocol].value);
                //toast.setText(MyLib.test());
                //toast.show();
                console.log(web3);
            },

            changeCurrency(){          
                let unit = "changeCurrency";                      
                let that = this;                
                mainModel.read("/changeCurrency", {
                    urlParameters : {"currency":currency},
                    success : function(oData, oResponse){                                                    
                        that.fillAddress();
                        that.fillBalance();                        
                    },                   
                    error: function(oError ){
                       console.log("ERROR "+unit, oError);
                    }
                });
            },

            fillAddress: function(){
                let unit = "address";
                walletsModel.setProperty("/"+protocol+"/"+unit,"");                
                mainModel.read("/getAddress", { 
                    success : function(oData, oResponse){  
                        let value = oData.getAddress;
                        walletsModel.setProperty("/"+protocol+"/"+unit,value);
                    },                   
                    error: function(oError ){
                       console.log("ERROR "+unit, oError);
                       toast.setText("Виникла помилка!");
                       toast.show();
                    }
                });
            },

            fillBalance: function(){
                let unit = "balance";
                walletsModel.setProperty("/"+protocol+"/"+unit,"");
                mainModel.read("/getBalance", { 
                    success : function(oData, oResponse){                          
                        let value = oData.getBalance;
                        walletsModel.setProperty("/"+protocol+"/"+unit,value);
                    },                   
                    error: function(oError ){
                       console.log("ERROR "+unit, oError);                       
                       toast.setText("Виникла помилка!");
                       toast.show();
                    }
                });
            }
        });
    });
