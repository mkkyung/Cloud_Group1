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
		},
		
		handleValueHelp : function (oEvent) {						  //Table Dialog
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"Cloud_Group1_ProjectCloud_Group1_Project.view.vendor.Dialog",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}

			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new sap.ui.model.Filter(
				"BName",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},
		_handleValueHelpSearch : function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"BName",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose : function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.getView().byId(this.inputId),
					oText = this.getView().byId('selectedKey'),
					sDescription = oSelectedItem.getDescription();

				productInput.setSelectedKey(sDescription);
				oText.setText(sDescription);
			}
			evt.getSource().getBinding("items").filter([]);
		},

		suggestionItemSelected: function (evt) {

			var oItem = evt.getParameter('selectedItem'),
				oText = this.getView().byId('selectedKey'),
				sKey = oItem ? oItem.getKey() : '';

			oText.setText(sKey);
		}
	});
}, true);
