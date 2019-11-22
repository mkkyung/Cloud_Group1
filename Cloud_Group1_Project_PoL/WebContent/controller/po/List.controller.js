sap.ui
		.define(
				[ "sap/ui/core/mvc/Controller", "sap/ui/model/Filter",
						"sap/ui/core/routing/History",
						'sap/ui/model/json/JSONModel',
						"sap/ui/core/UIComponent", "sap/ui/core/Fragment",
						"sap/m/routing/Router" ],
				function(Controller, Filter, History, JSONModel, UIComponent, Fragment, 
						Router) {
					"use strict";

					return Controller
							.extend(
									"Cloud_Group1_ProjectCloud_Group1_Project.controller.po.List",
									{
										GETPOSet : function(PONO) {
											var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
												sServiceUrl += "/sap/opu/odata/sap/Z_CLOUD_PUOR_SRV";
											var url = "/GETPOSet";
//											var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_PO_SRV";
////													+ "/sap/opu/odata/sap/Z_CLOUD_PO_SRV";
											var LIGHT = this.getView().byId("idIconTabBar").getSelectedKey();
//											var url = "/GETPOSet";
								        	
//											
											var PoLight = "";
								        	var url;
								        	
											if( LIGHT === "ALL")
											{ 			
											}else if (LIGHT === "A") { 
												PoLight = "대기";
											}else if (LIGHT === "B") { 
												PoLight = "완료";
											 }
											if (PONO == undefined) {
												 url = "/GETPOSet";
											} else {
												 url = "/GETPOSet?$filter=PPoLight eq '"
														+ PoLight + "'";
											}

											var oDataModel = new sap.ui.model.odata.ODataModel(
													sServiceUrl, true);

											var GETPOSet;

											oDataModel
													.read(
															url,
															null,
															null,
															false,
															function(oData) {
																GETPOSet = oData.results;
															});

											var oModel = new sap.ui.model.json.JSONModel(
													{
														"GETPOSet" : GETPOSet
													});

											this.getView().setModel(oModel,
													"GETPOSet");

								   			var oDataModel= new sap.ui.model.odata.ODataModel(sServiceUrl,true);
								   			var data;
								   			oDataModel.read(url, null, null, false, function(oData) {
								   				data = oData.results;
								   			});
								        var oModel = new sap.ui.model.json.JSONModel({ "GETPOSet": data });
								        this.getView().setModel(oModel , "GETPOSet");
										},

										onInit : function() {
											this.GETPOSet();
											
//											통화 설정
											var oViewModel = new JSONModel({
												currency: "KRW"
											});
											this.getView().setModel(oViewModel, "view");
										},

										handleValueHelp : function(oEvent) {
											var sInputValue = oEvent
													.getSource().getValue();

											this.inputId = oEvent.getSource()
													.getId();
											// create value help dialog
											if (!this._valueHelpDialog) {
												this._valueHelpDialog = sap.ui
														.xmlfragment(
																"Cloud_Group1_ProjectCloud_Group1_Project.view.po.Dialog",
																this);
												this.getView().addDependent(
														this._valueHelpDialog);
											}

											// create a filter for the binding
											this._valueHelpDialog
													.getBinding("items")
													.filter(
															[ new sap.ui.model.Filter(
																	"BName",
																	sap.ui.model.FilterOperator.Contains,
																	sInputValue) ]);

											// open value help dialog filtered
											// by the input value
											this._valueHelpDialog
													.open(sInputValue);
										},

										_handleValueHelpSearch : function(evt) {
											var sValue = evt
													.getParameter("value");
											var oFilter = new sap.ui.model.Filter(
													"EstCat1",
													sap.ui.model.FilterOperator.Contains,
													sValue);
											evt.getSource().getBinding("items")
													.filter([ oFilter ]);
										},

										_handleValueHelpClose : function(evt) {
											var oSelectedItem = evt
													.getParameter("selectedItem");
											if (oSelectedItem) {
												var productInput = this
														.getView().byId(
																this.inputId), oText = this
														.getView().byId(
																'selectedKey'), sDescription = oSelectedItem
														.getDescription();

												productInput
														.setSelectedKey(sDescription);
												oText.setText(sDescription);
											}
											evt.getSource().getBinding("items")
													.filter([]);
										},

										suggestionItemSelected : function(evt) {

											var oItem = evt
													.getParameter('selectedItem'), oText = this
													.getView().byId(
															'selectedKey'), sKey = oItem ? oItem
													.getKey()
													: '';

											oText.setText(sKey);
										},

										goBack : function(oEvent) {
											var oHistory = History
													.getInstance();
											var sPreviousHash = oHistory
													.getPreviousHash();

											if (sPreviousHash !== undefined) {
												window.history.go(-1); // just
												// before
												// screen
											} else {
												var oRouter = UIComponent
														.getRouterFor(this); // before
												// screen
												// in
												// process
												// flow
												oRouter
														.navTo("view6", {},
																true);
											}
											
										
											
											
											
										},
										onPress : function(oEvent) { // 계약서  눌렀을 때
											var oItem = oEvent.getSource();
											var oRouter = UIComponent.getRouterFor(this);
											var routerData = oItem.mAggregations.cells[0].mProperties.text;
											var path = oItem.oBindingContexts.GETPOSet.sPath;
											var rowIdx = path.split('/GETPOSet/')[1];
											var rowData = this.getView().getModel("GETPOSet").oData.GETPOSet[rowIdx];
											this.onClose(oRouter, routerData, rowData);
											
										},	
											
											onSearch: function() {
												var PONO = "";
												var PODATE = "";
												var PODDATE = "";
												var POVNAME = "";
												var POVCODE = "";
												var POPNAME = "";
												var POPCODE = "";
												var POEDATE = "";
												var POEDDATE = "";
												var change = this.getView().byId("idIconTabBar").getSelectedKey();
//												
												if(change === "All"){
													PONO = this.getView().byId("PO_N1").getValue();
													PODATE = this.getView().byId("PO_DF1").getValue();
													PODDATE = this.getView().byId("PO_DT1").getValue();
													POVNAME = this.getView().byId("VN1").getValue();
													POVCODE = this.getView().byId("VC1").getValue();
													POPNAME = this.getView().byId("PN1").getValue();
													POPCODE = this.getView().byId("PC1").getValue();
													POEDATE = this.getView().byId("IN_DF1").getValue();
													POEDDATE = this.getView().byId("IN_DT1").getValue();
												}else if (change === "A"){
													PONO = this.getView().byId("PO_N2").getValue();
													PODATE = this.getView().byId("PO_DF2").getValue();
													PODDATE = this.getView().byId("PO_DT2").getValue();
													POVNAME = this.getView().byId("VN2").getValue();
													POVCODE = this.getView().byId("VC2").getValue();
													POPNAME = this.getView().byId("PN2").getValue();
													POPCODE = this.getView().byId("PC2").getValue();
													POEDATE = this.getView().byId("IN_DF2").getValue();
													POEDDATE = this.getView().byId("IN_DT2").getValue();
												}
												else if (change === "B"){
//													PONO = this.getView().byId("PO_N3").getValue();
//													PODATE = this.getView().byId("PO_DF3").getValue();
//													PODDATE = this.getView().byId("PO_DT3").getValue();
//													POVNAME = this.getView().byId("VN3").getValue();
//													POVCODE = this.getView().byId("VC3").getValue();
//													POPNAME = this.getView().byId("PN3").getValue();
//													POPCODE = this.getView().byId("PC3").getValue();
//													POEDATE = this.getView().byId("IN_DF3").getValue();
//													POEDDATE = this.getView().byId("IN_DT3").getValue();
												}
//												
											    this.GETPOSet(PONO,PODATE,PODDATE,POVNAME,POVCODE,POPNAME,POPCODE,POEDATE,POEDDATE);
											},
											
											handleIconTabBarSelect: function (oEvent) {		
												this.onSearch();		

											},	
											
										
											
									
										onClose: function(oRouter, routerData, rowData) {
											oRouter.navTo("poDetail", {
												//poHeader : rowData,
												poDetail : routerData
											});
										},
									
					});
				});