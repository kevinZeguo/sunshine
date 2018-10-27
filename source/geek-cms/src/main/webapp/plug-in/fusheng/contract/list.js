var contract_list = {};
contract_list.queryListUrl = "/contract/list.ajax";///查询列表地址
contract_list.exportUrl = "/contract/export.html";///查询列表地址
//grid定义
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    contract_list.init_base();
    //初始化事件
    contract_list.init_event();
    //初始化列表
    contract_list.init_grid();
});

//初始化基本信息
contract_list.init_base = function () {
    $("#isOpenInvoice").select2().trigger("change");
    $("#isSendGoods").select2().trigger("change");
    $("#isCashBack").select2().trigger("change");
    $("#queryContractType").select2().trigger("change");
}

contract_list.init_event = function () {
    //查询事件
    $("#queryBtn").click(function () {
        ///alert("querybtn clicked");
        refreshContractList();
    });
    //回车事件
    $("#contractCode").keydown(function (e) {
        keyEvent(e);
    });
    $("#customerName").keydown(function (e) {
        keyEvent(e);
    });

    $("#addContract").click(function () {
        $(".contract-body").empty();
        //$('#addModal').modal('data-remote'="/customer/add.html",'data-show'="true")
        $(".contract-body").load('/contract/add.html', function () {
            $("#addModal").modal({backdrop: 'static', keyboard: false});
            $("#addModal").modal("show");
        })
    });
    //导出文件
    $("#exportContract").click(function () {
        $.cmsUtil.showConfirmDialog($("#main-container"), "确认导出合同信息吗？", function (result) {
            if (result) {
                var contractCode = encodeURI($("#contractCode").val());
                var customerName = encodeURI($("#customerName").val());
                var isOpenInvoice = $("#isOpenInvoice option:selected").val();
                var isSendGoods = $("#isSendGoods option:selected").val();
                var isCashBack = $("#isCashBack option:selected").val();
                var contractType = $("#queryContractType option:selected").val();
                window.open(contract_list.exportUrl + "?contractCode=" + contractCode + "&customerName=" + customerName + "&isOpenInvoice=" + isOpenInvoice + "&isSendGoods=" + isSendGoods + "&isCashBack=" + isCashBack + "&contractType=" + contractType);
            }
        })
    })

    $("#addModal").on("hidden", function () {
        $(this).removeData("modal");
    });
}

