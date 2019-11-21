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
			this.bus.subscribe("flexible", "setListPage", this.setListPage, this);

			this.oFlexibleColumnLayout = this.getView().byId("fcl");
		},

		onExit: function () {
			this.bus.unsubscribe("flexible", "setDetailPage", this.setDetailPage, this);
			this.bus.unsubscribe("flexible", "setCreatePage", this.setCreatePage, this);
			this.bus.unsubscribe("flexible", "setListPage", this.setListPage, this);
		},
		DetailData : function(key) {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
					+ "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV";
			var url = "/ZTG1_CAT3Set('" + key + "')";

			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, true);

			var DetailData;

			oDataModel
					.read(
							url,
							null,
							null,
							false,
							function(oData) {
								DetailData = oData;
							});

			var oModel = new sap.ui.model.json.JSONModel(
					{
						"DetailData" : DetailData
					});

			this.getView().setModel(oModel,
					"DetailData");
			
			return oModel;
		},

		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailPage: function (oChannel, oEvent, oData) {
			var Detail = this.DetailData(oData.productKey);
						
			if (!this.detailView) {
				sap.ui.getCore().setModel(Detail, "Detail");
				this.detailView = new sap.ui.view({
					id: "midView",
					viewName: "Cloud_Group1_ProjectCloud_Group1_Project.view.products.Detail",
					type: "XML"
				});
			} else {
				this.detailView.setModel(Detail, "Detail"); 
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
			
		},
		setListPage : function() {
			if (!this.listView) {
				this.listView = sap.ui.view({
					id: "listview",
					viewName: "Cloud_Group1_ProjectCloud_Group1_Project.view.products.List",
					type: "XML"
				});
			}
			
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.OneColumn);
			
		}
	});
}, true);