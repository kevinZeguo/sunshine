var hotel_room = {};
hotel_room.queryListUrl = "/cms/room/list.ajax";//查询列表地址
//grid定义
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$(document).ready(function ($) {
    //初始化基本信息
    hotel_room.init_base();
    //初始化事件
    hotel_room.init_event();
    hotel_room.init_table();
});

//查询表格数据
hotel_room.init_table = function () {
    // resize to fit page size
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


    var orderHtml = '<button class="btn btn-xs btn-info" onclick="editRoom(initId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="修改">'
        + '修改'
        + '</button>';
    var deleteHtml = '<button class="btn btn-xs btn-danger" onclick="deleteRoom(typeId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除预约">'
        + '删除'
        + '</button>';

    //初始化grid
    $(grid_selector).jqGrid({
            url: hotel_room.queryListUrl,
            datatype: "json",
            height: 365,
            colNames: ['房间初始化Id', '房型Id', '房型名称', '是否可预约', '是否可预约', '房间总数', '剩余房间数', '1人住单价', '2人住单价', '1人住优惠价', '2人住优惠价', '预订日期', '备注', '操作'],
            colModel: [
                {name: 'initId', index: 'initId', width: 60, hidden: true},
                {name: 'typeId', index: 'typeId', width: 60, hidden: true},
                {name: 'typeName', index: 'typeName', fixed: true, sortable: false},
                {
                    name: 'perStatus',
                    index: 'perStatus',
                    width: 80,
                    hidden: true,
                    fixed: true,
                    sortable: false
                },
                {
                    name: 'perStatus1',
                    index: 'perStatus1',
                    width: 80,
                    fixed: true,
                    sortable: false,
                    formatter: function (a, b, rowObject) {
                        var perStatus = rowObject.perStatus;
                        if (perStatus == 0) {
                            return "<span style='color: red'>否</span>";
                        } else {
                            return "是"
                        }
                    }
                },
                {name: 'numRooms', index: 'numRooms', width: 80, fixed: true, sortable: false},
                {name: 'numRetainRooms', index: 'numRetainRooms', width: 120, fixed: true, sortable: false},
                {name: 'price1', index: 'price1', width: 120, fixed: true, sortable: false},
                {name: 'price2', index: 'price2', width: 120, fixed: true, sortable: false},
                {
                    name: 'salePrice1',
                    index: 'salePrice1',
                    width: 120,
                    fixed: true,
                    sortable: false,
                    formatter: function (a, b, rowObject) {
                        var price1 = rowObject.price1;
                        var salePrice1 = rowObject.salePrice1;
                        if (price1 != salePrice1) {
                            return "<div style='color: red'>" + salePrice1 + " </div>"
                        } else {
                            return salePrice1;
                        }
                    }
                },
                {
                    name: 'salePrice2', index: 'salePrice2', width: 120, fixed: true, sortable: false,
                    formatter: function (a, b, rowObject) {
                        var price2 = rowObject.price2;
                        var salePrice2 = rowObject.salePrice2;
                        if (price2 != salePrice2) {
                            return "<div style='color: red'>" + salePrice2 + " </div>"
                        } else {
                            return salePrice2;
                        }
                    }
                },
                {name: 'roomDateStr', index: 'roomDateStr', width: 120, fixed: true, sortable: false},
                {name: 'comment', index: 'comment', width: 120, fixed: true, sortable: false},
                {
                    name: 'actions',
                    index: 'actions',
                    width: 120,
                    fixed: true,
                    sortable: false,
                    formatter: function (a, b, rowObject) {
                        var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
                        actionHtml += orderHtml.replace("initId", rowObject.initId);
                        // actionHtml += deleteHtml.replace("typeId", rowObject.id);
                        actionHtml += '</div>';
                        return actionHtml;
                        return ""
                    }
                }
            ],
            viewrecords: true,
            rowNum:
                10,
            rowList:
                [10, 20, 30],
            pager:
            pager_selector,
            altRows:
                true,
            multiselect:
                true,
            multiboxonly:
                true,
            sordname:
                'id',
            sortorder:
                'desc',
            jsonReader:
                {
                    root: "list",//保存详细记录的名称
                    total:
                        "totalPage",//总共有页
                    page:
                        "page",//当前是哪一页
                    records:
                        "records",//总共记录数
                    repeatitems:
                        false
                }
            ,
            postData: {
                typeId: $("#typeId").val(),
                orderStartDate:
                    $("#orderStartDate").val(),
                orderEndDate:
                    $("#orderEndDate").val(),
                perStatus:
                    $("#perStatus").val()
            }
            ,
            caption: "房间列表",
            autowidth:
                true
        }
    )
    ;
    $(window).triggerHandler('resize.jqGrid');

//设置
    $(document).on('ajaxloadstart', function (e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });
}

