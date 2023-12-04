sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";var t;var r;var n;var o;var s;var c;return e.extend("front.controller.index",{onInit:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("form").attachMatched(this._onRouteFound,this);c=this.getOwnerComponent().getModel();r=this.getOwnerComponent().getModel("wallets");this.getView().setModel(r);o=r.getData();t=this.getView().byId("toast")},_onRouteFound:function(e){n=e.getParameter("arguments").protocol;var t="/"+n;this.getView().bindElement(t);r.setProperty("/currentProtocol",n);s=r.getProperty("/"+n+"/symbol");this.changeCurrency()},emptyBussy:function(e){return e==""||e==null},clickSend:function(e){console.log(web3)},changeCurrency(){let e="changeCurrency";let t=this;c.read("/changeCurrency",{urlParameters:{currency:s},success:function(e,r){t.fillAddress();t.fillBalance()},error:function(t){console.log("ERROR "+e,t)}})},fillAddress:function(){let e="address";r.setProperty("/"+n+"/"+e,"");c.read("/getAddress",{success:function(t,o){let s=t.getAddress;r.setProperty("/"+n+"/"+e,s)},error:function(r){console.log("ERROR "+e,r);t.setText("Виникла помилка!");t.show()}})},fillBalance:function(){let e="balance";r.setProperty("/"+n+"/"+e,"");c.read("/getBalance",{success:function(t,o){let s=t.getBalance;r.setProperty("/"+n+"/"+e,s)},error:function(r){console.log("ERROR "+e,r);t.setText("Виникла помилка!");t.show()}})}})});