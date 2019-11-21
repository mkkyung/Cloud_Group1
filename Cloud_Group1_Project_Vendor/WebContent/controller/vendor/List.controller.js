sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	'sap/ui/model/Filter',
], function (jQuery, Fragment, Controller, Filter, JSONModel) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.vendor.List", {
		MainData : function(searchData) {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
					+ "/sap/opu/odata/sap/ZFIORI_STU03_DEV03_SRV";
			
			if (searchData != null){
				var url = "/MainDataSet?$filter=PName eq '" + searchData[0] + "'"
				+ " and PCode eq '" + searchData[1] + "'"
				+ " and PGrade eq '" + searchData[2] + "'"
				+ " and PCan eq '" + searchData[3] + "'";
			} else {
				var url = "/MainDataSet";
			}


			var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var MainData;

			oDataModel.read(url, null, null, false, function(oData) {
				MainData = oData.results;
			});

			var oModel = new sap.ui.model.json.JSONModel({
				"MainData" : MainData
			});

			
			this.getView().setModel(oModel, "MainData");

		},
		
		inputId: '',
		
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			// set explored app's demo model on this sample
		
			this.MainData();
		},
		handleMasterPress: function () {
			this.bus.publish("flexible", "setDetailPage");            //상세페이지 이동
		},
		handleCreatePress: function () {
			this.bus.publish("flexible", "setCreatePage")             //등록페이지 이동
		}		
		
	});
}, true);
