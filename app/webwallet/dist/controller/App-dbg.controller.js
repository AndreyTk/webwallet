sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
      
      return BaseController.extend("front.controller.App", {
        onInit: function() {
        },

        onHomePressed: function(_protocol) {          
          this.getOwnerComponent().getRouter().navTo("Routeindex");
        },

        goForm: function(_protocol) {          
          this.getOwnerComponent().getRouter().navTo("form", {
            protocol : _protocol            
          });
        }
      });
    }
  );
  