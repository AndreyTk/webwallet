sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("front.controller.index", {
            onInit: function () {
                //console.log(this.getCore());
            },

            goForm: function(_protocol) {          
                this.getOwnerComponent().getRouter().navTo("form", {
                  protocol : _protocol            
                });
              }
        });
    });
