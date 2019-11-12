sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/m/MessageBox'
], function(Controller, History, UIComponent, ODataModel, JSONModel, Label, Filter, MessageBox) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.estimate.View2", {
		
		onInit: function() {
			this.getData();
			this.GtCat3Set();
			this.GtVenSet();
//			통화설정
			var oViewModel = new JSONModel({
				currency: "KRW"
			});
			this.getView().setModel(oViewModel, "view");
		},
		
//		_______________________________________
		
		onShow : function(){
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("view3");
		},
		
		goBack : function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);							//just before screen
			} else {
				var oRouter = UIComponent.getRouterFor(this);	//before screen in process flow
				oRouter.navTo("view1", {}, true);
			}
		},
	
		getData : function(){
	        var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"; // 로컬 서버 연결 하는 거 
	        sServiceUrl += "/sap/opu/odata/sap/Z_FUNC_ESTIMATE_TEST_SRV";   // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
	        var url;
	        url = "/getestSet";
	     
	        var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
	        var data;
	        oDataModel.read(url, null, null, false, function (oData) {
	           data = oData.results;
	        });
	        var oModel = new sap.ui.model.json.JSONModel({ "data": data });
	        this.getView().setModel(oModel , "estlist");
		},
		
		GtCat3Set : function() {
	    	var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_FUNC_ESTIMATE_TEST_SRV";
				
	        var url = "/getcat3Set";
	        var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
	        var data;
	        oDataModel.read(url, null, null, false, function(oData) {
	        data = oData.results;});
	        var oModel = new sap.ui.model.json.JSONModel({ "cat3" : data});
	        this.getView().setModel(oModel, "cat3");
	     },
	     
	     GtVenSet : function() {
		    	var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_FUNC_ESTIMATE_TEST_SRV";
					
		        var url = "/getvenSet";
		        var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
		        var data;
		        oDataModel.read(url, null, null, false, function(oData) {
		        data = oData.results;});
		        var oModel = new sap.ui.model.json.JSONModel({ "ven" : data});
		        this.getView().setModel(oModel, "ven");
		     },
	     
		onPress : function (oEvent) {	//계약서 눌렀을 때 
			var oItem = oEvent.getSource();
			var oRouter = UIComponent.getRouterFor(this);
			var routerData = oItem.mAggregations.cells[0].mProperties.text;
//			routerData = oItem.getBindingContext("estlist").getPath().substr(1);
			this.onClose(oRouter, 0);
		},
		
		onClose: function(oRouter, routerData){
			oRouter.navTo("estlookup", {
				EstPath: routerData
			});
		},
//필터바 메세지 출력
		onReset: function(oEvent) {
			jQuery.sap.require("sap.m.MessageToast");
			// var params = oEvent.getParameters();
			var sMessage = "onReset trigered";
			sap.m.MessageToast.show(sMessage);
		},
		
		onSearch: function(oEvent) {
			jQuery.sap.require("sap.m.MessageToast");
			// var params = oEvent.getParameters();
			var sMessage = "onSearch trigered";
			sap.m.MessageToast.show(sMessage);
		},
////필터바 숨기기 토글 로직
//		onToggleHeader: function () {
//			this.getPage().setHeaderExpanded(!this.getPage().getHeaderExpanded());
//		},
//		
//		addSnappedLabel : function() {
//			var oSnappedLabel = this.getSnappedLabel();
//			oSnappedLabel.attachBrowserEvent("click", this.onToggleHeader, this);
//			this.getPageTitle().addSnappedContent(oSnappedLabel);
//		},
//		
//		getSnappedLabel : function () {
//			return new sap.m.Label({text: " "});
//		},
//		
//		getPageTitle: function() {
//			return this.getPage().getTitle();
//		},
//		getPage : function() {
//			return this.getView().byId("dynamicPageId");
//		},

	});
});