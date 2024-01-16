sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";

      var walletsModel;
      var mainModel;
      var toast;
      let that;
      
      return BaseController.extend("front.controller.App", {
        onInit: function() {
          that = this;

          walletsModel = this.getOwnerComponent().getModel("wallets");  
          mainModel = this.getOwnerComponent().getModel();

          this.getView().setModel(walletsModel);

          toast = this.getView().byId("toast");  
        },

        onHomePressed: function(_protocol) {          
          this.getOwnerComponent().getRouter().navTo("Routeindex");
        },

        goForm: function(_protocol) {           
          this.getOwnerComponent().getRouter().navTo("form", {
            protocol : _protocol            
          });
        },

        inputMnemonic: function(){          
          let unit = "importMnemonic";
          let protocol = walletsModel.getProperty("/currentProtocol");
          
          mainModel.read("/"+unit, { 
            urlParameters : {"mnemonic":walletsModel.getProperty("/mnemonic")},
            success : function(oData, oResponse){  
                let value = oData.importMnemonic;                
                //walletsModel.setProperty("/"+protocol+"/"+unit,value);                   
                that.goForm(protocol);
            },                   
            error: function(oError ){
               console.log("ERROR "+unit, oError);
               toast.setText("Виникла помилка!");
               toast.show();
            }
          });
        },

        generateMnemonic: function(){
          let unit = "generateMnemonic";
          mainModel.read("/"+unit, {             
            success : function(oData, oResponse){  
                let value = oData.generateMnemonic;                
                walletsModel.setProperty("/mnemonic", value);
                toast.setText(value);
                toast.show();   
                that.inputMnemonic();
            },                   
            error: function(oError ){
               console.log("ERROR "+unit, oError);
               toast.setText("Виникла помилка!");
               toast.show();
            }
          });
        }
      });
    }
  );
  