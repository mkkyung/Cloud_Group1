sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	'sap/ui/core/Fragment',
	'sap/ui/model/Filter',
], function(Controller, History, UIComponent, JSONModel, Fragment, Filter) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.contract.Create", {
		onShow : function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view4");
		},
		
		goBack : function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);								//just before screen
			} else {
				var oRouter = UIComponent.getRouterFor(this);		//before screen in process flow
				oRouter.navTo("view2", {}, true);
			}
		},
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
		onInit : function () {
			this.MainData();
		},
		handleValueHelp : function (oEvent) {						  //Table Dialog
//			var sInputValue = this.byId("AA").getValue(),
//			oModel = this.getView().getModel();
//			aProducts = oModel.getProperty("/ProductCollection");
//			
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"Cloud_Group1_ProjectCloud_Group1_Project.view.contract.Dialog",
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
	      handleChange: function (oEvent) {
	          var oText = this.byId("H");
	          var oDP = oEvent.oSource;
	          var sValue = oEvent.getParameter("value");
	          var bValid = oEvent.getParameter("valid");
	          this._iEvent++;
//	          oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

	          if (bValid) {
	             oDP.setValueState(sap.ui.core.ValueState.None);
	          } else {
	             oDP.setValueState(sap.ui.core.ValueState.Error);
	          }
	       },
	       handleChange2: function (oEvent) {
	          var oText = this.byId("I");
	          var oDP = oEvent.oSource;
	          var sValue = oEvent.getParameter("value");
	          var bValid = oEvent.getParameter("valid");
	          this._iEvent++;
//	          oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

	          if (bValid) {
	             oDP.setValueState(sap.ui.core.ValueState.None);
	          } else {
	             oDP.setValueState(sap.ui.core.ValueState.Error);
	          }
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

		suggestionItemSelected: function (oEvent) {

			var oItem = oEvent.getParameter('selectedItem'),
				oText = this.getView().byId('selectedKey'),
				sKey = oItem ? oItem.getKey() : '';

			oText.setText(sKey);
		},
		handleSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
		handleClose: function(oEvent) {
			var oBinding = oEvent.getSource().getBinding("items");
	         oBinding.filter([]);
			var aContexts = oEvent.getParameter("selectedContexts");
						if (aContexts && aContexts.length) {
				this.byId("productInput").setValue(aContexts.map(function(oContext) { return oContext.getObject().AName; }).join(", "));
			}   
	         var sInputValue = this.byId("productInput").getValue();
		},
		
		save: function () {
//	         var category   = this.getView().byId("category").getSelectedKey();
//	         var title      = this.getView().byId("title").getValue();
//	         var content      = this.getView().byId("content").getValue();
//	         var user      = this.getView().byId("user").getValue();
	         var addr        = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";
	         addr          += "sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01/getCreate1Set";
	         
	         var paramData = 
	         {
	               "ContPname" : "1234",
	               "ContVname" : " ",
	         };
	         
	         $.ajax({
	            type : "POST",
	            url  : addr,
	            data : JSON.stringify(paramData),
	               contentType: "application/json" ,
	                 success: function(aa, bb, cc) {
	                    console.log("13 " + cc);
	                 },
	               error: function(aa, bb, cc) { 
	                  console.log("23 " + cc);
	               }
	         });
	      }
		

	});
});