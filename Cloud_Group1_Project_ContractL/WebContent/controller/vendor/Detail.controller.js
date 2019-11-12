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

		handleClose : function() {                                                         // 닫기버튼
			sap.ui.getCore().byId("__xmlview0--fcl").setLayout(sap.f.LayoutType.OneColumn);	
		}
	});
}, true);

