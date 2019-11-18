sap.ui.define([
	"sap/m/SplitContainer",
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller"
], function (SplitContainer, Device, Controller) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.products.FlexibleColumnLayout", {
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("flexible", "setDetailPage", this.setDetailPage, this);
			this.bus.subscribe("flexible", "setCreatePage", this.setCreatePage, this);

			this.oFlexibleColumnLayout = this.getView().byId("fcl");
		},

		onExit: function () {
			this.bus.unsubscribe("flexible", "setDetailPage", this.setDetailPage, this);
			this.bus.unsubscribe("flexible", "setCreatePage", this.setCreatePage, this);
		},

		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailPage: function (oChannel, oEvent, oData) {

			
			if (!this.detailView) {
				sap.ui.getCore().setModel({oData : oData.productKey}, "SelectKey");
				this.detailView = new sap.ui.view({
					id: "midView",
					viewName: "Cloud_Group1_ProjectCloud_Group1_Project.view.products.Detail",
					type: "XML"
//					oData: new sap.ui.model.json.JSONModel({"data" : "data"}, "data2")
				});
			} else {
				this.detailView.setModel({oData : oData.productKey}, "SelectKey"); 
			}			
			
			
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.OneColumn);	
			this.oFlexibleColumnLayout.removeAllMidColumnPages();
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);	
			
		},
		setCreatePage: function () {
			
			if (!this.createView) {
				this.createView = sap.ui.view({
					id: "midView2",
					viewName: "Cloud_Group1_ProjectCloud_Group1_Project.view.products.Create",
					type: "XML"
				});
			}
			
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.OneColumn);	
			this.oFlexibleColumnLayout.removeAllMidColumnPages();
			this.oFlexibleColumnLayout.addMidColumnPage(this.createView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);	
			
		}
	});
}, true);