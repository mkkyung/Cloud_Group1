sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Text',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(jQuery, Controller, JSONModel, Text, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.stock.In", {	//입고화면
		onInit: function() {
			this.getData('display');
			this.getData('filter');
			
		},
		
		onApproveDialog : function(oEvent){
			var oItem = oEvent.getSource();
			
			var oContext = oItem.getBindingContext("Po");
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
							content: [//입고번호(abap),입고일자,발주번호   // 위치는 뺌
								new Text({ text: '제품명 :' }),
								new Text({ text: '제품코드 :' }),
								new Text({ text: '공급업체명 :' }),
								new Text({ text: '공급업체코드 :' }),
								new Text({ text: '입고완료일  : ' }),//5
								new Text({ text: '발주수량 :' }),
								new Text({ text: '입고수량 :  ' }),
								new Text({ text: '입고담당:' }),
								new Text({ text: '입고상태 :' }),
								new Text({ text: '발주일자 :' })
							]
						}),
						new sap.ui.layout.VerticalLayout({
							content: [
								new Text({ text: oContext.oModel.oData.data[a].PoPname }),
								new Text({ text: oContext.oModel.oData.data[a].PoCat3No }),
								new Text({ text: oContext.oModel.oData.data[a].PoVname }),
								new Text({ text: oContext.oModel.oData.data[a].PoVcode }),
								new sap.m.TextArea({ value: oContext.oModel.oData.data[a].PoTotal,
																height: '50px', width: '80%'}), //오늘 날짜**********
								new Text({ text: oContext.oModel.oData.data[a].PoTotal }),
								new Text({ text: oContext.oModel.oData.data[a].InAmt }),
								new Text({ text: oContext.oModel.oData.data[a].PoVcode }),//입고담당
								new Text({ text: oContext.oModel.oData.data[a].InIcon }),
								new Text({ text: oContext.oModel.oData.data[a].PoDate}),
								
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
		
		onTablePress : function(oEvent){
//			var oSelectedItem = oEvent.getSource();
//			var oContext = oSelectedItem.getBindingContext("view");
//			var sPath = oContext.getPath();
//			var oProductDetailPanel = this.byId("idProductsTable");
//			oProductDetailPanel.bindElement({ path: sPath, model: "view" });
			
//	         routerData = oItem.getBindingContext("estlist").getPath().substr(1);
//	         this.onClose(oRouter, 0);
			
			var oItem = oEvent.getSource();
	        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	        var routerData = oItem.mAggregations.cells[0].mProperties.text;
	        var index = oEvent.mParameters.valueOf().id.split('-');//row위치
	        
			var i;
			var dialog = new sap.m.Dialog({
				title: '자재 상세정보',
				type: 'Message',
				content: new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: '120px',
							content: [
								new Text({ text: '제품명  : ' }),
								new Text({ text: '제품코드 : ' }),
								new Text({ text: '\n공급업체명 :' }),
								new Text({ text: '공급업체코드 :' }),
								new Text({ text: '\n발주수량 :' }),
								new Text({ text: '입고수량 :' }),
								new Text({ text: '입고상태:' }),
								new Text({ text: '가용수량 :' }),
//								new Text({ text: '\n입고위치 :' }),
								new Text({ text: '비고:' })
							]
						}),
						new sap.ui.layout.VerticalLayout({//oItem.getBindingContext("view").oModel.oData.data[0]
							content: [
								new Text({ text: oItem.mAggregations.cells[0].mProperties.title}),//제품명
								new Text({ text: oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].PoCat3No}),//제품코드
								new Text({ text: '\n'+oItem.mAggregations.cells[1].mProperties.text }),//공급업체명
								new Text({ text: oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].PoCat3No }),//공급업체코드
								new Text({ text: '\n\n'+oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].PoAmt }),//발주수량
								new Text({ text: oItem.mAggregations.cells[3].mProperties.text }),//입고수량
								new Text({ text: oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].InIcon}),//입고상태
								new Text({ text: oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].Inavail }), //가용수량
								new Text({ text: '\n'+oItem.getBindingContext("In").oModel.oData.data[index[index.length-1]].InStock }),//입고위치
								new Text({ text: oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].PoEtc })//비고
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
			//입고
			var sServiceUrlIn = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";   //CORSerror나면 http:// 를 proxy/http/로
	         	sServiceUrlIn +=  "/sap/opu/odata/sap/Z_CLOUD_STOCK_SRV_01/"; // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
	        var urlIn =  "/ztg1_inSet";
	        //filter
//	        var url = this.filter()type;
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrlIn,true);
//            this.oModel = new JSONModel();
	        var dataIn;
	        oDataModel.read(urlIn, null, null, false, function(oData){
	            dataIn = oData.results;
	         });
	         
	        //dataIn.length
	        
	        //공급업체에서 받아오자
	        //제품
			var sServiceUrlPro = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";   //CORSerror나면 http:// 를 proxy/http/로
	         	sServiceUrlPro +=  "/sap/opu/odata/sap/Z_CLOUD_PRODUCTS_SRV/"; // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
	        var urlIn =  "/ZTG1_CAT3Set";
	        //filter
//	        var url = this.filter()type;
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrlPro,true);
//            this.oModel = new JSONModel();
	        var dataPro;
	        oDataModel.read(urlIn, null, null, false, function(oData){
	            dataPro = oData.results;
	         });
	        
	        
	        //공급업체
			var sServiceUrlVen = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";   //CORSerror나면 http:// 를 proxy/http/로
	         	sServiceUrlVen +=  "/sap/opu/odata/sap/Z_CLOUD_VENDOR_SRV/"; // 여기를 /n/iwfnd/maint_service 에 들어가서 내가 만든 경로를 복사 해와야 함.
	        var urlVen =  "/ZTG1_VENSet";
	        //filter
