sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/routing/History",
   "sap/ui/core/UIComponent",
   'sap/ui/model/odata/v2/ODataModel',
   'sap/ui/model/json/JSONModel',
   'sap/m/Label',
   'sap/ui/model/Filter',
   'sap/m/MessageBox',
   'jquery.sap.global',
   'sap/m/MessageToast',
   'sap/ui/core/Fragment'
], function(Controller, History, UIComponent, ODataModel, JSONModel, Label, Filter, MessageBox, jQuery, MessageToast, Fragment) {
   "use strict";

   return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.contract.View4", {
      onInit: function() {
      
           var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";   //CORSerror나면 http:// 를 proxy/http/로
         sServiceUrl +=  "/sap/opu/odata/sap/ZFIORI_STU07_DEV02_SRV/"; // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
           var url;
   
           url = "/getData2Set";
        
           var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
           this.oModel = new JSONModel();
         var data;
         oDataModel.read(url, null, null, false, function(oData){
//            data = oData;
            data = oData.results;
         });
         var oModel = new sap.ui.model.json.JSONModel({ "data" : data });
//         var oModel = new sap.ui.model.json.JSONModel(data); // {results : [] }
         this.getView().setModel(oModel, "view"); 
         
         

         this.aKeys = [
            "Zname", "Zcategory"
         ];
         this.oSelectName = this.getSelect("slName");
         this.oSelectCategory = this.getSelect("slCategory");
//         this.oSelectSupplierName = this.getSelect("slSupplierName");   //key값을 가지고 value값 찾아온다.
//         this.oModel.setProperty("/Filter/text", "Filtered by None");
//         this.addSnappedLabel();

         var oFB = this.getView().byId("filterbar");
         if (oFB) {
            oFB.variantsInitialized();
         }
      
         sap.ui.getCore().attachParseError(
               function(oEvent) {
                  var oElement = oEvent.getParameter("element");

                  if (oElement.setValueState) {
                     oElement.setValueState(sap.ui.core.ValueState.Error);
                  }
               });

         sap.ui.getCore().attachValidationSuccess(
               function(oEvent) {
                  var oElement = oEvent.getParameter("element");

                  if (oElement.setValueState) {
                     oElement.setValueState(sap.ui.core.ValueState.None);
                  }
               });
      
      },
      handleChange: function (oEvent) {
         var oText = this.byId("C");
         var oDP = oEvent.oSource;
         var sValue = oEvent.getParameter("value");
         var bValid = oEvent.getParameter("valid");
         this._iEvent++;
//         oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

         if (bValid) {
            oDP.setValueState(sap.ui.core.ValueState.None);
         } else {
            oDP.setValueState(sap.ui.core.ValueState.Error);
         }
      },
      handleChange2: function (oEvent) {
         var oText = this.byId("F");
         var oDP = oEvent.oSource;
         var sValue = oEvent.getParameter("value");
         var bValid = oEvent.getParameter("valid");
         this._iEvent++;
//         oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

         if (bValid) {
            oDP.setValueState(sap.ui.core.ValueState.None);
         } else {
            oDP.setValueState(sap.ui.core.ValueState.Error);
         }
      },

      
      getSelect: function(sId) {
         return this.getView().byId(sId);
      },
      
//      __________________________________________________________________
   
      
      goBack : function(oEvent) {
         var oHistory = History.getInstance();
         var sPreviousHash = oHistory.getPreviousHash();

         if (sPreviousHash !== undefined) {   
            window.history.go(-1);                        //just before screen
         } else {
            var oRouter = UIComponent.getRouterFor(this);      //before screen in process flow
            oRouter.navTo("view3", {}, true);
         }
      },

//      onPress : function (oEvent) {   //계약서 눌렀을 때 
//         var oItem = oEvent.getSource();
//         var oRouter = UIComponent.getRouterFor(this);
//         var routerData = oItem.mAggregations.cells[1].mProperties.text;
//         
//
//         var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
//         MessageBox.warning(
//               "계약서를 등록하시겠습니까?\n"  + "한번 계약서 등록 시 변경이 불가능합니다.",
//               {
//                  icon: MessageBox.Icon.WARNING,
//                  title: "계약서 등록",
//                  actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
//                  styleClass: bCompact ? "sapUiSizeCompact" : "",
//                  initialFocus: MessageBox.Action.CANCEL,
//                  onClose: function(oAction){
//                     if(oAction == 'OK'){
//                        oRouter.navTo("view5", {
//                           ContractPath: routerData
//                        });
//                     }
//                  }
//               }
//         );
//      }
      onPress : function (oEvent) {   //계약서 눌렀을 때 
         var oItem = oEvent.getSource();
         var oRouter = UIComponent.getRouterFor(this);
         var routerData = oItem.mAggregations.cells[0].mProperties.text;
//         routerData = oItem.getBindingContext("estlist").getPath().substr(1);
         this.onClose(oRouter, 0);
      },
      onClose: function(oRouter, routerData){
         oRouter.navTo("contDetail", {
            contDetail: routerData
         });
      },
      
      
   });
});