var rep_in_list = {};
rep_in_list.queryListUrl = "/repertory/in/list.ajax";//查询列表地址

//grid定义
var grid_selector = "#in-grid-table";
var pager_selector = "#in-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    rep_in_list.init_base();
    //初始化事件
    rep_in_list.init_event();
    //初始化列表
    rep_in_list.init_grid();
});

//初始化基本信息
rep_in_list.init_base = function () {
    $('#inDateQ').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
}

//初始化事件
rep_in_list.init_event = function () {
    //添加设备
    $("#inBtn").click(function () {
        $(".rep-in-body").html("");
        $(".rep-in-body").load('/repertory/in/add.html', function () {
            $("#addModal").modal({backdrop: 'static', keyboard: false});
            $("#addModal").modal("show");
        })
    });

    $("#printBtn").click(function () {

    });
    $("#cancelBtn").click(function () {

    });

    //查询事件
    $("#queryBtn").click(function () {
        refreshInList();
    })

    //回车事件
    $("#pCodeQ").keydown(function (e) {
        keyEvent(e);
    })
    $("#pNameQ").keydown(function (e) {
        keyEvent(e);
    })
    $("#inDateQ").keydown(function (e) {
        keyEvent(e);
    })
}
//初始化grid列表
rep_in_list.init_grid = function () {
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


    var printHtml = '<button title="打印" class="btn btn-xs btn-info" onclick="printIn(inId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="打印">'
        + '<i class="ace-icon fa fa-hdd-o bigger-120"></i>'
        + '</button>'
    var cancelHtml = '<button title="撤回" class="btn btn-xs btn-danger" onclick="cancelIn(inId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="撤回">'
        + '<i class="ace-icon fa  fa-bolt bigger-120"></i>'
        + '</button>'

    //初始化grid
    $(grid_selector).jqGrid({
        url: rep_in_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['入库单编号', '配件编号', '配件名称', '入库数量', '入库价格', '入库时间', '当前库存', '操作人', '备注','入库状态', '操作'],
        colModel: [
            {
                name: 'code', index: 'code', width: 120, formatter: function (eCode, data, record) {
                if (eCode != null && eCode != '' && eCode != "null") {
                    return "<a href='/device/info.html?eId=" + record.eId + "'>" + eCode + "</a>"
                } else {
                    return "--";
                }
            }
            },
            {name: 'pCode', index: 'pCode', width: 120},
            {name: 'pName', index: 'pName', width: 90},
            {name: 'num', index: 'num', width: 70},
            {name: 'price', index: 'price', width: 120},
            {name: 'formatDateIn', index: 'formatDateIn', width: 120},
            {name: 'num', index: 'num', width: 70},
            {name: 'creatorName', index: 'operator', width: 120},
            {name: 'note', index: 'note', width: 130, sortable: false},
            {
                name: 'status',
                index: 'status',
                width: 80,
                fixed: true,
                sortable: false,
                formatter: function (status, b, rowObject) {
                    if(status == 1){
                        return "正常"
                    }else{
                        return "<div><span style='color: #dcdcdc'>撤销</span></div>"
                    }
                }
            },
            {
                name: 'actions',
                index: 'actions',
                width: 80,
                fixed: true,
                sortable: false,
                formatter: function (id, b, rowObject) {
                    var html = '<div class="hidden-sm hidden-xs btn-group">';
                    //html += printHtml.replace("inId", rowObject.id);
                    if(rowObject.status== 1){
                        html += cancelHtml.replace("inId", rowObject.id);
                    }
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
            inCode: encodeURI($("#inCodeQ").val()),
            partCode: encodeURI($("#pCodeQ").val()),
            partName: encodeURI($("#pNameQ").val()),
            inDate: $("#inDateQ").val()
        },
        caption: "入库管理",
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
function refreshInList() {
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            inCode: encodeURI($("#inCodeQ").val()),
            partCode: encodeURI($("#pCodeQ").val()),
            partName: encodeURI($("#pNameQ").val()),
            inDate: $("#inDateQ").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshInList();
    }
}


function printIn(inId) {

}

function cancelIn(inId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认撤回此入库单吗？<br>若确认撤回，则扣除对应配件库存，如库存不足，则会撤回失败!", function (result) {
        if (result) {
            $.ajax({
                url: "/repertory/in/cancelIn.ajax",
                async: false,
                dataType: 'json',
                data: {
                    id: inId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "撤回入库单成功", function () {
                            refreshInList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "撤回入库单失败," + data.msg);
                    }
                }
            });
        }
    });
}