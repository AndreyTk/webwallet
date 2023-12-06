/* global MyLib:true */
sap.ui.define([
    "sap/ui/core/mvc/Controller"    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        var that;
        var toast;
        var walletsModel;
        var protocol;
        //var oData;
        var currency;        
        var mainModel;
                
        return Controller.extend("front.controller.index", {
            onInit: function () {                                
                that=this;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.getRoute("form").attachMatched(this._onRouteFound, this);
                
                mainModel = this.getOwnerComponent().getModel();
                
                walletsModel = this.getOwnerComponent().getModel("wallets");   
                this.getView().setModel(walletsModel);

                //oData = walletsModel.getData();

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
                return (value=="" || value==null || value===false);
            },

            clickSend: function(oEvent) {                                                                    
                let to = walletsModel.getProperty("/"+protocol+"/to");
                let value = walletsModel.getProperty("/"+protocol+"/value");

                this.sendCurrency(to, value);
            },

            changeCurrency(){          
                let unit = "changeCurrency";                                      
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
            },

            sendCurrency: function(to, value){
                let tr = walletsModel.getProperty("/"+protocol+"/transactions");
                let newTr = {status: false};
                tr.unshift(newTr);
                walletsModel.setProperty("/"+protocol+"/transactions", tr);                
                mainModel.read("/sendCurrency", {
                    urlParameters : {
                        "receiver":to,
                        "amount": value.replaceAll(",", ".")
                    },
                    success : function(oData, oResponse){      
                        //console.log(oData.sendCurrency);
                        walletsModel.setProperty("/"+protocol+"/transactions/0", oData.sendCurrency);
                        that.fillBalance();                        
                    },                   
                    error: function(oError ){
                       tr.splice(0, 1);
                       walletsModel.setProperty("/"+protocol+"/transactions", tr);
                       console.log("ERROR sendCurrency", oError);
                       toast.setText("Виникла помилка!");
                       toast.show();
                    }                
                });

            },

            onListItemPress: function(oEvent){                
                var oRow = oEvent.getSource().getBindingContext();
                let item = walletsModel.getProperty(oRow.sPath);
                let url = walletsModel.getProperty("/"+protocol+"/externalSite").replaceAll("#id", item.transactionHash);                
                sap.m.URLHelper.redirect(url, true);                
            },

            transactionStatusText: function(status){
                switch (status){
                    case true:
                        return "Завершено"
                        break;
                    case false:
                        return "В процесі"
                        break;    
                    default:
                        return "Очікується"
                } 
            },

            transactionStatusState: function(status){
                switch (status){
                    case true:
                        return "Success"
                        break;
                    case false:
                        return "Warning"
                        break;    
                    default:
                        return "None"
                } 
            }
        });
    });
