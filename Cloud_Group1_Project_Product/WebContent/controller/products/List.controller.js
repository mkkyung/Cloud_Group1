sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (JSONModel, Controller, MessageToast) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.products.List", {
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			this.MainData();
			this.Cat1();
			this.Cat2();
		},
		MainData : function(inputData) {
			
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
					+ "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV";
			
			if (inputData != null) {
				var url = inputData[0] != "" ? "/ZTG1_CAT3Set?$filter=Cat1Name eq '" + inputData[0] + "'" : ""
					url	+= inputData[1] != "" ? " and Cat2Name eq '" + inputData[1] + "'" : ""
					url	+= inputData[2] != "" ? " and Cat3Name eq '" + inputData[2] + "'" : ""
					url	+= inputData[3] != "" ? " and Cat3Made eq '" + inputData[3] + "'" : "";
//					url	+= " and Cat3Date eq '" + inputData[4] + "'"
//					url	+= " and Cat3Date eq '" + inputData[5] + "'";
			} else {
				var url = "/ZTG1_CAT3Set";
			}
			
			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, true);

			var MainData;

			oDataModel
					.read(
							url,
							null,
							null,
							false,
							function(oData) {
								MainData = oData.results;
							});

			var oModel = new sap.ui.model.json.JSONModel(
					{
						"MainData" : MainData
					});

			this.getView().setModel(oModel,
					"MainData");

		},
		Cat1 : function() {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				+ "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV";
			var url = "/ZTG1_CAT1Set";
	
			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, true);
	
			var Cat1;
	
			oDataModel
					.read(
							url,
							null,
							null,
							false,
							function(oData) {
								Cat1 = oData.results;
							});
	
			var oModel = new sap.ui.model.json.JSONModel(
					{
						"Cat1" : Cat1
					});
	
			this.getView().setModel(oModel,
					"Cat1");
		},
		Cat2 : function() {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				+ "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV";
			var url = "/ZTG1_CAT2Set";
	
			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, true);
	
			var Cat2;
	
			oDataModel
					.read(
							url,
							null,
							null,
							false,
							function(oData) {
								Cat2 = oData.results;
							});
	
			var oModel = new sap.ui.model.json.JSONModel(
					{
						"Cat2" : Cat2
					});
	
			this.getView().setModel(oModel,
					"Cat2");
		},
		search : function() {

			var Cat1 = this.getView().byId("Cat1").getValue().toUpperCase();

			var Cat2 = this.getView().byId("Cat2").getValue().toUpperCase();

			var Cat3 = this.getView().byId("Cat3").getValue().toUpperCase();

			var Made = this.getView().byId("Made").getValue().toUpperCase();
			
			var FromDate = this.getView().byId("FromDate").getValue();
			
			var ToDate = this.getView().byId("ToDate"  ).getValue();				

			var inputData = [ Cat1, Cat2, Cat3, Made, FromDate, ToDate ];

			this.MainData(inputData);

		},
		handleMasterPress: function (oEvent) {
			var productPath = oEvent.getSource().getBindingContext("MainData").getPath();
			var product = productPath.split("/").slice(-1).pop();
			var productKey = oEvent.getSource().getBindingContext("MainData").oModel.aBindings["0"].oList[product].Cat3No;

			this.bus.publish("flexible", "setDetailPage", {productKey});            // 상세페이지
																					// 이동
		},
		handleCreatePress: function () {
			this.bus.publish("flexible", "setCreatePage")
		}
	});
}, true);


