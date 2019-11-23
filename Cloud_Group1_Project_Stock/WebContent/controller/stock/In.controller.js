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
			this.getData();

			
		},
		
		 save: function (obj, arrPo) {
			 
		      var addr        = "proxy/https/zenedus4ap1.zenconsulting.co.kr:44300";
		          addr        += "/sap/opu/odata/sap/Z_CLOUD_STOCK_SRV_01/ztg1_inSet";
//		      addr         += "('"++"')";
		      var a = parseInt(arrPo.InNoMax);
		      var i;
		      a++; 
		      var len = arrPo.InNoMax.length - a.toString().length;
		     
//		      stringify(a);
		      for(i=0;i<len;i++){
		    	  a = "0" + a ;
		      }
		      var InEtc = "" ;
		      for(i=32;i<obj.length-4;i++){
		    	  InEtc = InEtc + obj[i] + " ";
		      }
		      var paramData = {
		    		"InNo" : 'IN'+a,
		            "InDate" : arrPo.PoDdate,
		            "InEdate" :obj[25].substr(1),
		            "InTotal" : parseInt(obj[31]),
		            "InPic" : obj[27].substr(2),
		            "InIcon" : '입고완료',//*
		            "InStock" : obj[30],
		            "InPono" : arrPo.PoNo,
		            "InPodate" : obj[26],
		            "InPoamt" : parseInt(obj[29]),
		            "InCat3" : obj[22],//*
		            "InPname" : obj[21],
		            "InVname" : obj[23],
		            "InVcode" : obj[24],
		            "InEtc" : InEtc
		            
		      };
		      $.ajax({
		         type : "POST",
		         url  : addr,
		         data : JSON.stringify(paramData),
		            contentType: "application/json" ,
		              success: function(aa, bb, cc) {
		                 console.log("13 " + cc);
		              },
		            error: function(aa, bb, cc) { 
		               console.log("23 " + cc);
		            }
		      });
		   },
	
		onApproveDialog : function(oEvent){
			var saveEvent = this.save;
			
			var oItem = oEvent.getSource();
			
			var oContext = oItem.getBindingContext("Po");
			var sPath = oContext.getPath();

			var a = sPath.substr(6,7);
			var Inname=['김무경','노기서','기수옥','도현준','최진석'];
			var InPic = ['A1','A2',"B1","B2","C1"];
			var Indate= new Date();
			var InIcon = ['입고완료', '입고대기']; var InIconNum;
//			if(oContext.oModel.oData.data[a].PoAmt <= oContext.oModel.oData.data[a].InAmt){
//				InIconNum = 0;
//			}else{
				InIconNum = 1;
//			};
//			var gd = this.getData();
//			oEvent=this.getData();
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
								new Text({ text: '\n입고완료일  : ' }),//5
								new Text({ text: '발주일자 : ' }),
								new Text({ text: '\n입고담당 : ' }),
								new Text({ text: '입고상태 : ' }),
								new Text({ text: '발주수량 : ' }),
								new Text({ text: '입고위치 : ' }),
								new Text({ text: '\n입고수량 : ' }),
								new Text({ text: '비고 : ' })
								
							]
						}),
						new sap.ui.layout.VerticalLayout({
							content: [
								new Text({ text: oContext.oModel.oData.data[a].PoPname+" " }),
								new Text({ text: oContext.oModel.oData.data[a].PoCat3No+" " }),
								new Text({ text: oContext.oModel.oData.data[a].PoVname+" " }),
								new Text({ text: oContext.oModel.oData.data[a].PoVcode+" " }),
								new Text({ text:  '\n'+Indate.getUTCFullYear()+"-"
													  +(Indate.getUTCMonth()+1)+"-"
													  +Indate.getDate()+" "}), //오늘 날짜**********
								new Text({ text: oContext.oModel.oData.data[a].PoDate+" "}),
								new Text({ text: '\n\n'+Inname[a%5]+" " }),//입고담당*******
								new Text({ text: InIcon[InIconNum]+" " }),
								new Text({ text: oContext.oModel.oData.data[a].PoNowAmt+" " }),//발주수량
								new Text({ text: InPic[a%5]+" "}),
								new sap.m.TextArea({ value: '\n'+oContext.oModel.oData.data[a].PoNowAmt+" ", 
																height: '30px', width: '80%'}),
								
								new sap.m.TextArea({ value: oContext.oModel.oData.data[a].PoEtc+" ", 
																height: '30px', width: '80%'}),
								new Text({text: "한번 등록하면 수정이 불가합니다."})
								]
						})
					]
				}),
				
				beginButton: new sap.m.Button({
					text: '입고등록',
					press: function (sAction) {
						sap.m.MessageToast.show('입고등록이 완료되었습니다.');
//						dialog._$content.context.textContent.split(" ")
						if(sAction.oSource.mProperties.text="입고등록"){
							saveEvent(dialog._$content.context.textContent.split(" "),oContext.oModel.oData.data[a]);
						}
						dialog.close();
//						gd();
//						this.onTablePress();
					}
				}),
				endButton: new sap.m.Button({
					text: '취소',
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
								new Text({ text: '\n공급업체명 : ' }),
								new Text({ text: '공급업체코드 : ' }),
								new Text({ text: '\n발주수량 : ' }),
								new Text({ text: '분출수량 : ' }),
								new Text({ text: '입고수량 : ' }),
//								new Text({ text: '발주상태 : ' }),
								new Text({ text: '가용수량 : ' }),
//								new Text({ text: '\n입고위치 :' }),
								new Text({ text: '비고 : ' })
							]
						}),
						new sap.ui.layout.VerticalLayout({//oItem.getBindingContext("view").oModel.oData.data[0]
							content: [
								new Text({ text: oItem.mAggregations.cells[0].mProperties.text}),//제품명
								new Text({ text: oItem.mAggregations.cells[1].mProperties.text}),//제품코드
								new Text({ text: '\n'+oItem.mAggregations.cells[2].mProperties.text }),//공급업체명
								new Text({ text: oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].PoVcode }),//공급업체코드
								new Text({ text: '\n'+oItem.mAggregations.cells[3].mProperties.text  }),//발주수량
								new Text({ text: oItem.mAggregations.cells[6].mProperties.text }),//발주상태**
								new Text({ text: oItem.mAggregations.cells[4].mProperties.text  }),//입고수량
//								new Text({ text: oItem.mAggregations.cells[4].mProperties.text}),//발주상태
								new Text({ text: oItem.mAggregations.cells[5].mProperties.text }), //가용수량
//								new Text({ text: '\n'+oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].InStock }),//입고위치
								new Text({ text: oItem.getBindingContext("Po").oModel.oData.data[index[index.length-1]].PoEtc })//비고
							]
						})
					]
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
	        
	         var i,j,x,max=0;
