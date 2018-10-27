$(document).ready(function ($) {
    //初始化列表
    //rep_out.init_grid();
    $("#closeDebugInfoModal").click(function () {
        $("#debugInfoModal").modal("hide");
    })

    $("#print-btn").click(function () {
        $("#out-Info").jqprint({
            debug: false,
            importCSS: true,
            printContainer: true
        });
        $("#debugInfoModal").modal("hide");
    })
});
