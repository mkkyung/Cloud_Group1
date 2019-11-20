sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/m/routing/Router" 
], function (Controller, MessageToast, UIComponent, Router) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.products.Create", {
		onInit: function () { 
			this.Cat1();
			this.Cat2();
		},
		Cat1 : function() {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				+ "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV";
			var url = "/ZTG1_CAT1Set";
	
			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, true);
	
			var Cat1;
	
			oDataModel
					.read(
							url,
							null,
							null,
							false,
							function(oData) {
								Cat1 = oData.results;
							});
	
			var oModel = new sap.ui.model.json.JSONModel(
					{
						"Cat1" : Cat1
					});
	
			this.getView().setModel(oModel,
					"Cat1");
		},
		Cat2 : function() {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				+ "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV";
			var url = "/ZTG1_CAT2Set";
	
			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, true);
	
			var Cat2;
	
			oDataModel
					.read(
							url,
							null,
							null,
							false,
							function(oData) {
								Cat2 = oData.results;
							});
	
			var oModel = new sap.ui.model.json.JSONModel(
					{
						"Cat2" : Cat2
					});
	
			this.getView().setModel(oModel,
					"Cat2");
		},
		save : function() {
			
			var Cat1Name = this.getView().byId("Cat1Name").getValue().toUpperCase();
			
			var Cat1No = this.getView().byId("Cat1Name").getSelectedKey();
			
			var Cat2Name = this.getView().byId("Cat2Name").getValue().toUpperCase();
			
			var Cat2No = this.getView().byId("Cat2Name").getSelectedKey();

			var Cat3Name = this.getView().byId("Cat3Name").getValue().toUpperCase();

			var Cat3Price = this.getView().byId("Cat3Price").getValue().toUpperCase();

			var Cat3Made = this.getView().byId("Cat3Made").getValue().toUpperCase();

			var Cat3Date = this.getView().byId("Cat3Date").getValue().toUpperCase();
			
			var url = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				url += "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV/ZTG1_CAT3Set";
			
			var createData = {
					"Cat1Name" : Cat1Name,
					"Cat1No" : Cat1No,
					"Cat2Name" : Cat2Name,
					"Cat2No" : Cat2No,
					"Cat3Name" : Cat3Name,
					"Cat3Price" : Cat3Price,
					"Cat3Made" : Cat3Made,
					"Cat3Date" : Cat3Date
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
			
		},
		handleClose : function() {                                                         // 닫기버튼
			sap.ui.getCore().byId("__xmlview0--fcl").setLayout(sap.f.LayoutType.OneColumn);	
		}		
	});
}, true);

