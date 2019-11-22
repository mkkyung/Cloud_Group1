sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/m/routing/Router" 
], function (Controller, MessageToast, UIComponent, Router) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.vendor.Detail", {
		onInit: function () {                         
			this.editable(false, true, "None");
			
			this.getView().setModel(sap.ui.getCore().getModel("Detail"), "Detail");
		},
		editable : function(unvisi, visible, color) {		                             //버튼별 상태변경(수정, 저장, 취소, input 태그 valuestate 변경)
			var oModel = new sap.ui.model.json.JSONModel({
				"Edit" : visible
			});
			this.getView().setModel(oModel, "edit");
			
			var oModel2 = new sap.ui.model.json.JSONModel({
				"Enter" : unvisi
			});
			this.getView().setModel(oModel2, "enter");			

			var oModel3 = new sap.ui.model.json.JSONModel({
				"Cancel" : unvisi
			});
			this.getView().setModel(oModel3, "cancel");			
			
			var oModel4 = new sap.ui.model.json.JSONModel({
				"Color" : color
			});
			this.getView().setModel(oModel4, "color");
				
		},
		enter : function() {                                                              //저장버튼
			this.editable(false, true, "None");
		},		
		edit : function() {																  //수정버튼
			this.editable(true, false, "Success");
		},
		cancel : function() {
			this.editable(false, true, "None");											  //취소버튼
		},
		color : function() {															  //input 태그 valuestate 변경
			this.editable(true, false, "Success");
		},
		save : function() {
			var VCode= this.getView().getModel("Detail").oData.DetailData.VCode;
			
			var VName = this.getView().byId("VName").getValue().toUpperCase();
			
			var VCeo = this.getView().byId("VCeo").getValue().toUpperCase();

			var VCat = this.getView().byId("VCat").getValue().toUpperCase();

			var VAddr = this.getView().byId("VAddr").getValue().toUpperCase();

			var VNo = this.getView().byId("VNo").getValue().toUpperCase();

			var BsBc = this.getView().byId("BsBc").getValue().toUpperCase();

			var VTel = this.getView().byId("VTel").getValue().toUpperCase();
			
			var VFax = this.getView().byId("VFax").getValue().toUpperCase();
						
			var VEmail = this.getView().byId("VEmail").getValue().toUpperCase();
			
			var Bank = this.getView().byId("Bank").getValue().toUpperCase();
			
			var url = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				url += "/sap/opu/odata/sap/Z_CLOUD_VENDOR_SRV/ZTG1_VENSet";
			    url += "('" + VCode + "')";
			
			var updateData = {
					"VName" : VName,
					"VCat" : VCat,
					"VNo" : VNo,
					"VCeo" : VCeo,
					"VAddr" : VAddr,
					"VBs" : BsBc.split(" / ")[0],
					"VBc" : BsBc.split(" / ")[1],
 					"VTel" : VTel,
					"VFax" : VFax,
					"VEmail" : VEmail,
					"VBankn" : Bank.split(" / ")[0],
					"VBanka" : Bank.split(" / ")[1],
			};
			
			$.ajax({
		         type : "PUT",
		         url  : url,
		         data : JSON.stringify(updateData),
		            contentType: "application/json" ,
		              success: function(aa, bb, cc) {
		                 console.log("13 " + cc);
		              },
		            error: function(aa, bb, cc) { 
		               console.log("23 " + cc);
		            }
		      });
			
			this.enter();
			this.handleClose();
			
		},
		delete : function() {
			var VCode = this.getView().getModel("Detail").oData.DetailData.VCode;
			
			var url = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				url += "/sap/opu/odata/sap/Z_CLOUD_vendor_SRV/ZTG1_VENSet";
			    url += "('" + VCode + "')";
			    
			    $.ajax({
			         type : "DELETE",
			         url  : url,
			         data : JSON.stringify(VCode),
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

		handleClose : function() {                                                         // 닫기버튼
			sap.ui.getCore().byId("__xmlview0--fcl").setLayout(sap.f.LayoutType.OneColumn);	
		}
	});
}, true);

