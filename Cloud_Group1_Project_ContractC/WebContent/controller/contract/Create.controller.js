sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	'sap/ui/core/Fragment',
	'sap/ui/model/Filter',
	'sap/m/MessageToast',
	'sap/m/MessageBox'
], function(Controller, History, UIComponent, JSONModel, Fragment, Filter, MessageToast, MessageBox) {
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
		
		getest : function() {
			var pava = "O";
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
					+ "/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
			var url = "/getestiSet?$filter=PAva eq '" + pava + "'";
   			var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
   			var estlist;
   			oDataModel.read(url, null, null, false, function(oData) {
   				estlist = oData.results;
   			});
   			var oModel = new sap.ui.model.json.JSONModel({ "estlist" : estlist });
   			this.getView().setModel(oModel , "estlist");

		},
		
		onInit : function () {
			this.getest();
			
			var oViewModel = new JSONModel({
				currency: "KRW"
			});
			this.getView().setModel(oViewModel, "view");
		},
		
		handleValueHelp : function (oEvent) {						  //Table Dialog
//			var sInputValue = oEvent.getSource().getValue();

			var sInputValue = this.byId("productInput").getValue(),
			oModel = this.getView().getModel("estlist"),
			aProducts = oModel.getProperty("/estlist");
			
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"Cloud_Group1_ProjectCloud_Group1_Project.view.contract.Dialog",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}

			
			aProducts.forEach(function (oProduct) {
				oProduct.selected = (oProduct.EstNo === sInputValue);
			});
			oModel.setProperty("/estlist", aProducts);
			
			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new sap.ui.model.Filter(
				"EstNo",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},
		_handleValueHelpSearch : function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"EstNo",
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
				this.byId("productInput").setValue(aContexts.map(function(oContext) { return oContext.getObject().EstNo; }).join(", "));
			}
			var sInputValue = this.byId("productInput").getValue();
			
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				+ "/sap/opu/odata/sap/Z_CLOUD_ESTIMATE_SRV";
			var url = "/getestiSet?$filter=PEstno eq '" + sInputValue + "'";
			var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
			var list;
			oDataModel.read(url, null, null, false, function(oData) {
				list = oData.results;
			});
			var oModel = new sap.ui.model.json.JSONModel({ "list" : list });
			this.getView().setModel(oModel , "list");
		},
		
		save: function () {
			var last = "";
			var abc  = "";
			var leg  = "";
			var abcd = "";
			var len  = "";
			
			var i;
			var end = this.getView().getModel("list").oData;
			var leg = this.getView().getModel("list").oData["list"].length - 1;
			
			var date1 = this.getView().byId("ContSdate").getValue();
			var date2 = this.getView().byId("ContDdate").getValue();
			last = end.list[leg].EstNo;
			abc = last.substr(7); // PO000001 자르기
			
			abcd = parseInt(abc) + 1; // int로 변환
			len = abc.length - abcd.toString().length; for(i=0;i<len;i++)
			{
				abcd = "0" + abcd ;
			};
		
			var cont2model = this.getView().getModel("list").oData;
			var length = this.getView().getModel("list").oData["list"].length;
		      var EstIndex = "",
		      cosdate = "",
		      coedate = "",
		      EstType1 = "",
		      EstPname = "",
		      EstCat1 = "",
		      EstCat2 = "",
		      EstCat3 = "",
		      EstVname = "",
		      EstVcode = "",
		      EstAmt = "",
		      EstPrice = "",
		      EstTotal = "",
		      EstTprice = "",
		      EstAddr = "",
		      EstVno = "",
		      EstEmail = "",
		      EstEtc = "",
		      EstCuky = "";
		      var iii = "0";
	      
		      for (iii = 0 ; iii < length ; iii++){
		      cosdate = date1,
		      coedate = date2,
		      EstIndex = cont2model.list[iii].EstIndex,
		      EstType1 = cont2model.list[iii].EstType1,
		      EstPname = cont2model.list[iii].EstPname,
		      EstCat1 = cont2model.list[iii].EstCat1,
		      EstCat2 = cont2model.list[iii].EstCat2,
		      EstCat3 = cont2model.list[iii].EstCat3,
		      EstVname = cont2model.list[iii].EstVname,
		      EstVcode = cont2model.list[iii].EstVcode,
		      EstAmt = cont2model.list[iii].EstAmt,
		      EstPrice = cont2model.list[iii].EstPrice,
		      EstTotal = cont2model.list[iii].EstTotal,
		      EstTprice = cont2model.list[iii].EstTprice,
		      EstAddr = cont2model.list[iii].EstAddr,
		      EstVno = cont2model.list[iii].EstVno,
		      EstEmail = cont2model.list[iii].EstEmail,
		      EstEtc = cont2model.list[iii].EstEtc,
		      EstCuky = cont2model.list[iii].EstCuky;
		      
		      var addr        = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000";
		      addr          += "/sap/opu/odata/sap/Z_CLOUD_CONT_SRV/getCreate1Set";
//		      
		      var paramData =
		      {
		    		"ContNo" : abcd,
		            "ContIndex" : EstIndex,
		            "ContSdate" : cosdate,
		            "ContEdate" : coedate,
		            "ContType" : EstType1,
		            "ContPname" : EstPname,
		            "ContCat1" : EstCat1,
		            "ContCat2" : EstCat2,
		            "ContCat3" : EstCat3,
		            "ContVname" : EstVname,
		            "ContVcode" : EstVcode,
		            "ContLamt" : "0",
		            "ContAmt" : EstAmt,
		            "ContEprice" : EstPrice,
		            "ContTprice" : EstTotal,
		            "ContPrice" : EstTprice,
		            "ContAddr" : EstAddr,
		            "ContVno" : EstVno,
		            "ContEmail" : EstEmail,
		            "ContEtc" : EstEtc,
		            "ContCuky" : EstCuky,
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
		
		},

		onPress : function (oEvent) {	//발주서 눌렀을 때 
//			var oItem = oEvent.getSource();
			var oRouter = UIComponent.getRouterFor(this);
//			var routerData = oItem.mAggregations.cells[1].mProperties.text;
//			var test = this.save();

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.warning(
					"계약서를 등록하시겠습니까?\n"  + "한번 계약서 등록 시 변경이 불가능합니다.",
					{
						icon: MessageBox.Icon.WARNING,
						title: "계약서 등록",
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						styleClass: bCompact ? "sapUiSizeCompact" : "",
						initialFocus: MessageBox.Action.CANCEL,
						onClose: function(oAction){
							if(oAction == 'OK'){
//								this.test;
							}
						}
					}
			);
		},
		
	});
});