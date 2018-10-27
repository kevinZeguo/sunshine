var hotel_order = {};
hotel_order.queryListUrl = "/cms/order/list.ajax";//查询列表地址
//grid定义
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$(document).ready(function ($) {
    //初始化基本信息
    hotel_order.init_base();
    //初始化事件
    hotel_order.init_event();
    hotel_order.init_table();
});

//查询表格数据
hotel_order.init_table = function () {
    //resize to fit page size
    // $(window).on('resize.jqGrid', function () {
    //     $(grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    // })
    ////resize on sidebar collapse/expand
    // var parent_column = $(grid_selector).closest('[class*="col-"]');
    // $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
    //     if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
    //         //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
    //         setTimeout(function () {
    //             $(grid_selector).jqGrid('setGridWidth', parent_column.width());
    //         }, 0);
    //     }
    // })


    var orderHtml = '<button class="btn btn-xs btn-info" onclick="confirmOrder(orderId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="确认预约">'
        + '确认预订'
        + '</button>';
    var deleteHtml = '<button class="btn btn-xs btn-danger" onclick="deleteOrder(orderId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除预约">'
        + '删除'
        + '</button>';

    //初始化grid
    $(grid_selector).jqGrid({
        url: hotel_order.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['订单编号', '房型Id', '房型名称', '预约状态', '客户名称', '客户电话', '客户邮箱', '预约房间数', '总价', '优惠总价', '入住时间', '离店时间', '到店时间', '预约时间', '确认预约时间', '备注', '操作'],
        colModel: [
            {name: 'id', index: 'id', width: 60, fixed: true, sortable: false},
            {name: 'typeId', index: 'typeId', width: 60, hidden: true},
            {name: 'typeName', index: 'typeName', width: 80, fixed: true, sortable: false},
            {
                name: 'orderStatus',
                index: 'orderStatus',
                width: 80,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var orderStatus = rowObject.orderStatus;
                    if (orderStatus == 1) {
                        return "<span style='color: red'>提交预订</span>";
                    } else {
                        return "确认预订"
                    }
                }
            },
            {name: 'username', index: 'username', width: 80, fixed: true, sortable: false},
            {name: 'telephone', index: 'telephone', width: 120, fixed: true, sortable: false},
            {name: 'email', index: 'email', width: 150, fixed: true, sortable: false},
            {name: 'orderNumRooms', index: 'orderNumRooms', width: 80, fixed: true, sortable: false},
            {name: 'sumPrice', index: 'sumPrice', width: 80, fixed: true, sortable: false},
            {name: 'sumSalePrice', index: 'sumSalePrice', width: 80, fixed: true, sortable: false},
            {name: 'startDateStr', index: 'startDateStr', width: 120, fixed: true, sortable: false},
            {name: 'endDateStr', index: 'endDateStr', width: 120, fixed: true, sortable: false},
            {name: 'lateArriTime', index: 'lateArriTime', width: 120, fixed: true, sortable: false},
            {name: 'orderDateStr', index: 'orderDateStr', width: 120, fixed: true, sortable: false},
            {name: 'confirmDateStr', index: 'confirmDateStr', width: 120, fixed: true, sortable: false},
            {name: 'comment', index: 'comment', width: 120, fixed: true, sortable: false},
            {
                name: 'actions',
                index: 'actions',
                width: 120,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
                    if (rowObject.orderStatus == 1) {
                        actionHtml += orderHtml.replace("orderId", rowObject.id);
                    }
                    actionHtml += deleteHtml.replace("orderId", rowObject.id);
                    actionHtml += '</div>';
                    return actionHtml;
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
            typeId: $("#typeId").val(),
            orderStatus: $("#orderStatus").val(),
            inStartDate: $("#inStartDate").val(),
            inEndDate: $("#inEndDate").val(),
            orderStartDate: $("#orderStartDate").val(),
            orderEndDate: $("#orderEndDate").val(),
            outStartDate: $("#outStartDate").val(),
            orderEndDate: $("#orderEndDate").val(),
            userKey: encodeURI($("#userKey").val())
        },
        caption: "订单列表",
        autowidth: true
    });
    $(window).triggerHandler('resize.jqGrid');

    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });
}

//初始化基本信息
hotel_order.init_base = function () {
    $('#inStartDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });

    $('#inEndDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    $('#orderStartDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });

    $('#orderEndDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    $('#outStartDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });

    $('#outEndDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    $("#typeId").select2();
    $("#orderStatus").select2();

}

//初始化事件
hotel_order.init_event = function () {
    $("#queryBtn").click(function () {
        refreshList();
    })
}

//列表查询
function refreshList() {
    ///alert($("#customerName").val());
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            typeId: $("#typeId").val(),
            orderStatus: $("#orderStatus").val(),
            inStartDate: $("#inStartDate").val(),
            inEndDate: $("#inEndDate").val(),
            orderStartDate: $("#orderStartDate").val(),
            orderEndDate: $("#orderEndDate").val(),
            outStartDate: $("#outStartDate").val(),
            orderEndDate: $("#orderEndDate").val(),
            userKey: encodeURI($("#userKey").val())
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}

function confirmOrder(orderId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认此订单吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/cms/order/confirm.ajax",
                async: false,
                dataType: 'json',
                data: {
                    orderId: orderId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "确认订单成功", function () {
                            refreshList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "确认订单失败");
                    }
                }
            });
        }
    });

}

function deleteOrder(orderId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此订单吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/cms/order/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    orderId: orderId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除订单成功", function () {
                            refreshList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "删除订单失败");
                    }
                }
            });
        }
    });

}