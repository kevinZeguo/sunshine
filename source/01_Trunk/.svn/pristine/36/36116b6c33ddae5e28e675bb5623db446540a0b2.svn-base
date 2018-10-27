var serve_polling_list = {};
serve_polling_list.queryListUrl = "/serve/polling/list.ajax";//查询列表地址

//grid定义
var polling_grid_selector = "#polling-grid-table";
var polling_pager_selector = "#polling-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    serve_polling_list.init_base();
    //初始化事件
    serve_polling_list.init_event();
    //初始化列表
    serve_polling_list.init_grid();
});

//初始化基本信息
serve_polling_list.init_base = function () {
    listcustomer("#queryCId");
    listhostnum("#eqIdQ");
    listUser("#serviceEngineer", 1, "请选择服务工程师!");

    $('#startDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });

    $('#endDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });

    //listcustomer("#cNameQ");
}

//初始化事件
serve_polling_list.init_event = function () {
    //添加设备
    $("#addPolling").click(function () {
        var eId = $("#eIdA").val();
        var customerId = $("#customerIdA").val();
        window.location.href = "/serve/polling/add.html?eId=" + eId + "&customerId=" + customerId;
    });


    //查询事件
    $("#queryBtn").click(function () {
        refreshPollingServeList();
    })

    ////回车事件
    $("#keyQ").keydown(function () {
        keyEvent(this);
    })
}
//初始化grid列表
serve_polling_list.init_grid = function () {
    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(polling_grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    })
    ////resize on sidebar collapse/expand
    var parent_column = $(polling_grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(polling_grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })

    var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
        + '<button title="编辑" class="btn btn-xs btn-info" onclick="editPolling(pollingId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button title="删除" class="btn btn-xs btn-danger" onclick="deletePolling(pollingId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '<button title="打印" class="btn btn-xs btn-info" onclick="showPInfo(pollingId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="打印">'
        + '<i class="ace-icon fa fa-print bigger-120"></i>'
        + '</button>'
        + '</div>';

    //初始化grid
    $(polling_grid_selector).jqGrid({
        url: serve_polling_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['巡检单号', '客户名称', '设备编号', '制造号码', '设备机型', '电机厂牌', '制造日期', '巡检工程师', '巡检日期', '操作'],
        colModel: [
            {
                name: 'code', index: 'code', width: 145, formatter: function (eCode, data, record) {
                if (eCode != null && eCode != '' && eCode != "null") {
                    return "<a href='#' onclick='showPInfo(" + record.id + ")' >" + eCode + "</a>"
                } else {
                    return "--";
                }
            }
            },
            {name: 'cName', index: 'customerName', width: 100},
            {name: 'eCode', index: 'eCode', width: 120},
            {name: 'makeNum', index: 'makeNum', width: 100},
            {name: 'eModel', index: 'eModel', width: 80},
            {name: 'motorBrand', index: 'motorBrand', width: 70},
            {name: 'makeDate', index: 'makeDate', width: 90},
            {name: 'serviceEngineerName', index: 'serviceEngineerName', width: 110, sortable: false},
            {name: 'serviceDate', index: 'serviceDate', width: 120, fixed: true, sortable: false},
            {
                name: 'actions',
                index: 'actions',
                width: 100,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var html = actionHtml.replace("pollingId", rowObject.id);
                    html = html.replace("pollingId", rowObject.id);
                    html = html.replace("pollingId", rowObject.id);
                    return html;
                }
            }
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: polling_pager_selector,
        altRows: true,
        multiselect: true,
        multiboxonly: true,
        sordname: 'id',
        sortorder: 'desc',
        jsonReader: {
            root: "list",//保存详细记录的名称
            total: "totalPage",//总共有页
            page: "page",//当前是哪一页
            records: "records",//总共记录数
            repeatitems: false
        },
        postData: {
            startDate: $("#startDate").val(),
            endDate: $("#endDate").val(),
            key: $("#keyQ").val(),
            eqId: $("#eqIdQ").val(),
            customerId: $("#queryCId").val(),
            serviceEngineer: $("#serviceEngineer").val()
        },
        caption: "设备巡检记录",
        autowidth: true
    });
    $(window).triggerHandler('resize.jqGrid');

    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(polling_grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });

}

//列表查询
function refreshPollingServeList() {
    $(polling_grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            startDate: $("#startDate").val(),
            endDate: $("#endDate").val(),
            key: $("#keyQ").val(),
            eqId: $("#eqIdQ").val(),
            customerId: $("#queryCId").val(),
            serviceEngineer: $("#serviceEngineer").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshPollingServeList();
    }
}

//编辑
function editPolling(pollingId) {
    window.location.href = "/serve/polling/add.html?id=" + pollingId;
}

//删除
function deletePolling(pollingId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此设备巡检单吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/serve/polling/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    id: pollingId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除设备巡检单成功", function () {
                            refreshPollingServeList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "删除设备巡检单失败");
                    }
                }
            });
        }
    });
}

function showPInfo(pollingId) {
    $(".polling-info-body").html("");
    $(".polling-info-body").load('/serve/polling/info.html?id=' + pollingId, function () {
        $("#pollingInfoModal").modal({backdrop: 'static', keyboard: false});
        $("#pollingInfoModal").modal("show");
    })
}