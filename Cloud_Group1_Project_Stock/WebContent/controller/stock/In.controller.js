sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	'sap/m/Text'
], function(jQuery, Controller, Filter, JSONModel, Text) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.stock.In", {	//입고화면
		onInit: function() {
			this.getData('display');
			this.getData('filter');
			
		},
		
		onApproveDialog : function(oEvent){
			var oItem = oEvent.getSource();
			
			var oContext = oItem.getBindingContext("view");
			var sPath = oContext.getPath();
//			var oIdProductsTable= this.byId("idProductsTable");
//			oProductDetailPanel.bindElement({ path: sPath, model: "view" });
			
//	         var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//	         var routerData = oItem.mAggregations.cells[0].mProperties.text;
//	         routerData = oItem.getBindingContext("estlist").getPath().substr(1);
//	         this.onClose(oRouter, 0);
			var a = sPath.substr(6,7);
		
			var dialog = new sap.m.Dialog({
				title: '입고등록',
				type: 'Message',
				content: new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: '120px',
							content: [
								new Text({ text: '입고번호  : ' }),
								new Text({ text: '입고일자 : ' }),
								new Text({ text: '입고수량 :' }),
								new Text({ text: '입고담당 :' }),
								new Text({ text: '제품명 :' }),
								new Text({ text: '제품코드 :' })
							]
						}),
						new sap.ui.layout.VerticalLayout({
							content: [
								new Text({ text: oContext.oModel.oData.data[a].Mandt }),
								new Text({ text: oContext.oModel.oData.data[a].Zcolu }),
								new Text({ text: oContext.oModel.oData.data[a].Mandt }),
								new Text({ text: oContext.oModel.oData.data[a].Zcolu }),
								new Text({ text: oContext.oModel.oData.data[a].Mandt }),
								new sap.m.TextArea({ value: oContext.oModel.oData.data[a].Zwfac, height: '50px', width: '80%'})
//								new Input({ text:oItem.mAggregations.cells[1].mProperties.text  }),
//								new Text({ text: oItem.mAggregations.cells[1].mProperties.text }),
//								new Text({ text: oItem.mAggregations.cells[1].mProperties.text }),
//								new Text({ text: oItem.mAggregations.cells[1].mProperties.text }),
//								new Text({ text: oItem.mAggregations.cells[2].mProperties.text })
							]
						})
					]
				}),

				beginButton: new sap.m.Button({
					text: 'Submit',
					press: function () {
						MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		
		onPress : function(oEvent){
//			var oSelectedItem = oEvent.getSource();
//			var oContext = oSelectedItem.getBindingContext("view");
//			var sPath = oContext.getPath();
//			var oProductDetailPanel = this.byId("idProductsTable");
//			oProductDetailPanel.bindElement({ path: sPath, model: "view" });
			
			 var oItem = oEvent.getSource();
	         var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	         var routerData = oItem.mAggregations.cells[0].mProperties.text;
//	         routerData = oItem.getBindingContext("estlist").getPath().substr(1);
//	         this.onClose(oRouter, 0);
			var i;
			var dialog = new sap.m.Dialog({
				title: '자재정보',
				type: 'Message',
				content: new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: '120px',
							content: [
								new Text({ text: '제품명  : ' }),
								new Text({ text: '제품코드 : ' }),
								new Text({ text: '공급업체명 :' })
							]
						}),
						new sap.ui.layout.VerticalLayout({
							content: [
								new Text({ text: oItem.mAggregations.cells[0].mProperties.text }),
								new Text({ text: oItem.mAggregations.cells[1].mProperties.text }),
								new Text({ text: oItem.mAggregations.cells[2].mProperties.text })
							]
						})
					]
				}),

				beginButton: new sap.m.Button({
					text: 'Submit',
					press: function () {
						MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		
		getData : function(type){
			
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";   //CORSerror나면 http:// 를 proxy/http/로
	         	sServiceUrl +=  "/sap/opu/odata/sap/ZGROUP06_FUCNMOD_03_SRV/"; // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.

//	        var url = this.filter(type);
	        var url =  "/getdata1Set";
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
            this.oModel = new JSONModel();
	        var data;
	        oDataModel.read(url, null, null, false, function(oData){
	            data = oData.results;
	         });
	         var oModel = new sap.ui.model.json.JSONModel({ "data" : data });
//	         var oModel = new sap.ui.model.json.JSONModel(data); // {results : [] }
	         this.getView().setModel(oModel, "view"); 
		},
		
		filter : function(type){
			var url;
			if(type == 'filter'){//필터 검색
				var title = this.byId("slName");//.getValue();//.toUpperCase();
//				var text = this.byId("text").getSelectedKey();
				var text = this.byId("slCategory");//.getValue();//.toUpperCase();
				
				if(title || text){
					url = "/getdata1Set?$filter=LvTitle eq '" + title + 
			  	   	  "' and LvText eq '" + text +"'";
				}else{
					url = "/getdata1Set";
				}
				
			}else if(type == 'display'){//조회
				url = "/getdata1Set";
			}
				
			return url;
		},

		goBack : function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);							//just before screen
			} else {
//				var oRouter = UIComponent.getRouterFor(this);	//before screen in process flow
//				oRouter.navTo("view4", {}, true);
				alert("전 화면이 없습니다.");
			}
		},
		
	});
});