//	        var url = this.filter()type;
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrlVen,true);
//            this.oModel = new JSONModel();
	        var dataVen;
	        oDataModel.read(urlVen, null, null, false, function(oData){
	            dataVen = oData.results;
	         });
	        
//	        var aa,ii,jj;
//	        
//	        var bb = [1,2,3,];
//	        
//	        for(ii = 0, jj = dataIn.length; ii < jj; ii++) {
//	        	if(aa != "" ) aa += ",";
//	        	
//	        	if(aa.inexof(dataIn[ii].InVname) < 0) {
//	        		aa += dataIn[ii].InVname;
//	        	}
//	        	
////	        	aa.push("")
//	        }
//	        
//	        ""
//	        "황금전자"
//	        "황금전자"
//	        "황금전자,코아토탈"
//	        [
//	        {key: 0001, text:황금저나}
//	        {key : 코아토탈}
//	        ]
	        
	         
	         //분출
	         var sServiceUrlOut = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";  
	         	sServiceUrlOut +=  "/sap/opu/odata/sap/Z_CLOUD_OUT_SRV/"; 
	         var urlOut =  "/ZTG1_OUTSet";
	         var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrlOut,true);
//	         this.oModel = new JSONModel();
	         var dataOut;
	         oDataModel.read(urlOut, null, null, false, function(oData){
	             dataOut = oData.results;
	          });
	         
	         
	         
	         //발주
	         var sServiceUrlPo = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000/";   
	         	sServiceUrlPo +=  "/sap/opu/odata/sap/Z_CLOUD_PUOR_SRV/"; 
	         var urlPo =  "/GETPOSet";
	         var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrlPo,true);
//	         this.oModel = new JSONModel();
	         var dataPo;
	         oDataModel.read(urlPo, null, null, false, function(oData){
	             dataPo = oData.results;
	          });
	        
	         var i,j,x;
//	         dataIn.availAmt =0;
//	         dataIn.SumAmt=0;
	         
	         for(i=0;i<dataPo.length;i++)
	         {//발주
	        	 for(j=0;j<dataIn.length;j++)
	        	 {//입고
//		        	 입고.발주번호&제품코드 = 발주서.발주번호&제품코드
	        		//dataPo[i].PoNo == dataIn[j].InPono &&
		        	 if( dataPo[i].PoCat3No == dataIn[j].InCat3){	//동일한 제품이 들어오면
		        		 dataPo[i].InAmt = dataIn[j].InTotal;
		        		 if(typeof dataPo[i].Inavail != 'number'){
		        			 dataPo[i].Inavail = 0;
		        		 }
		        		 
		        		 dataPo[i].Inavail += dataPo[i].InTotal;
		        		 
		        		 for(x=0;x<dataOut.length;x++)
			        	 {//분출
			        		 if( dataPo[i].PoCat3No == dataOut[x].OutCat3){//분출개수 -
			        			 dataPo[i].Inavail -= dataOut[x].OutTotal;
			        		 }
			        	 }//분출for
		        		 
//		        		 dataPo[i].PoAmt - dataIn[j].InTotal;
		        		 
		        		 
		        		
		        	 }
		        	 
		        	 if(dataIn[j].Inavail == dataIn[j].InPoamt){//입고 총 합 = 발주수량
	        			 dataIn[j].InIcon = '입고완료';
	        			 dataPo[i].InIcon = '입고완료';
	        		 }else{
	        			 dataIn[j].InIcon = '입고대기';
	        			 dataPo[i].InIcon = '입고대기';
	        		 }
		        	 
	        	 }//입고for
	         }//발주for
	         var oModelIn = new sap.ui.model.json.JSONModel({ "data" : dataIn });
	         var oModelOut = new sap.ui.model.json.JSONModel({ "data" : dataOut });
	         var oModelPo = new sap.ui.model.json.JSONModel({ "data" : dataPo });
	         var oModelPro = new sap.ui.model.json.JSONModel({ "data" : dataPro });
	         var oModelVen = new sap.ui.model.json.JSONModel({ "data" : dataVen });
	         
	         this.getView().setModel(oModelIn, "In"); 
	         this.getView().setModel(oModelOut, "Out"); 
	         this.getView().setModel(oModelPo, "Po"); 
	         this.getView().setModel(oModelPro, "Pro"); 
	         this.getView().setModel(oModelVen, "Ven"); 
		},
		
		onFilterInvoices : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("InVname", FilterOperator.Contains, sQuery));
//				aFilter.push(new Filter("제품명", FilterOperator.Contains, sQuery));
//				aFilter.push(new Filter("발주일자", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("idProductsTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		
//		filter : function(type){
//			var url;
//			if(type == 'filter'){//필터 검색
//				var title = this.byId("slName");//.getValue();//.toUpperCase();
////				var text = this.byId("text").getSelectedKey();
//				var text = this.byId("slCategory");//.getValue();//.toUpperCase();
//				
//				if(title || text){
//					url = "/getdata1Set?$filter=LvTitle eq '" + title + 
//			  	   	  "' and LvText eq '" + text +"'";
//				}else{
//					url = "/getdata1Set";
//				}
//				
//			}else if(type == 'display'){//조회
//				url = "/getdata1Set";
//			}
//				
//			return url;
//		},

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