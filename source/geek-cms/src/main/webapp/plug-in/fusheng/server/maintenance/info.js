/**
 * zhangyongquan created at 2017/08/15
 */
$(document).ready(function ($) {
    //初始化基本信息
    init_base();
    //初始化事件
    init_event();

});

function init_base() {
    // var fileUtil = new fileUtils("", "", "#picIds");
    // fileUtil.initShowFile($("#fileIds").val());
}

function init_event() {
    $("#closeModal").click(function () {
        $("#maintenanceInfoModal").modal("hide");
    })
    $("#print-btn").click(function () {
        $("#maintenance-Info").jqprint({
            debug: false,
            importCSS: true,
            printContainer: true
        });
        $("#maintenanceInfoModal").modal("hide");
    })
}