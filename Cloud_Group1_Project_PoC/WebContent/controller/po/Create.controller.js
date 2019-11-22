sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	'sap/ui/core/Fragment',
	'sap/ui/model/Filter',
	'sap/m/MessageBox',
	'sap/ui/model/json/JSONModel'
], function(Controller, History, UIComponent, Fragment, Filter, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.po.Create", {
			
		GETPOSet : function() {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				+ "/sap/opu/odata/sap/Z_CLOUD_PUOR_SRV";
			var url;
			url= "/GETPOSet";
			

			var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var GETPOSet;

			oDataModel.read(url, null, null, false, function(oData) {
				GETPOSet = oData.results;
			});

			var oModel = new sap.ui.model.json.JSONModel({
				"GETPOSet" : GETPOSet
			});

			
			this.getView().setModel(oModel, "GETPOSet");

		},
		
		GETContset : function() {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				+ "/sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01";
			var url;
			var PCr = 'R';
            url = "/getData1Set?$filter=PCr eq '" + PCr + "'";

			var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			var data;
			oDataModel.read(url, null, null, false, function(oData) {
				data = oData.results;
			});
			var oModel = new sap.ui.model.json.JSONModel({"cont" : data});
			this.getView().setModel(oModel, "cont");

		},

		onInit: function() {
			this.GETPOSet();
			this.GETContset();
		
//		var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
//		// the default limit of the model is set to 100. We want to show all the entries.
//		oModel.setSizeLimit(1000000);
//		this.getView().setModel(oModel);

//		_______________________________________

		},
		
//		onPress : function (oEvent) {	//계약서 눌렀을 때 
//			var oItem = oEvent.getSource();
//			var oRouter = UIComponent.getRouterFor(this);
//			var routerData = oItem.mAggregations.cells[0].mProperties.text;
////			routerData = oItem.getBindingContext("estlist").getPath().substr(1);
//			this.onClose(oRouter, 0);
//
//		},
		
//		onClose: function(oRouter, routerData){
//			oRouter.navTo("estlookup", {
//				EstPath: routerData
//			});
//		},
		
		onShow : function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view7");
		},
		
		cancel : function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);							//just before screen
			} else {
				var oRouter = UIComponent.getRouterFor(this);	//before screen in process flow
				oRouter.navTo("view7", {}, true);
			}
		},
		
	handleValueHelp : function (oEvent) {
		var sInputValue = this.byId("productInput").getValue(),
		oModel = this.getView().getModel("cont"),
		aProducts = oModel.getProperty("/cont");
		
		this.inputId = oEvent.getSource().getId();
		// create value help dialog
		if (!this._valueHelpDialog) {
			this._valueHelpDialog = sap.ui.xmlfragment(
				"Cloud_Group1_ProjectCloud_Group1_Project.view.po.Dialog",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
		}

		
		aProducts.forEach(function (oProduct) {
			oProduct.selected = (oProduct.ContNo === sInputValue);
		});
		oModel.setProperty("/cont", aProducts);
		
		// create a filter for the binding
		this._valueHelpDialog.getBinding("items").filter([new sap.ui.model.Filter(
			"ContNo",
			sap.ui.model.FilterOperator.Contains, sInputValue
		)]);

		// open value help dialog filtered by the input value
		this._valueHelpDialog.open(sInputValue);
	},

	_handleValueHelpSearch : function (evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter(
			"ContNo",
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
	},
	

	handleSearch: function(oEvent) {
		var sValue = oEvent.getParameter("value");
		var oFilter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sValue);
		var oBinding = oEvent.getSource().getBinding("items");
		
		if(sValue != "")
			oBinding.filter([oFilter]);
		else
			oBinding.filter([]);
			
	},

	handleClose: function(oEvent) {

		// reset the filter
		var oBinding = oEvent.getSource().getBinding("items");
		oBinding.filter([]);

		var aContexts = oEvent.getParameter("selectedContexts");
		if (aContexts && aContexts.length) {
			this.byId("productInput").setValue(aContexts.map(function(oContext) { return oContext.getObject().ContNo; }).join(", "));
		}
		var sInputValue = this.byId("productInput").getValue();
		var PCr = 'R';
		var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
			+ "/sap/opu/odata/sap/Z_CLOUD_CONT_SRV_01";
		var url;
		url = "/getData1Set?$filter=PCr eq 'R' and PContNo eq '" + sInputValue + "'";
		var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
		var list;
		oDataModel.read(url, null, null, false, function(oData) {
			list = oData.results;
		});
		var oModel = new sap.ui.model.json.JSONModel({ "cont" : list });
		this.getView().setModel(oModel , "cont");
	},
	
	onExit : function () {
		if (this._oDialog) {
			this._oDialog.destroy();
		}
	},
	
	
	onPress : function (oEvent) {	//발주서 눌렀을 때 
//		var oItem = oEvent.getSource();
		var oRouter = UIComponent.getRouterFor(this);
//		var routerData = oItem.mAggregations.cells[1].mProperties.text;

		var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		MessageBox.warning(
				"발주서를 등록하시겠습니까?\n"  + "한번 발주서 등록 시 변경이 불가능합니다.",
				{
					icon: MessageBox.Icon.WARNING,
					title: "발주서 등록",
					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					initialFocus: MessageBox.Action.CANCEL,
					onClose: function(oAction){
						if(oAction == 'OK'){
							//abap 데이터 저장 로직 추가
							oRouter.navTo("view7");
						}
					}
				}
		);
	},
	
	save: function () {
//	      var category   = this.getView().byId("category").getSelectedKey();
//	      var title      = this.getView().byId("title").getValue();
//	      var content      = this.getView().byId("content").getValue();
//	      var user      = this.getView().byId("user").getValue();
	      var addr        = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000";
	      addr          += "/sap/opu/odata/sap/Z_CLOUD_PUOR_SRV/GETCREATESet";
//	      addr         += "(Po_no='PO0000009')";
	      
	      var paramData = 
	      {
	            "PoIndex" : "A",
	            "PoLight" : "유효",
//	            "PoDate" : "20191014"
//	            "PoEprice" : 3600
	      };
	      
	      $.ajax({
	         type : "GET",
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