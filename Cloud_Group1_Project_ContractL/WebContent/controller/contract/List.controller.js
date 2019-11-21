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

   return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.contract.List", {

	   onInit: function() {
  		
    	  
    	  
      
    	  this.OngetData();
    	  this.OngetCat1Set();
    	  this.OngetCat2Set();
    	  this.OngetCat3Set();	
    	  this.OngetType1Set();
//           var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";   //CORSerror나면 http:// 를 proxy/http/로
//         sServiceUrl +=  "/sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01"; // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
//           var url;
//   
//           url = "/getAll1Set";
//        
//           var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
//           this.oModel = new JSONModel();
//         var data;
//         oDataModel.read(url, null, null, false, function(oData){
////            data = oData;
//            data = oData.results;
//         });
//         var oModel = new sap.ui.model.json.JSONModel({ "data" : data });
////         var oModel = new sap.ui.model.json.JSONModel(data); // {results : [] }
//         this.getView().setModel(oModel, "view"); 
			var oViewModel = new JSONModel({
				currency: "KRW"
			});
			this.getView().setModel(oViewModel, "view");
         

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

      onPress : function (oEvent) {   //계약서 눌렀을 때 
         var oItem = oEvent.getSource();
         var oRouter = UIComponent.getRouterFor(this);
         var routerData = oItem.mAggregations.cells[2].mProperties.text;
         this.onClose(oRouter, routerData);
      },
      onClose: function(oRouter, routerData){
         oRouter.navTo("contDetail", {
            contDetail: routerData
         });
      },
      OngetData : function (PContType,PContNo,PContCat1,PContCat2,PContPname,PContVname,PContVno,PContSdate,PContEdate){
    	  var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/"; 
          sServiceUrl +=  "sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01"; 
          var url;
          	var PCr = 'R';
          	var Light = this.getView().byId("idIconTabBar").getSelectedKey();
        	var PContLight;
			if(Light === "All")
			{ 		
				PContLight = "";
			}else if (Light === "A") { 
				PContLight = "승인";
			}else if (Light === "B") { 
				PContLight = "대기";
			}
			 else if (Light === "C") {
				PContLight = "종료";
			}
			
            if (PContType == undefined){
		            url = "/getData1Set?$filter=PCr eq '" + PCr + "'and PContLight eq'" + ' ' + "'";
		            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
		            this.oModel = new JSONModel();
		          var data;
		          oDataModel.read(url, null, null, false, function(oData){
		
		             data = oData.results;
		          });
		          var oModel = new sap.ui.model.json.JSONModel({ "getData" : data });
		          this.getView().setModel(oModel, "getData"); 
            } else{
            	var PCr = 'R';
            	    url = "/getData1Set?$filter=PCr eq '" + PCr + "'";
            	    url += " and PContType eq '" + PContType + "'";
            	    url += " and PContNo eq '" + PContNo + "'"; 
            	    url += " and PContCat1 eq '" + PContCat1 + "'";
            	    url += " and PContCat2 eq '" + PContCat2 + "'";
            	    url += " and PContPname eq '" + PContPname + "'";
            	    url += " and PContVname eq '" + PContVname + "'";
            	    url += " and PContVno eq '" + PContVno + "'";
            	    url += " and PContSdate eq '" + PContSdate + "'";
            	    url += " and PContEdate eq '" + PContEdate + "'";
            	    url += " and PContLight eq '" + PContLight + "'";
            	 var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
                 this.oModel = new JSONModel();
               var data;
               oDataModel.read(url, null, null, false, function(oData){

                  data = oData.results;
               });
               var oModel = new sap.ui.model.json.JSONModel({ "getData" : data });
               this.getView().setModel(oModel, "getData"); 
            }
      },
      
      OngetCat1Set : function (){
    	  var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"; 
          sServiceUrl +=  "/sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01"; 
            var url;
    
            url = "/getCat1Set";
         
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
            this.oModel = new JSONModel();
          var data;
          oDataModel.read(url, null, null, false, function(oData){

             data = oData.results;
          });
          var oModel = new sap.ui.model.json.JSONModel({ "Cat1" : data });
          this.getView().setModel(oModel, "Cat1"); 
      },
      OngetCat2Set : function (){
    	  var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/"; 
          sServiceUrl +=  "/sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01"; 
            var url;
    
            url = "/getCat2Set";
         
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
            this.oModel = new JSONModel();
          var data;
          oDataModel.read(url, null, null, false, function(oData){

             data = oData.results;
          });
          var oModel = new sap.ui.model.json.JSONModel({ "Cat2" : data });
          this.getView().setModel(oModel, "Cat2"); 
      },
      OngetCat3Set : function (){
    	  var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/"; 
          sServiceUrl +=  "/sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01"; 
            var url;
    
            url = "/getCat3Set";
         
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
            this.oModel = new JSONModel();
          var data;
          oDataModel.read(url, null, null, false, function(oData){

             data = oData.results;
          });
          var oModel = new sap.ui.model.json.JSONModel({ "Cat3" : data });
          this.getView().setModel(oModel, "Cat3"); 
      },
      OngetType1Set : function (){
    	  var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/"; 
          sServiceUrl +=  "/sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01"; 
            var url;
    
            url = "/getType1Set";
         
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
            this.oModel = new JSONModel();
          var data;
          oDataModel.read(url, null, null, false, function(oData){

             data = oData.results;
          });
          var oModel = new sap.ui.model.json.JSONModel({ "Type1" : data });
          this.getView().setModel(oModel, "Type1"); 
      },
      
	   handleIconTabBarSelect: function (oEvent) {
           var Light = this.getView().byId("idIconTabBar").getSelectedKey;
       	   var PContLight;
			if(Light === "ALL")
			{ 			
			}else if (Light === "A") { 
				PContLight = "승인";
			}else if (Light === "B") { 
				PContLight = "대기";
			 }
			 else if (Light === "C") {
				PContLight = "종료";
			 }
		   this.onSearch();
	   }, 
      onSearch : function(){
    	 var right = this.getView().byId()
         var change = this.getView().byId("idIconTabBar").getSelectedKey();
    	 if(change == 'All'){
		 var PContType = this.getView().byId("A").getValue();// 계약서 장단 구분 조회 값
	 	 var PContNo = this.getView().byId("B").getValue();// 계약번호 조회
	 	 var PContCat1 = this.getView().byId("C").getValue(); // 계약 대분류 조회 ( 인덱스 값)
	     var PContCat2 = this.getView().byId("D").getValue(); // 계약 중분류 조회 ( 인덱스 값)
	     var PContPname = this.getView().byId("E").getValue(); // 계약 상품명 조회 ( 인덱스 값)
	     var PContVname = this.getView().byId("F").getValue();// 계약 공급업체명 조회
	     var PContVno = this.getView().byId("G").getValue();// 계약 사업자등록증 조회
	     var PContSdate = this.getView().byId("H").getValue();// 계약 시작일 조회
	     var PContEdate = this.getView().byId("I").getValue();// 계약 종료일 조회
    	  }
	     
	     
	     else if(change == 'A'){
 		 var PContType = this.getView().byId("A1").getValue();// 계약서 장단 구분 조회 값
	 	 var PContNo = this.getView().byId("B1").getValue();// 계약번호 조회
	 	 var PContCat1 = this.getView().byId("C1").getValue(); // 계약 대분류 조회 ( 인덱스 값)
	     var PContCat2 = this.getView().byId("D1").getValue(); // 계약 중분류 조회 ( 인덱스 값)
	     var PContPname = this.getView().byId("E1").getValue(); // 계약 상품명 조회 ( 인덱스 값)
	     var PContVname = this.getView().byId("F1").getValue();// 계약 공급업체명 조회
	     var PContVno = this.getView().byId("G1").getValue();// 계약 사업자등록증 조회
	     var PContSdate = this.getView().byId("H1").getValue();// 계약 시작일 조회
	     var PContEdate = this.getView().byId("I1").getValue();// 계약 종료일 조회
	     }
    	  
	     else if(change == 'B'){
	 	 var PContType = this.getView().byId("A2").getValue();// 계약서 장단 구분 조회 값
		 var PContNo = this.getView().byId("B3").getValue();// 계약번호 조회
		 var PContCat1 = this.getView().byId("C3").getValue(); // 계약 대분류 조회 ( 인덱스 값)
		 var PContCat2 = this.getView().byId("D3").getValue(); // 계약 중분류 조회 ( 인덱스 값)
		 var PContPname = this.getView().byId("E3").getValue(); // 계약 상품명 조회 ( 인덱스 값)
		 var PContVname = this.getView().byId("F3").getValue();// 계약 공급업체명 조회
		 var PContVno = this.getView().byId("G3").getValue();// 계약 사업자등록증 조회
		 var PContSdate = this.getView().byId("H3").getValue();// 계약 시작일 조회
		 var PContEdate = this.getView().byId("I3").getValue();// 계약 종료일 조회
	     }
    	  
	     else if(change == 'C'){
	 	 var PContType = this.getView().byId("A3").getValue();// 계약서 장단 구분 조회 값
		 var PContNo = this.getView().byId("B3").getValue();// 계약번호 조회
		 var PContCat1 = this.getView().byId("C3").getValue(); // 계약 대분류 조회 ( 인덱스 값)
		 var PContCat2 = this.getView().byId("D3").getValue(); // 계약 중분류 조회 ( 인덱스 값)
		 var PContPname = this.getView().byId("E3").getValue(); // 계약 상품명 조회 ( 인덱스 값)
		 var PContVname = this.getView().byId("F3").getValue();// 계약 공급업체명 조회
		 var PContVno = this.getView().byId("G3").getValue();// 계약 사업자등록증 조회
		 var PContSdate = this.getView().byId("H3").getValue();// 계약 시작일 조회
		 var PContEdate = this.getView().byId("I3").getValue();// 계약 종료일 조회
	     }
    	  this.OngetData(PContType,PContNo,PContCat1,PContCat2,PContPname,PContVname,PContVno,PContSdate,PContEdate);
      },	
	

      
   });
});

