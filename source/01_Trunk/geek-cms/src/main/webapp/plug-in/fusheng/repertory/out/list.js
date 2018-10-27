var rep_out_list = {};
rep_out_list.queryListUrl = "/repertory/out/list.ajax";//查询列表地址

//grid定义
var grid_selector = "#out-grid-table";
var pager_selector = "#out-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    rep_out_list.init_base();
    //初始化事件
    rep_out_list.init_event();
    //初始化列表
    rep_out_list.init_grid();
});

//初始化基本信息
rep_out_list.init_base = function () {
    $('#outStartDateQ').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    $('#outEndDateQ').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
}

//初始化事件
rep_out_list.init_event = function () {
    //添加设备
    $("#inBtn").click(function () {
        window.location.href = '/repertory/out/add.html';
    });
    //查询事件
    $("#queryBtn").click(function () {
        refreshOutList();
    })
    //回车事件
    $("#customerKey").keydown(function (e) {
        keyEvent(e);
    })
    $("#contractCode").keydown(function (e) {
        keyEvent(e);
    })
    $("#sender").keydown(function (e) {
        keyEvent(e);
    })
    $("#outCode").keydown(function (e) {
        keyEvent(e);
    })
}
//初始化grid列表
rep_out_list.init_grid = function () {
    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    })

    ////resize on sidebar collapse/expand
    var parent_column = $(grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })

    var editHtml = '<button title="打印" class="btn btn-xs btn-info" onclick="editInfo(inId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="打印">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
    var printHtml = '<button title="打印" class="btn btn-xs btn-info" onclick="showInfo(inId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="打印">'
        + '<i class="ace-icon fa fa-print bigger-120"></i>'
        + '</button>'
    var cancelHtml = '<button title="撤回" class="btn btn-xs btn-danger" onclick="cancelIn(inId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="撤回">'
        + '<i class="ace-icon fa  fa-undo bigger-120"></i>'
        + '</button>'

    //初始化grid
    $(grid_selector).jqGrid({
        url: rep_out_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['出库单编号', '客户名称', '合同编号', '仓库', '发货人', '出库时间', '出库操作人', '备注', '出库单状态', '操作'],
        colModel: [
            {
                name: 'code', index: 'code', width: 120, formatter: function (code, data, record) {
                if (code != null && code != '' && code != "null") {
                    return "<a href='#' onclick='showInfo(" + record.id + ")' >" + code + "</a>"
                } else {
                    return "--";
                }
            }
            },
            {name: 'customerName', index: 'customerName', width: 120},
            {name: 'contractCode', index: 'contractCode', width: 90},
            {name: 'storageName', index: 'storageName', width: 70},
            {name: 'sender', index: 'sender', width: 120},
            {name: 'createdStr', index: 'createdStr', width: 120},
            {name: 'operatorName', index: 'operatorName', width: 120},
            {name: 'note', index: 'note', width: 120},
            {
                name: 'status',
                index: 'status',
                width: 80,
                fixed: true,
                sortable: false,
                formatter: function (status, b, rowObject) {
                    if (status == 1) {
                        return "正常"
                    } else {
                        return "<div><span style='color: #dcdcdc'>撤销</span></div>"
                    }
                }
            },
            {
                name: 'actions',
                index: 'actions',
                width: 120,
                fixed: true,
                sortable: false,
                formatter: function (id, b, rowObject) {
                    var html = '<div class="hidden-sm hidden-xs btn-group">';
                    html += editHtml.replace("inId", rowObject.id);
                    if (rowObject.status == 1) {
                        html += cancelHtml.replace("inId", rowObject.id);
                    }
                    html += printHtml.replace("inId", rowObject.id);
                    html += '</div>';
                    return html;
                }
            }
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: pager_selector,
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
            customerKey: encodeURI($("#customerKey").val().trim()),
            contractCode: $("#contractCode").val().trim(),
            sender: encodeURI($("#sender").val()).trim(),
            outCode: $("#outCode").val().trim(),
            startDate: $("#outStartDateQ").val().trim(),
            endDate: $("#outEndDateQ").val().trim()
        },
        caption: "出库管理",
        autowidth: true
    });
    $(window).triggerHandler('resize.jqGrid');

    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });

}

//列表查询
function refreshOutList() {
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            customerKey: encodeURI($("#customerKey").val().trim()),
            contractCode: $("#contractCode").val().trim(),
            sender: encodeURI($("#sender").val().trim()),
            outCode: $("#outCode").val().trim(),
            startDate: $("#outStartDateQ").val().trim(),
            endDate: $("#outEndDateQ").val().trim()

        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshOutList();
    }
}


function showInfo(inId) {
    $(".rep-out-info-body").html("");
    $(".rep-out-info-body").load('/repertory/out/info.html?id=' + inId, function () {
        $("#infoModal").modal({backdrop: 'static', keyboard: false});
        $("#infoModal").modal("show");
    })
}

function editInfo(inId) {
    window.location.href = '/repertory/out/add.html?id=' + inId;
}

function cancelIn(inId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认撤回此出库单吗？<br>若确认撤回，出库的配件还原库存!", function (result) {
        if (result) {
            $.ajax({
                url: "/repertory/out/cancelOut.ajax",
                async: false,
                dataType: 'json',
                data: {
                    id: inId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "撤回出库单成功", function () {
                            refreshOutList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "撤回出库单失败," + data.msg);
                    }
                }
            });
        }
    });
}