//	         dataIn.availAmt =0;
//	         dataIn.SumAmt=0;
	         var check = false;
	         var check2 = false;
	         
	         for(i=0;i<dataPo.length;i++)
	         {//발주
	        	 check = false;
	        	 check2 = false;
	        	 dataPo[i].PoVisible = true;
	        	 dataPo[i].PoNowAmt = dataPo[i].PoTotal;
	        	 dataPo[i].OutTotal = 0;
	        	 dataPo[i].InAmt = 0;
	        	 dataPo[i].Inavail = 0;
//	        	 if(dataPo[i].PoVisible = false;)
	        	 for(j=0;j<dataIn.length;j++)
	        	 {//입고
	        		 if(!check){
	        			 if(max < dataIn[j].InNo.substr(2) ){
	        				 max = dataIn[j].InNo.substr(2);
	        			 }
	        			 
	        			 if(j == dataIn.length-1) {
	        				 check = true;
	        				 dataPo[i].InNoMax = max;
	        			 }
	        		 }
	        		
//		        	 입고.발주번호&제품코드 = 발주서.발주번호&제품코드
	        		//dataPo[i].PoNo == dataIn[j].InPono &&
		        	 if( dataPo[i].PoCat3No == dataIn[j].InCat3){	//동일한 제품이 들어오면
		        		 if(!check2){
		        			 dataPo[i].InAmt = 0;
		        			 check2 = true; 
		        		 }
		        		 
		        		 
		        		 
		        		 if(typeof dataPo[i].Inavail != 'number'){
		        			 dataPo[i].Inavail = 0;
		        		 }
		        		 
		        		 dataPo[i].Inavail += dataPo[i].PoTotal;
		        		 dataPo[i].InAmt += dataPo[i].PoTotal;
		        		 if( dataIn[j].InIcon == '입고완료'){//안되는 상황 있을거 같음...
		        			 dataPo[i].PoNowAmt = '0';
		        			 dataPo[i].PoVisible = false;

		        		 }
//		        		 if(dataIn[j].InTatal == dataIn[j].InPoamt ){//입고 총 합 = 발주수량
//		        			 dataIn[j].InIcon = '입고완료';
//		        			 dataPo[i].InIcon = '입고완료';
//		        		 }else{
//		        			 dataIn[j].InIcon = '입고대기';
//		        			 dataPo[i].InIcon = '입고대기';
//		        		 }
//		        		 dataPo[i].InIcon = dadtaIn[j].InIcon;
		        		 
		        		 for(x=0;x<dataOut.length;x++)
			        	 {//분출
		        			
			        		 if( dataPo[i].PoCat3No == dataOut[x].OutCat3){//분출개수 -
			        			 dataPo[i].Inavail -= dataOut[x].OutTotal;
//			        			 if(dataOut[x].OutTotal){
			        				 dataPo[i].OutTotal = dataOut[x].OutTotal;
//			        			 }else{
//			        				 dataPo[i].OutTatal = '0';
//			        			 }
			        			 
			        		 }
			        	 }//분출for
		        		 
		        		
		        	 }
		        	 
		        	 
	        	 }//입고for
	         }//발주for
	         
	         
	         dataPro.unshift({ "Cat3Name" : ""});
	         dataVen.unshift({ "VName" : ""});
	         
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
		
		onSearch : function(oEvent) {
			// build filter array
//			var aFilterVen = [];
			var aFilter;
			var Pname = this.getView().byId("pName").getSelectedKey();
			var Vname = this.getView().byId("vName").getSelectedKey();
			
			aFilter = new Filter([
				new Filter("PoPname", FilterOperator.Contains, Pname),
				new Filter("PoVname", FilterOperator.Contains, Vname)
				], true);


			// filter binding
			var oList = this.byId("idProductsTable");
			var oBinding = oList.getBinding("items");
//			oBinding.filter(aFilterVen);			
			oBinding.filter([]);			
			oBinding.filter(aFilter);			
			
		},
		
		onAllSearch : function(oEvent){
			 this.getView().setModel(oModelIn, "In"); 
	         this.getView().setModel(oModelOut, "Out"); 
	         this.getView().setModel(oModelPo, "Po"); 
	         this.getView().setModel(oModelPro, "Pro"); 
	         this.getView().setModel(oModelVen, "Ven"); 
			
		}
		
		
	});
});