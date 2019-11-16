sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (JSONModel, Controller, MessageToast) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.products.List", {
		MainData : function() {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
					+ "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV";
			var url = "/ZTG1_CAT3Set";

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
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			this.MainData();
		},
		handleMasterPress: function (oEvent) {
			var productPath = oEvent.getSource().getBindingContext("MainData").getPath();
			var product = productPath.split("/").slice(-1).pop();

			this.bus.publish("flexible", "setDetailPage", {product : product});            //상세페이지 이동
		},
		handleCreatePress: function () {
			this.bus.publish("flexible", "setCreatePage")
		}
	});
}, true);