//初始化基本信息
hotel_room.init_base = function () {
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
hotel_room.init_event = function () {
    $("#queryBtn").click(function () {
        refreshList();
    })

    $("#closeOrder").click(function () {
        var ids = $(grid_selector).jqGrid("getGridParam", "selarrrow");
        if (ids == null || ids.length == 0) {
            $.cmsUtil.alertDialog($("#main-container"), "请选择至少一行数据进行操作!");
            return;
        }
        console.log(ids);
        var initIds = "";
        for (var i = 0; i < ids.length; i++) {
            var rowId = ids[i];
            var data = $(grid_selector).jqGrid("getRowData", rowId);
            console.log(data);
            if (data.perStatus == "0") {
                $.cmsUtil.alertDialog($("#main-container"), "存在已关闭预约的房间，不能重复关闭，请重新选择房间!");
                return;
            }
            if (initIds != "") {
                initIds += ",";
            }
            initIds += data.initId;
        }

        //弹出确认窗口
        $.cmsUtil.showConfirmDialog($("#main-container"), "确认关闭预订吗？", function (result) {
            if (result) {
                $.ajax({
                    url: "/cms/room/closeOrder.ajax",
                    async: false,
                    dataType: 'json',
                    data: {
                        initIds: initIds
                    },
                    type: "post",
                    success: function (data) {
                        if (data.success) {
                            $.cmsUtil.alertDialog($("#main-container"), "关闭预约成功", function () {
                                refreshList();
                            });
                            return;
                        } else {
                            $.cmsUtil.alertDialog($("#main-container"), "关闭预约成功");
                        }
                    }
                });
            }
        });


    })

    $("#openOrder").click(function () {
        var ids = $(grid_selector).jqGrid("getGridParam", "selarrrow");
        if (ids == null || ids.length == 0) {
            $.cmsUtil.alertDialog($("#main-container"), "请选择至少一行数据进行操作!");
            return;
        }
        console.log(ids);
        var initIds = "";
        for (var i = 0; i < ids.length; i++) {
            var rowId = ids[i];
            var data = $(grid_selector).jqGrid("getRowData", rowId);
            console.log(data);
            if (data.perStatus == "1") {
                $.cmsUtil.alertDialog($("#main-container"), "存在开启预约的房间，不能重复开启，请重新选择房间!");
                return;
            }
            if (initIds != "") {
                initIds += ",";
            }
            initIds += data.initId;
        }

        //弹出确认窗口
        $.cmsUtil.showConfirmDialog($("#main-container"), "确认开启预订吗？", function (result) {
            if (result) {
                $.ajax({
                    url: "/cms/room/openOrder.ajax",
                    async: false,
                    dataType: 'json',
                    data: {
                        initIds: initIds
                    },
                    type: "post",
                    success: function (data) {
                        if (data.success) {
                            $.cmsUtil.alertDialog($("#main-container"), "开启预约成功", function () {
                                refreshList();
                            });
                            return;
                        } else {
                            $.cmsUtil.alertDialog($("#main-container"), "开启预约成功");
                        }
                    }
                });
            }
        });
    })

}

//列表查询
function refreshList() {
    var orderStartDate = $("#orderStartDate").val();
    if (orderStartDate != "" && orderStartDate != null) {
        orderStartDate += " 00:00:00";
    }
    var orderEndDate = $("#orderEndDate").val();
    if (orderEndDate != "" && orderEndDate != null) {
        orderEndDate += " 23:59:59";
    }

    ///alert($("#customerName").val());
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            typeId: $("#typeId").val(),
            orderStartDate: orderStartDate,
            orderEndDate: orderEndDate,
            perStatus: $("#perStatus").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}

function editRoom(initId) {
    $(".room-body").html("");
    $(".room-body").load('/cms/room/edit.html?initId=' + initId, function () {
        $("#addModal").modal({backdrop: 'static', keyboard: false});
        $("#addModal").modal("show");
    })
}

function deleteRoom(orderId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此订单吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/cms/order/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    eId: eId
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