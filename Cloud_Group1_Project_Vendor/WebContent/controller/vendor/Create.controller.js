sap.ui.define(
			[ "sap/ui/core/mvc/Controller", "sap/m/MessageToast",
					"sap/ui/core/UIComponent", "sap/m/routing/Router" ],
			function(Controller, MessageToast, UIComponent, Router) {
				"use strict";

				return Controller
						.extend(
								"Cloud_Group1_ProjectCloud_Group1_Project.controller.vendor.Create",
								{
									onInit : function() {

									},
									save : function() {
										
										var VName = this.getView().byId("VName").getValue().toUpperCase();
										
										var VCat = this.getView().byId("VCat").getValue().toUpperCase();
										
										var VNo = this.getView().byId("VNo").getValue().toUpperCase();
										
										var VCeo = this.getView().byId("VCeo").getValue().toUpperCase();

										var VAddr = this.getView().byId("VAddr").getValue().toUpperCase();

										var VBs = this.getView().byId("VBs").getValue().toUpperCase();

										var VBc = this.getView().byId("VBc").getValue().toUpperCase();

										var VTel = this.getView().byId("VTel").getValue().toUpperCase();
										
										var VFax = this.getView().byId("VFax").getValue().toUpperCase();
										
										var VEmail = this.getView().byId("VEmail").getValue().toUpperCase();
										
										var VBankn = this.getView().byId("VBankn").getValue().toUpperCase();
										
										var VBanka = this.getView().byId("VBanka").getValue().toUpperCase();
										
										var url = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
											url += "/sap/opu/odata/sap/Z_CLOUD_VENDOR_SRV/ZTG1_VENSet";
										
										var createData = {
												"VName" : VName,
												"VCat" : VCat,
												"VNo" : VNo,
												"VCeo" : VCeo,
												"VAddr" : VAddr,
												"VBs" : VBs,
												"VBc" : VBc,
												"VTel" : VTel,
												"VFax" : VFax,
												"VEmail" : VEmail,
												"VBankn" : VBankn,
												"VBanka" : VBanka
										};
										
										$.ajax({
									         type : "POST",
									         url  : url,
									         data : JSON.stringify(createData),
									            contentType: "application/json" ,
									              success: function(aa, bb, cc) {
									                 console.log("13 " + cc);
									              },
									            error: function(aa, bb, cc) { 
									               console.log("23 " + cc);
									            }
									      });
										
										this.handleClose();
									},
									handleClose : function() { // 닫기버튼
										sap.ui.getCore().byId("__xmlview0--fcl").setLayout(sap.f.LayoutType.OneColumn);
									},

								});
			}, true);
