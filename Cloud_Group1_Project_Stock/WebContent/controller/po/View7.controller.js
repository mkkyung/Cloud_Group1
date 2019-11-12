sap.ui
		.define(
				[ "sap/ui/core/mvc/Controller", "sap/ui/model/Filter",
						"sap/ui/core/routing/History",
						"sap/ui/core/UIComponent", "sap/ui/core/Fragment",
						"sap/m/routing/Router" ],
				function(Controller, Filter, History, UIComponent, Fragment,
						Router) {
					"use strict";

					return Controller
							.extend(
									"Cloud_Group1_ProjectCloud_Group1_Project.controller.po.View7",
									{
										MainData : function(searchData) {
											var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
													+ "/sap/opu/odata/sap/ZFIORI_STU03_DEV03_SRV";

											if (searchData != null) {
												var url = "/MainDataSet?$filter=PName eq '"
														+ searchData[0]
														+ "'"
														+ " and PCode eq '"
														+ searchData[1]
														+ "'"
														+ " and PGrade eq '"
														+ searchData[2]
														+ "'"
														+ " and PCan eq '"
														+ searchData[3] + "'";
											} else {
												var url = "/MainDataSet";
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

										onInit : function() {
											this.MainData();
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
											var oRouter = UIComponent
													.getRouterFor(this);
											var routerData = oItem.mAggregations.cells[0].mProperties.text;
											this.onClose(oRouter, 0);
										},
										onClose : function(oRouter, routerData) {
											oRouter.navTo("poDetail", {
												poDetail : routerData
											});
										},

									});
				});