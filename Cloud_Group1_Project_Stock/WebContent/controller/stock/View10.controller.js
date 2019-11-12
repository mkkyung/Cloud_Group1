sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/routing/Router" 
], function(Controller, History, UIComponent, Router) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.stock.View10", {	//분출화면
//		go 입고
		
		onInit: function() {
			this.getData();
			
		var testData = {
				"OutCollection": [
					{
						"outNo": "out001",
						"outCat3": "AWFE145",
						"outTotal": "10",
						"outDate": "2019.11.05",
						"outPart": "SS574",
						"outPic": "KEE",
						"outEtc": "ASB",
						
						
					},
					{
						"outNo": "out002",
						"outCat3": "DDD9S",
						"outTotal": "2",
						"outDate": "2019.11.05",
						"outPart": "AAA",
						"outPic": "KS",
						"outEtc": "A66",
						
					},
					{
						"outNo": "out003",
						"outCat3": "AD5",
						"outTotal": "20",
						"outDate": "2019.11.07",
						"outPart": "BMW",
						"outPic": "KO",
						"outEtc": "VVV",
						
					}
				],

"ProductCollectionStats": {
					"Counts": {
						"Total": 123,
						"Weight": {
							"Ok": 53,
							"Heavy": 51,
							"Overweight": 19
						}
					},
					"Groups": {
						"Category": {
							"Accessories" : 34,
							"Desktop Computers" : 7,
							"Flat Screens" : 2,
							"Keyboards" : 4,
							"Laptops" : 11,
							"Printers" : 9,
							"Smartphones and Tablets" : 9,
							"Mice" : 7,
							"Computer System Accessories" : 8,
							"Graphics Card" : 4,
							"Scanners" : 4,
							"Speakers" : 3,
							"Software" : 8,
							"Telekommunikation" : 3,
							"Servers" : 3,
							"Flat Screen TVs" : 3
						},
						"SupplierName": {
							"Titanium": 21,
							"Technocom": 22,
							"Red Point Stores": 7,
							"Very Best Screens": 14,
							"Smartcards": 2,
							"Alpha Printers": 5,
							"Printer for All": 8,
							"Oxynum": 8,
							"Fasttech": 15,
							"Ultrasonic United": 15,
							"Speaker Experts": 3,
							"Brainsoft": 3
						}
					},
					"Filters": [
						{
							"type": "Category",
							"values": [
								{
									"text": "Accessories",
									"data": 34
								},
								{
									"text": "Desktop Computers",
									"data": 7
								},
								{
									"text": "Flat Screens",
									"data": 2
								},
								{
									"text": "Keyboards",
									"data": 4
								},
								{
									"text": "Laptops",
									"data": 11
								},
								{
									"text": "Printers",
									"data": 9
								},
								{
									"text": "Smartphones and Tablets",
									"data": 9
								},
								{
									"text": "Mice",
									"data": 7
								},
								{
									"text": "Computer System Accessories",
									"data": 8
								},
								{
									"text": "Graphics Card",
									"data": 4
								},
								{
									"text": "Scanners",
									"data": 4
								},
								{
									"text": "Speakers",
									"data": 3
								},
								{
									"text": "Software",
									"data": 8
								},
								{
									"text": "Telekommunikation",
									"data": 3
								},
								{
									"text": "Servers",
									"data": 3
								},
								{
								  "text": "Flat Screen TVs",
								  "data": 3
								}
							]
						},
						{
							"type": "SupplierName",
							"values": [
								{
								"text": "Titanium",
								"data": 21
							  },
							  {
								"text": "Technocom",
								"data": 22
							  },
							  {
								"text": "Red Point Stores",
								"data": 7
							  },
							  {
								"text": "Very Best Screens",
								"data": 14
							  },
							  {
								"text": "Smartcards",
								"data": 2
							  },
							  {
								"text": "Alpha Printers",
								"data": 5
							  },
							  {
								"text": "Printer for All",
								"data": 8
							  },
							  {
								"text": "Oxynum",
								"data": 8
							  },
							  {
								"text": "Fasttech",
								"data": 15
							  },
							  {
								"text": "Ultrasonic United",
								"data": 15
							  },
							  {
								"text": "Speaker Experts",
								"data": 3
							  },
							  {
								"text": "Brainsoft",
								"data": 3
							  }
							]
						}
					]
				}
			};
		var oJSONModel = new sap.ui.model.json.JSONModel();
		oJSONModel.setData(testData);
		this.getView().setModel(oJSONModel);
		//var oModel = new sap.ui.model.json.JSONModel({ "data": testData });
        //this.getView().setModel(oModel , "polist");
        
        console.log(this.getView().getModel());
		},
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
	        this.getView().setModel(oModel , "outlist");
		},
		
		
		
		onShowIn : function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("in");
		},
//		go 재고
		onShowStock : function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view9");
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
		
		}
		});
	});