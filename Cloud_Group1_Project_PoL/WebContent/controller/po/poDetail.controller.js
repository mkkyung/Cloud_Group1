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

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.po.poDetail", {

		onInit: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("poDetail").attachPatternMatched(this._onObjectMatched, this);
			
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
		
		
		
		save : function() {
		var PoNo = this.getView().getModel("GETPOSet").oData.GETPOSet[0].PoNo;	
		var PoIndex = this.getView().getModel("GETPOSet").oData.GETPOSet[0].PoIndex;     
		var PoAmt = this.getView().getModel("GETPOSet").oData.GETPOSet[0].PoAmt;
		
		var poData = this.getView().getModel("GETPOSet").oData.GETPOSet; //리스트에 있는 데이터의 모든 row

		for(var i = 0; i < poData.length; i++ ) {
			var iPoNo = poData[i].PoNo;	
			var iPoIndex = poData[i].PoIndex;	
			var iPoAmt = poData[i].PoAmt;
			
			var addr        = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/sap/opu/odata/sap/Z_CLOUD_PUOR_SRV/getcreateSet";
		      	addr       += "(PoNo='"+iPoNo+"',PoIndex='"+iPoIndex+"')";
		    var updateData = {
		    		"PoNo" : iPoAmt,
		    		"PoIndex" : iPoIndex,
		    		"PoAmt" : Number(iPoAmt)
		    };
		      
		    this.callAjax("PUT", addr, updateData); // 리스트 갯수만큼 돌릴려면 for문 안에 있어야해요 ^^
		}

//	      this.enter();
	
	},
	callAjax : function(type, url, data) {
		$.ajax({
	         type : type,
	         url  : url,
	         data : JSON.stringify(data),
	            contentType: "application/json" ,
	              success: function(aa, bb, cc) {
	                 console.log("13 " + cc);
	              },
	            error: function(aa, bb, cc) { 
	               console.log("23 " + cc);
	            }
	      });
		this.enter();
	},
	
	
		
		
		
		
		
		
		
		
		handleClose : function() {                                                         // 닫기버튼
			sap.ui.getCore().byId("__xmlview0--fcl").setLayout(sap.f.LayoutType.OneColumn);	
			this.enter();
		},
		
		
		
		_onObjectMatched: function (oEvent) {
			var oRouter = UIComponent.getRouterFor(this);
//			this.getView().bindElement({
//				path: "/" + oEvent.getParameter("arguments").EstPath,
//				model: "poDetail"
//			});
			var filter = oEvent.getParameter("arguments").poDetail;
			this.getData(filter);
		},
		
		//임시 데이터 전달 필드
		getData : function(filter){
	        var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"; // 로컬 서버 연결 하는 거 
	        sServiceUrl += "/sap/opu/odata/sap/Z_CLOUD_PUOR_SRV";   // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
	        var url;
	        url = "/GETPOSet?$filter=PPoNo eq '" + filter + "' and PPoCrud eq 'A'";
//	        url = "/GETPOSet"
	     
	        var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
	        var data;
	        oDataModel.read(url, null, null, false, function (oData) {
	           data = oData.results;
	        });
	        var oModel = new sap.ui.model.json.JSONModel({ "GETPOSet": data });
	        this.getView().setModel(oModel , "GETPOSet");
	        
		},
	
		
	
		cancel : function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);							//just before screen
			} else {
				var oRouter = UIComponent.getRouterFor(this);	//before screen in process flow
				oRouter.navTo("view7", {}, true);
			}
			this.enter();
		},
		
		goBack : function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);							//just before screen
			} else {
				var oRouter = UIComponent.getRouterFor(this);	//before screen in process flow
				oRouter.navTo("List", {}, true);
			}
		},
		})
	});
	