contract_list.init_grid = function () {
    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    })
    //resize on sidebar collapse/expand
    var parent_column = $(grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })
    //定义修改删除
    var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
        + '<button class="btn btn-xs btn-info" onclick="editContract(cId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button class="btn btn-xs btn-danger" onclick="deleteContract(cId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '</div>';

    //初始化grid
    $(grid_selector).jqGrid({
        url: contract_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['客户名称', '合同编号(甲方)', '合同编号(乙方)', '合同类型', '价格', '是否已回款', '是否发货', '是否已开发票', '操作'],
        colModel: [
            {
                name: 'cName', index: 'cName', width: 70, sorttype: 'string',
                formatter: function (cName, data, record) {
                    ///alert("id="+record.id);
                    if (cName != null && cName != '' && cName != "null" && record.id != null && record.id != "") {
                        return "<a href='/contract/info.html?id=" + record.id + "'>" + cName + "</a>"
                    } else if (cName != null && cName != '' && cName != "null" && (record.id == null || record.id == "")) {
                        return cName;
                    } else {
                        return "--";
                    }
                }
            },
            {name: 'aCode', index: 'aCode', width: 70},
            {name: 'bCode', index: 'bCode', width: 70},
            {
                name: 'type',
                index: 'type',
                width: 70,
                formatter: function (cellvalue, options, rowobject) {
                    if (cellvalue == 1) {
                        return "采购合同";
                    }
                    else if (cellvalue == 0) {
                        return "销售合同";
                    }
                    else
                        return "无";
                }
            },

            {name: 'price', index: 'price', width: 70},
            {
                name: 'isCashBack', index: 'isCashBack', width: 70,
                formatter: function (cellvalue, options, rowobject) {
                    if (cellvalue == 1) {
                        return "是";
                    }
                    else
                        return "否";
                }
            },
            {
                name: 'isSendGoods', index: 'isSendGoods', width: 70,
                formatter: function (cellvalue, options, rowobject) {
                    if (cellvalue == 1)
                        return "是";
                    else
                        return "否";
                }
            },
            {
                name: 'isOpenInvoice', index: 'isOpenInvoice', width: 70,
                formatter: function (cellvalue, options, rowobject) {
                    if (cellvalue == 1)
                        return "是";
                    else
                        return "否";
                }
            },
            /*{name: 'created', index: 'created', width: 90, sorttype: "date", formatter: pickDate},*/
            /*            {
             name: 'status',
             index: 'status',
             width: 150,
             sortable: false,
             formatter: function (cellvalue, options, rowObject) {
             if (cellvalue == 1) {
             return "正常";
             } else {
             return "禁用";
             }
             }
             },*/
            {
                name: 'actions',
                index: 'actions',
                width: 80,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var html = actionHtml.replace("cId", rowObject.id);
                    html = html.replace("cId", rowObject.id);
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
        ///sordname: 'aCode',
        sortorder: 'desc',
        jsonReader: {
            root: "list",//保存详细记录的名称
            total: "totalPage",//总共有页
            page: "page",//当前是哪一页
            records: "records",//总共记录数
            repeatitems: false
        },
        postData: {
            contractCode: encodeURI($("#contractCode").val()),
            customerName: encodeURI($("#customerName").val()),
            isOpenInvoice: $("#isOpenInvoice option:selected").val(),
            isSendGoods: $("#isSendGoods option:selected").val(),
            isCashBack: $("#isCashBack option:selected").val(),
            contractType: $("#queryContractType option:selected").val()
        },
        footerrow: true,
        gridComplete: function () {
            var thisNum = $(this).getGridParam('rowNum');
            var rowNum = parseInt($(this).getGridParam('records'), thisNum);
            if (rowNum > 0) {
                $(".ui-jqgrid-sdiv").show();
                var prices = jQuery(this).getCol('price', false, 'sum');
                // var pricesSum = parseInt($(this).getGridParam('totalSum'));
                // alert(pricesSum);
                $(this).footerData("set", {
                    "cName": "当前页合同价格合计",
                    "price": prices.toFixed(2)
                    // "isCashBack": "<font color='red'>合同总价格合计<font>",
                    // "isSendGoods": "<font color='red'>" + pricesSum + "<font>"
                });
            } else {
                $(".ui-jqgrid-sdiv").hide();
            }
        },
        caption: "合同管理",
        autowidth: true
    });
    $(window).triggerHandler('resize.jqGrid');
    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });
}

///编辑所选合同
function editContract(contId) {
    ///createwindow("合同修改","/contract/edit.html?id=" + contId);
    ///alert("editor");
    $(".contract-body").empty();
    $(".contract-body").load('/contract/edit.html?id=' + contId, function () {

        $("#addModal").modal({backdrop: 'static', keyboard: false});
        $("#addModal").modal("show");
    })

}

///删除所选合同deleteContract
function deleteContract(contId) {
    ///alert("contractid:"+contId);
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此合同信息吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/contract/delete.ajax",
                ///async: false,
                dataType: 'json',
                data: {
                    cId: contId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除合同信息成功", function () {
                            refreshContractList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "删除合同信息失败");
                    }
                }
            });
        }
    });
}

//列表查询
function refreshContractList() {
    ///alert($("#customerName").val());
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            contractCode: encodeURI($("#contractCode").val()),
            customerName: encodeURI($("#customerName").val()),
            isOpenInvoice: $("#isOpenInvoice option:selected").val(),
            isSendGoods: $("#isSendGoods option:selected").val(),
            isCashBack: $("#isCashBack option:selected").val(),
            queryContractType: $("#queryContractType option:selected").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}

function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        ///alert("enter key down");
        refreshContractList();
    }
}