sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/m/routing/Router",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, UIComponent, Router, JSONModel) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.products.Detail", {
		
		onInit: function () {
			this.editable(false, true, "None");
			
			this.getView().setModel(sap.ui.getCore().getModel("Detail"), "Detail");			
			
			this.bus = sap.ui.getCore().getEventBus();
		},
		
		editable : function(unvisi, visible, color) {
			
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
			var Cat3No = this.getView().getModel("Detail").oData.DetailData.Cat3No;
			
			var Cat3Name = this.getView().byId("Cat3Name").getValue().toUpperCase();

			var Cat3Price = this.getView().byId("Cat3Price").getValue().toUpperCase();

			var Cat3Made = this.getView().byId("Cat3Made").getValue().toUpperCase();

			var Cat3Date = this.getView().byId("Cat3Date").getValue().toUpperCase();
			
			var url = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				url += "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV/ZTG1_CAT3Set";
			    url += "('" + Cat3No + "')";
			
			var updateData = {
					"Cat3No" : Cat3No,
					"Cat3Name" : Cat3Name,
					"Cat3Price" : Cat3Price.split(",").join(""),
					"Cat3Made" : Cat3Made,
					"Cat3Date" : Cat3Date.split(".").join("")
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
			this.bus.publish("flexible", "setListPage");
			
		},
		delete : function() {
			var Cat3No = this.getView().getModel("Detail").oData.DetailData.Cat3No;
			
			var url = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
				url += "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV/ZTG1_CAT3Set";
			    url += "('" + Cat3No + "')";
			    
			    $.ajax({
			         type : "DELETE",
			         url  : url,
			         data : JSON.stringify(Cat3No),
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

