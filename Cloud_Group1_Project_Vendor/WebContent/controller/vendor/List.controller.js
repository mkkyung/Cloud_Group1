sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	'sap/ui/model/Filter',
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV'
], function (jQuery, Fragment, Controller, Filter, JSONModel, Export, ExportTypeCSV) {
	"use strict";

	return Controller.extend("Cloud_Group1_ProjectCloud_Group1_Project.controller.vendor.List", {
		MainData : function() {
			var sServiceUrl = "proxy/http/zenedus4ap1.zenconsulting.co.kr:50000"
					+ "/sap/opu/odata/sap/Z_CLOUD_VENDOR_SRV";			
		
				var url = "/ZTG1_VENSet";


			var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var MainData;

			oDataModel.read(url, null, null, false, function(oData) {
				MainData = oData.results;
			});

			var oModel = new sap.ui.model.json.JSONModel({
				"MainData" : MainData
			});

			
			this.getView().setModel(oModel, "MainData");

		},
		
		inputId: '',
		
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
					
			this.MainData();
		},
		handleMasterPress: function (oEvent) {
			var vendorPath = oEvent.getSource().getBindingContext("MainData").getPath();
			var vendor = vendorPath.split("/").slice(-1).pop();
			var vendorKey = oEvent.getSource().getBindingContext("MainData").oModel.aBindings["0"].oList[vendor].VCode;

			this.bus.publish("flexible", "setDetailPage", {vendorKey});            // 상세페이지
																					// 이동
		},
		handleCreatePress: function () {
			this.bus.publish("flexible", "setCreatePage")             //등록페이지 이동
		},
		onDataExport : function(oEvent) {

			var oExport = new Export({

//				 Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new sap.ui.core.util.ExportTypeCSV({
					separatorChar : ","
				}),
			


				// Pass in the model created above
				models : this.getView().getModel("MainData"),

				// binding information for the rows aggregation
				rows : {
					path : "/MainData"
				},

				// column definitions with column name and binding info for the content

				columns : [{
					name : "공급업체코드",
					template : {
						content : "{VCode}"
					}
				}, {
					name : "공급업체명",
					template : {
						content : "{VName}"
					}
				}, {
					name : "구분",
					template : {
						content : "{VCat}"
					}
				}, {
					name : "업태",
					template : {
						content : "{VBs}"
					}
				}, {
					name : "종목",
					template : {
						content : "{VBc}"
					}
				}, {
					name : "사업자번호",
					template : {
						content : "{VNo}"
					}
				}, {
					name : "대표자",
					template : {
						content : "{VCeo}"
					}
				}, {
					name : "전화번호",
					template : {
						content : "{VTel}"
					}
				}, {
					name : "팩스",
					template : {
						content : "{VFax}"
					}
				}, {
					name : "이메일",
					template : {
						content : "{VEmail}"
					}
				},{
					name : "은행/계좌번호",
					template : {
						content : "{VBankn}/{VBanka}"
					}
				}, ]
			});
			
			

			// download exported file
			oExport.saveFile().catch(function(oError) {
				console.log(oError);
			}).then(function() {
				oExport.destroy();
			});
		}
		
	});
}, true);
