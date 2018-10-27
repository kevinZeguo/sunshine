/**
 * zhangyongquan create by 2017/07/13
 */
var contract_info = {};

$(document).ready(function ($) {
	///alert("ready");
    //初始化基本信息
    contract_info.init_base();
    //初始化事件
    contract_info.init_event();
    
});

//初始化基本信息
contract_info.init_base = function () {
    showFiles($("#fileIds").val(), "#contractFileId")
    // var contractFile=$("#contractFileId").attr("value");
	// var contractFileId=$("#contractFileId").attr("fileid");
	// var fileHtml="";
	// ///alert(contractFileId);
	// if(contractFile ==null || contractFile=="")
	// {
	// 	fileHtml="--";
	// }
	// else
	// {
	// 	var arFile=contractFile.split(",");
	// 	var arFileId=contractFileId.split(",");
	// 	for(i=0; i < arFile.length; i++)
	// 	{
	// 		fileHtml+="<a href='/file/downLoad.html?fileId="+arFileId[i]+"' title='点击下载' style='display:block;'>"+arFile[i]+"</a>";
	// 	}
	// }
    //
	// $("#contractFileId").html(fileHtml);
//	alert("id="+$("#id").val());
//    var fileUtil = new fileUtils("","","#contractFileId");
//    fileUtil.initShowFile("contract",$("#id").val());
}
//初始化事件
contract_info.init_event = function () {

//    $("#toggle-maintenance").click(function () {
//        $('.toggle-record').removeClass("active");
//        $(this).parent().addClass("active");
//
//        $("#maintenanceDiv").removeClass("hidden");
//        $("#maintenanceDiv").addClass("active in");
//        $("#pollingDiv").removeClass("active in");
//        $("#pollingDiv").addClass("hidden");
//        $("#debugDiv").removeClass("active in");
//        $("#debugDiv").addClass("hidden");
//
//    })
//
//    $("#toggle-polling").click(function () {
//        $('.toggle-record').removeClass("active");
//        $(this).parent().addClass("active");
//
//        $("#pollingDiv").removeClass("hidden");
//        $("#pollingDiv").addClass("active in");
//
//        $("#maintenanceDiv").removeClass("active in");
//        $("#maintenanceDiv").addClass("hidden");
//        $("#debugDiv").removeClass("active in");
//        $("#debugDiv").addClass("hidden");
//
//    })
//
//    $("#toggle-debug").click(function () {
//        $('.toggle-record').removeClass("active");
//        $(this).parent().addClass("active");
//
//        $("#debugDiv").addClass("active in");
//        $("#debugDiv").removeClass("hidden");
//
//        $("#maintenanceDiv").addClass("hidden");
//        $("#maintenanceDiv").removeClass("active in");
//        $("#pollingDiv").removeClass("active in");
//        $("#pollingDiv").addClass("hidden");
//
//
//    })

}