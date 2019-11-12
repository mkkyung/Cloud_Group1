sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		"sap/ui/core/routing/History",
		"sap/ui/core/UIComponent",
		'sap/m/Label',
		'sap/ui/model/Filter',
		'sap/m/MessageBox'
	], function(jQuery, Controller, JSONModel , History, UIComponent, Label, Filter, MessageBox) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.estimate.estlookup", {

		onInit: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("estlookup").attachPatternMatched(this._onObjectMatched, this);
			this.getData();
			
			
//			통화 설정
			var oViewModel = new JSONModel({
				currency: "KRW"
			});
			this.getView().setModel(oViewModel, "view");
		},
		
		_onObjectMatched: function (oEvent) {
			var oRouter = UIComponent.getRouterFor(this);
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").EstPath,
				model: "estlist"
			});
			
		},
		
		//임시 데이터 전달 필드
		getData : function(){
	        var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"; // 로컬 서버 연결 하는 거 
	        sServiceUrl += "/sap/opu/odata/sap/Z_FUNC_ESTIMATE_TEST_SRV";   // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
	        var url;
	        url = "/getestSet";
	     
	        var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
	        var data;
	        oDataModel.read(url, null, null, false, function (oData) {
	           data = oData.results;
	        });
	        var oModel = new sap.ui.model.json.JSONModel({ "data": data });
	        this.getView().setModel(oModel , "estlist");
	        
//	        총합 로직으로 최종 합계 금액은 sum에 담기게 된다 
//	        var aaa = parseInt(oModel.oData.data[0].EstTotal);	// 배열
//	        var bbb = oModel.oData.data.length;
//	        var sum = 0;
//	        var i = 0;
//	        for (i = 0; i < bbb; i++) {
//	        	sum += parseInt(data[i].EstTotal)*1000;
//	        }
////	        oMdel2에 데이터를 담아줌으로써 sum 변수를 view에 사용
//    		sum =  sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//	        var oModel2 = new sap.ui.model.json.JSONModel({ "sum": sum });
//	        this.getView().setModel(oModel2 , "sum");
	        
		},
	//임시 데이터 전달 필드
		onShow : function(oEvent){
			var oItem = oEvent.getSource();
			var oRouter = UIComponent.getRouterFor(this);
//			var routerData = oItem.mAggregations.cells[1].mProperties.text;
//			
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.warning(
					"계약서 화면으로 이동하시겠습니까?",
					{
						icon: MessageBox.Icon.WARNING,
						title: "계약서 상세 조회",
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						styleClass: bCompact ? "sapUiSizeCompact" : "",
						initialFocus: MessageBox.Action.CANCEL,
						onClose: function(oAction){
							if(oAction == 'OK'){
								oRouter.navTo("view3");
							}
						}
					}
			);
		},
		
		goBack : function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);							//just before screen
			} else {
				var oRouter = UIComponent.getRouterFor(this);	//before screen in process flow
				oRouter.navTo("view2", {}, true);
			}
		},
		

		
	});

});
