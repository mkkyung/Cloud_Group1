sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.vendor.List", {
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
		},
		handleMasterPress: function () {
			this.bus.publish("flexible", "setDetailPage");            //상세페이지 이동
		},
		handleCreatePress: function () {
			this.bus.publish("flexible", "setCreatePage")
		}
	});
}, true);
