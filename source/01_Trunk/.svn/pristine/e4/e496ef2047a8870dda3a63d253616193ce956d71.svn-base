var add_part = {};
add_part.queryListUrl = "/part/list.ajax";//查询列表地址
add_part.querySelectListUrl = "/device/listPart.ajax";//查询列表地址

//grid定义
var select_part_grid_selector = "#select-part-grid-table";
var select_part_pager_selector = "#select-part-grid-pager";

var part_grid_selector = "#part-grid-table";
var part_pager_selector = "#part-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    add_part.init_base();
    //初始化事件
    add_part.init_event();

    add_part.init_part_grid();
    //初始化列表
    add_part.init_select_part_grid();
});

//初始化基本信息
add_part.init_base = function () {

}

//初始化事件
add_part.init_event = function () {
    //添加设备
    $("#addPart").click(function () {
        $("#selectPartTips").addClass("hidden");
        $("#pKeys").val("");
        $("#addPartModal").attr("style", "height:510px;width:800px !important;margin-left:200px");
        $("#addPartModal").modal("show");
        refreshSelectPartList();
    });

    //删除配件
    $("#deletePart").click(function () {
        var ids = $(part_grid_selector).jqGrid("getGridParam", "selarrrow");
        if (ids == null || ids == '' || ids.length == 0) {
            $.cmsUtil.alertDialog($("#main-container"), "请选择配件进行删除！");
            return;
        } else {
            var pids = "";
            for (var i = 0; i < ids.length; i++) {
                var rowData = $(part_grid_selector).jqGrid('getRowData', ids[i]);
                if (pids != null && pids != '') {
                    pids += ",";
                }
                pids += rowData.pId;
            }
            //保存配件信息
            $.ajax({
                url: "/device/deletePart.ajax",
                async: false,
                dataType: 'json',
                data: {
                    eId: $("#eId").val(),
                    pIds: pids
                },
                type: "get",
                success: function (data) {
                    $("#addPartModal").modal("hide");
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除成功", function () {
                            refreshPartList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "删除失败");
                    }
                }
            });
        }
    })


    //查询事件
    $("#queryPartBtn").click(function () {
        refreshSelectPartList();
    })

    $("#pKeys").keydown(function (e) {
        refreshSelectPartList();
    })


    //保存配件
    $("#save-part-btn").click(function () {
        $("#selectPartTips").addClass("hidden");
        var ids = $(select_part_grid_selector).jqGrid("getGridParam", "selarrrow");
        if (ids == null || ids == '' || ids.length == 0) {
            $("#selectPartTips").removeClass("hidden");
            return;
        } else {
            var pids = "";
            for (var i = 0; i < ids.length; i++) {
                var rowData = $(select_part_grid_selector).jqGrid('getRowData', ids[i]);
                if (pids != null && pids != '') {
                    pids += ",";
                }
                pids += rowData.pId;
            }
            //保存配件信息
            $.ajax({
                url: "/device/savePart.ajax",
                async: false,
                dataType: 'json',
                data: {
                    eId: $("#eId").val(),
                    pIds: pids
                },
                type: "get",
                success: function (data) {
                    $("#addPartModal").modal("hide");
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "保存成功", function () {
                            refreshPartList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "保存失败");
                    }
                }
            });
        }
    })

    //关闭选择配件页面
    $("#close-add-part").click(function () {
        $("#pKeys").val("");
        $("#addPartModal").modal("hide");//隐藏
    })
}

//初始化grid列表
add_part.init_part_grid = function () {
    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(part_grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    })

    ////resize on sidebar collapse/expand
    var parent_column = $(part_grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(part_grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })

    $(part_grid_selector).jqGrid({
        url: add_part.querySelectListUrl,
        datatype: "json",
        height: 365,
        colNames: ['配件Id', '配件编码', '配件名称', '配件描述', '创建日期', '创建人'],
        colModel: [
            {name: 'pId', index: 'pId', width: 270, hidden: true},
            {
                name: 'pCode', index: 'pCode', width: 260, formatter: function (pCode, data, record) {
                if (pCode != null && pCode != '' && pCode != "null") {
                    return "<a href='/part/info.html?pId=" + record.pId + "'>" + pCode + "</a>"
                } else {
                    return "--";
                }
            }
            },
            {name: 'pName', index: 'pName', width: 270},
            {name: 'note', index: 'note', width: 250},
            {name: 'formatCreated', index: 'formatCreated', width: 180},
            {name: 'creatorName', index: 'creatorName', width: 180}
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: part_pager_selector,
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
            eId: $("#eId").val()
        },
        caption: "设备配件",
        autowidth: true
    })
    $(window).triggerHandler('resize.jqGrid');
    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(part_grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });

}


//初始化grid列表
add_part.init_select_part_grid = function () {
    $(select_part_grid_selector).jqGrid({
        url: add_part.queryListUrl,
        datatype: "json",
        height: 305,
        colNames: ['配件Id', '配件编码', '配件名称', '配件描述', '创建日期', '创建人'],
        colModel: [
            {name: 'pId', index: 'pId', width: 270, hidden: true},
            {
                name: 'pCode', index: 'pCode', width: 260, formatter: function (pCode, data, record) {
                if (pCode != null && pCode != '' && pCode != "null") {
                    return "<a href='/part/info.html?pId=" + record.pId + "'>" + pCode + "</a>"
                } else {
                    return "--";
                }
            }
            },
            {name: 'pName', index: 'pName', width: 270},
            {name: 'note', index: 'note', width: 250},
            {name: 'formatCreated', index: 'formatCreated', width: 180},
            {name: 'creatorName', index: 'creatorName', width: 180}
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: select_part_pager_selector,
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
            outEId: $("#eId").val(),
            keyword: encodeURI($("#pKeys").val())
        },
        caption: "选择配件",
        autowidth: false
    });
    $(window).triggerHandler('resize.jqGrid');

    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(select_part_grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });

}

//列表查询
function refreshSelectPartList() {
    $(select_part_grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            outEId: $("#eId").val(),
            keyword: encodeURI($("#pKeys").val())
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyPartEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshSelectPartList();
    }
}