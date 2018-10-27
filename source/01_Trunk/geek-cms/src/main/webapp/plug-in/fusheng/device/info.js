var device_info = {};

$(document).ready(function ($) {
    //初始化基本信息
    device_info.init_base();
    //初始化事件
    device_info.init_event();
});

//初始化基本信息
device_info.init_base = function () {
    //$("#eId").val($("#eId").val());
    showImgs($("#fileIds").val(), "#ePicId")
    // var fileUtil = new fileUtils("","","#ePicId");
    // fileUtil.initShowFile("device",$("#eId").val())
}

//初始化事件
device_info.init_event = function () {

    $("#toggle-maintenance").click(function () {
        $('.toggle-record').removeClass("active");
        $(this).parent().addClass("active");

        $("#partDiv").removeClass("active in");
        $("#partDiv").addClass("hidden");
        $("#maintenanceDiv").removeClass("hidden");
        $("#maintenanceDiv").addClass("active in");
        $("#pollingDiv").removeClass("active in");
        $("#pollingDiv").addClass("hidden");
        $("#debugDiv").removeClass("active in");
        $("#debugDiv").addClass("hidden");

    })

    $("#toggle-polling").click(function () {
        $('.toggle-record').removeClass("active");
        $(this).parent().addClass("active");

        $("#pollingDiv").removeClass("hidden");
        $("#pollingDiv").addClass("active in");

        $("#partDiv").removeClass("active in");
        $("#partDiv").addClass("hidden");
        $("#maintenanceDiv").removeClass("active in");
        $("#maintenanceDiv").addClass("hidden");
        $("#debugDiv").removeClass("active in");
        $("#debugDiv").addClass("hidden");

    })

    $("#toggle-debug").click(function () {
        $('.toggle-record').removeClass("active");
        $(this).parent().addClass("active");

        $("#debugDiv").addClass("active in");
        $("#debugDiv").removeClass("hidden");

        $("#partDiv").removeClass("active in");
        $("#partDiv").addClass("hidden");
        $("#maintenanceDiv").addClass("hidden");
        $("#maintenanceDiv").removeClass("active in");
        $("#pollingDiv").removeClass("active in");
        $("#pollingDiv").addClass("hidden");
    })

    $("#toggle-part").click(function () {
        $('.toggle-record').removeClass("active");
        $(this).parent().addClass("active");

        $("#partDiv").addClass("active in");
        $("#partDiv").removeClass("hidden");

        $("#debugDiv").removeClass("active in");
        $("#debugDiv").addClass("hidden");
        $("#maintenanceDiv").addClass("hidden");
        $("#maintenanceDiv").removeClass("active in");
        $("#pollingDiv").removeClass("active in");
        $("#pollingDiv").addClass("hidden");
        refreshPartList();
    })

}

//刷新维保记录列表
function refreshMaintenanceList() {
    $("#maintenance-grid-table").jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            eId: $("#eId").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}

//刷新调测记录列表
function refreshPollingList() {
    $("#polling-grid-table").jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            eId: $("#eId").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


//刷新调试记录列表
function refreshDebugList() {
    $("#debug-grid-table").jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            eId: $("#eId").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}

//刷新调试记录列表
function refreshPartList() {
    $("#part-grid-table").jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            eId: $("#eId").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}