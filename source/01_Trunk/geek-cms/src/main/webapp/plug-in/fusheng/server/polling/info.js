$(document).ready(function ($) {
    //初始化列表
    //rep_out.init_grid();
    $("#closePollingInfoModal").click(function () {
        $("#pollingInfoModal").modal("hide");
    })

    $("#print-btn").click(function () {
        $("#polling-Info").jqprint({
            debug: false,
            importCSS: true,
            printContainer: true
        });
        $("#pollingInfoModal").modal("hide");
    })
});
