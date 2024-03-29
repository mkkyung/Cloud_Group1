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

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.estimate.List", {
		
		onInit: function() {
			this.GtEstiSet();
			this.GtVnameSet();
			this.GtVcodeSet();
			this.GtCat1Set();
			this.GtCat2Set();
			this.GtCat3Set();
			this.GtAvaSet();
			this.GtType1Set();
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
	
		GtEstiSet : function(Cat1,Cat2,Cat3,Vcode,Vname,Made,Type1,Date){
	        var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"; // 로컬 서버 연결 하는 거 
	        sServiceUrl += "/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";   // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
	        var url;
        	var ava = this.getView().byId("idIconTabBar").getSelectedKey();
	        
        	var pava = "";
			if(ava === "ALL")
			{ 			
			}else if (ava === "OK") { 
				pava = "O";
			}else if (ava === "NOB") { 
				pava = "X";
			 }
        	
	        if (Cat1 == undefined ){
		       url = "/getestiSet";
	   		}else{
	   			 url = "/getestiSet?$filter=PCat1 eq '" + Cat1
	   	         + "' and PCat2 eq '" + Cat2
	   	         + "' and PCat3 eq '" + Cat3
	   	         + "' and PVcode eq '" + Vcode
	   	         + "' and PVname eq '" + Vname
	   	         + "' and PType1 eq '" + Type1
	   	         + "' and PMade eq '" + Made
	   	         + "' and PDate eq '" + Date
	   	         + "' and PAva eq '" + pava + "'";
	   		}
	   			var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
	   			var data;
	   			oDataModel.read(url, null, null, false, function(oData) {
	   				data = oData.results;
	   			});
	        var oModel = new sap.ui.model.json.JSONModel({ "data": data });
	        this.getView().setModel(oModel , "estlist");
		},
		
	    GtVnameSet : function() {
		    	var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
					
		        var url = "/getvnameSet";
		        var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
		        var data;
		        oDataModel.read(url, null, null, false, function(oData) {
		        data = oData.results;});
		        var oModel = new sap.ui.model.json.JSONModel({ "vname" : data});
		        this.getView().setModel(oModel, "vname");
		     },
		     
	   GtVcodeSet : function() {
	    		var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
						
	        	var url = "/getvcodeSet";
	        	var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
	        	var data;
	        	oDataModel.read(url, null, null, false, function(oData) {
	        	data = oData.results;});
	        	var oModel = new sap.ui.model.json.JSONModel({ "vcode" : data});
	        	this.getView().setModel(oModel, "vcode");
	   		},
			     
	   GtCat1Set : function() {
				var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
							
		        var url = "/getcat1Set";
			    var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
				var data;
				oDataModel.read(url, null, null, false, function(oData) {
				data = oData.results;});
				var oModel = new sap.ui.model.json.JSONModel({ "cat1" : data});
				this.getView().setModel(oModel, "cat1");
			},
			
		GtCat2Set : function() {
				var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
								
				var url = "/getcat2Set";
				var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
				var data;
				oDataModel.read(url, null, null, false, function(oData) {
				data = oData.results;});
				var oModel = new sap.ui.model.json.JSONModel({ "cat2" : data});
				this.getView().setModel(oModel, "cat2");
			},
			
		GtCat3Set : function() {
		    	var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
					
		        var url = "/getcat3Set";
		        var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
		        var data;
		        oDataModel.read(url, null, null, false, function(oData) {
		        data = oData.results;});
		        var oModel = new sap.ui.model.json.JSONModel({ "cat3" : data});
		        this.getView().setModel(oModel, "cat3");
		     },
		     
			
		GtAvaSet : function() {
				var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
								
				var url = "/getavaSet";
				var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
				var data;
				oDataModel.read(url, null, null, false, function(oData) {
				data = oData.results;});
				var oModel = new sap.ui.model.json.JSONModel({ "ava" : data});
				this.getView().setModel(oModel, "ava");
			},
			
		GtType1Set : function() {
				var sServiceUrl= "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
								
				var url = "/gettype1Set";
				var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
				var data;
				oDataModel.read(url, null, null, false, function(oData) {
				data = oData.results;});
				var oModel = new sap.ui.model.json.JSONModel({ "type1" : data});
				this.getView().setModel(oModel, "type1");
			},
	     
		onPress : function (oEvent) {	//계약서 눌렀을 때 
			var oItem = oEvent.getSource();
			var oRouter = UIComponent.getRouterFor(this);
			var routerData = oItem.mAggregations.cells[0].mProperties.text;
//			routerData = oItem.getBindingContext("estlist").getPath().substr(1);
			this.onClose(oRouter, routerData);
		},
		
		onClose: function(oRouter, routerData){
			oRouter.navTo("estDetail", {
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
		
		onSearch: function() {
			var Cat1 = "";
			var Cat2 = "";
			var Cat3 = "";
			var Date = "";
			var Made = "";
			var Vcode = "";
			var Vname = "";
			var Type1 = "";
			var change = this.getView().byId("idIconTabBar").getSelectedKey();
			
			if(change === "ALL"){
				Cat1 = this.getView().byId("1cat1").getSelectedKey();
				Cat2 = this.getView().byId("1cat2").getSelectedKey();
				Cat3 = this.getView().byId("1cat3").getSelectedKey();
				Vcode = this.getView().byId("1vcode").getSelectedKey();
				Vname = this.getView().byId("1vname").getSelectedKey();
				Type1 = this.getView().byId("1type1").getSelectedKey();
				Made = this.getView().byId("1made").getValue();
				Date = this.getView().byId("1date").getValue();
			}else if (change === "OK"){
				Cat1 = this.getView().byId("2cat1").getSelectedKey();
				Cat2 = this.getView().byId("2cat2").getSelectedKey();
				Cat3 = this.getView().byId("2cat3").getSelectedKey();
				Vcode = this.getView().byId("2vcode").getSelectedKey();
				Vname = this.getView().byId("2vname").getSelectedKey();
				Type1 = this.getView().byId("2type1").getSelectedKey();
				Made = this.getView().byId("2made").getValue();
				Date = this.getView().byId("2date").getValue();
			}
			else if (change === "NOB"){
				Cat1 = this.getView().byId("3cat1").getSelectedKey();
				Cat2 = this.getView().byId("3cat2").getSelectedKey();
				Cat3 = this.getView().byId("3cat3").getSelectedKey();
				Vcode = this.getView().byId("3vcode").getSelectedKey();
				Vname = this.getView().byId("3vname").getSelectedKey();
				Type1 = this.getView().byId("3type1").getSelectedKey();
				Made = this.getView().byId("3made").getValue();
				Date = this.getView().byId("3date").getValue();
			}
		    this.GtEstiSet(Cat1,Cat2,Cat3,Vcode,Vname,Made,Type1,Date);
		},
		
		IconTabFilter: function (oEvent) {		
			this.onSearch();		

		},
	});
});