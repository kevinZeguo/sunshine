var server_maintenance_list = {};
server_maintenance_list.queryListUrl = "/server/maintenance/list.ajax";//查询列表地址

//grid定义
var m_grid_selector = "#maintenace-grid-table";
var m_pager_selector = "#maintenace-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    server_maintenance_list.init_base();
    //初始化事件
    server_maintenance_list.init_event();
    //初始化列表
    server_maintenance_list.init_grid();
});

//初始化基本信息
server_maintenance_list.init_base = function () {
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
}

//初始化事件
server_maintenance_list.init_event = function () {
    $("#addMain").click(function () {
        var eId = $("#eIdA").val();
        var cId = $("#customerIdA").val();
        window.location.href = "/server/maintenance/add.html?customerId=" + cId + "&eId=" + eId;
    });
    //查询事件
    $("#queryBtn").click(function () {
        refreshList();
    });
    $("#dKeyQ").keydown(function (e) {
        keyEvent(e);
    })


}
//初始化grid列表
server_maintenance_list.init_grid = function () {
    //resize to fit page size
    ///alert("grid init");
    $(window).on('resize.jqGrid', function () {
        $(m_grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    })

    ////resize on sidebar collapse/expand
    var parent_column = $(m_grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(m_grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })


    var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
        + '<button class="btn btn-xs btn-info" onclick="editMaintenance(mId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button title="删除" class="btn btn-xs btn-danger" onclick="deleteMaintenance(mId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '<button title="打印" class="btn btn-xs btn-info" onclick="showMInfo(mId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="打印">'
        + '<i class="ace-icon fa fa-print bigger-120"></i>'
        + '</button>'
//        + '<button class="btn btn-xs btn-danger" onclick="deleteMaintenance(mId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
//        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
//        + '</button>'
        + '</div>';

    //初始化grid
    $(m_grid_selector).jqGrid({
        url: server_maintenance_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['单据编码', '客户名称', '主机号码', '制造号码', '电机厂牌', '电机制造日期', '报修内容', '服务工程师', '服务日期', '操作'],
        colModel: [
            {
                name: 'mCode', index: 'mCode', width: 120, formatter: function (mCode, data, record) {
                if (mCode != null && mCode != '' && mCode != "null") {
                    return "<a href='#' onclick='showMInfo(" + record.id + ")'>" + mCode + "</a>";///"<a href='/server/maintenance/info.html?id=" + record.id + "'>" + mCode + "</a>"
                } else {
                    return "--";
                }
            }
            },
            {name: 'cName', index: 'cName', width: 90},
            {
                name: 'hostNum', index: 'hostNum', width: 70, formatter: function (hostNum, data, record) {
                if (hostNum != null && hostNum != '' && hostNum != "null") {
                    return hostNum;
                }
                else if (record.oldHostNum != null && record.oldHostNum != '' && record.oldHostNum != "null") {
                    return record.oldHostNum;
                }
                else
                    return "--";
            }
            },
            //{name: 'eModel', index: 'eModel', width: 150},
            {name: 'makeNum', index: 'makeNum', width: 70},
            //{name: 'elecPanModel', index: 'elecPanModel', width: 90},
            {name: 'motorBrand', index: 'motorBrand', width: 130, sortable: false},
            {name: 'makeDate', index: 'makeDate', width: 120, fixed: true, sortable: false},
            {name: 'repairContent', index: 'repairContent', width: 130},
            {name: 'serviceEngineerName', index: 'serviceEngineerName', width: 120},
            {name: 'formatServiceDate', index: 'formatServiceDate', width: 120, fixed: true, sortable: false},
            {
                name: 'actions',
                index: 'actions',
                width: 100,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var html = actionHtml.replace("mId", rowObject.id);
                    html = html.replace("mId", rowObject.id);
                    html = html.replace("mId", rowObject.id);
                    return html;
                }
            }
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: m_pager_selector,
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
        caption: "设备维保记录",
        autowidth: true
    });
    $(window).triggerHandler('resize.jqGrid');

    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(m_grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });

}

//列表查询
function refreshList() {
    $(m_grid_selector).jqGrid('setGridParam', {
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
        refreshList();
    }
}

//编辑
function editMaintenance(id) {
    window.location.href = "/server/maintenance/add.html?id=" + id;
}

//删除
function deleteMaintenance(id) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此维保信息吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/server/maintenance/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    mId: id
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除维保信息成功", function () {
                            refreshList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "删除维保信息失败");
                    }
                }
            });
        }
    });
}
///显示详情带打印功能
function showMInfo(mId) {
    $(".maintenance-info-body").html("");
    $(".maintenance-info-body").load('/server/maintenance/info.html?id=' + mId, function () {
        $("#maintenanceInfoModal").modal({backdrop: 'static', keyboard: false});
        $("#maintenanceInfoModal").modal("show");
    })
}