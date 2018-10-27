$(document).ready(function () {


});

function logout() {
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认退出系统吗？", function (result) {
        if (result) {
            location.href = "/logout.ajax";
        }
    });
}

