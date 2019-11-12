sap.ui.define([ "sap/ui/core/UIComponent", "sap/m/routing/Router" ], function(
		UIComponent, Router) {
	"use strict";


	var Component = UIComponent.extend("Cloud_Group1_ProjectCloud_Group1_Project.Component", {

				metadata : {					

					manifest : "json"

				},
			init : function() {
					UIComponent.prototype.init.apply(this, arguments);

//					this.getRouter().initialize(); // 라우팅
					// 초기화

				}
			});
	return Component;
}, true);
