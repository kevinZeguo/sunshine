var rep_info = {};
$(document).ready(function ($) {
    $("#closeInfoModal").click(function () {
        $("#infoModal").modal("hide");
    })

    $("#print-btn").click(function () {
        $("#in-Info").jqprint({
            debug: false,
            importCSS: true,
            printContainer: true
        });
        $("#infoModal").modal("hide");
    })

});


