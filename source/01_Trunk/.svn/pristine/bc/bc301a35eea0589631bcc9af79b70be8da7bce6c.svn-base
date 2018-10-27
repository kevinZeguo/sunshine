var attr_list = {};
attr_list.queryListUrl = "/attr/list.ajax";//查询列表地址

//grid定义
var grid_selector = "#attr-grid-table";
var pager_selector = "#attr-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    attr_list.init_base();
    //初始化事件
    attr_list.init_event();
    //初始化列表
    attr_list.init_grid();
});

//初始化基本信息
attr_list.init_base = function () {
    $("#addModal").on("hidden", function () {
        $(this).removeData("modal");
    });
}

//初始化事件
attr_list.init_event = function () {
    //添加用户
    $("#addAttr").click(function () {
        $(".attr-body").empty();
        $(".attr-body").load('/attr/add.html', function () {
            $("#addModal").modal({backdrop: 'static', keyboard: false});
            $("#addModal").modal("show");
        })
    });

    //查询事件
    $("#queryBtn").click(function () {
        refreshAttrList();
    })

    //回车事件
    $("#key").keydown(function (e) {
        keyEvent(e);
    })
    $("#attrGroupIdQ").keydown(function (e) {
        keyEvent(e);
    })

}
//初始化grid列表
attr_list.init_grid = function () {
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

    //定义修改删除
    var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
        + '<button class="btn btn-xs btn-info" onclick="editAttr(attrId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button class="btn btn-xs btn-danger" onclick="deleteAttr(attrId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '</div>';

    //初始化grid
    $(grid_selector).jqGrid({
        url: attr_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['字典Id', '字典Code', '字典值', '字典描述', '字典组名称', '字典组Code', '创建时间', '操作'],
        colModel: [
            {name: 'attrId', index: 'attrId', width: 60, sorttype: "int"},
            {name: 'attrCode', index: 'attrCode', width: 90},
            {name: 'attrValue', index: 'attrValue', width: 150},
            {name: 'attrDesc', index: 'attrDesc', width: 150},
            {name: 'attrGroupName', index: 'attrGroupName', width: 80},
            {name: 'attrGroupCode', index: 'attrGroupCode', width: 150},
            {name: 'createdStr', index: 'createdStr', width: 100},
            {
                name: 'actions',
                index: 'actions',
                width: 80,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var html = actionHtml.replace("attrId", rowObject.attrId);
                    html = html.replace("attrId", rowObject.attrId);
                    html = html.replace("attrId", rowObject.attrId);
                    return html;
                }
            }
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: pager_selector,
        //altRows: true,
        multiselect: true,
        multiboxonly: true,
        //sordname: 'cId',
        sortorder: 'desc',
        jsonReader: {
            root: "list",//保存详细记录的名称
            total: "totalPage",//总共有页
            page: "page",//当前是哪一页
            records: "records",//总共记录数
            repeatitems: false
        },
        postData: {
            key: encodeURI($("#key").val()),
            attrGroupIdQ: $("#attrGroupIdQ").val()
        },
        caption: "字典管理",
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
function refreshAttrList() {
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            key: encodeURI($("#key").val()),
            attrGroupIdQ: $("#attrGroupIdQ").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshAttrList();
    }
}


//编辑用户
function editAttr(attrId) {
    $(".attr-body").html("");
    $(".attr-body").load('/attr/edit.html?attrId=' + attrId, function () {
        $("#addModal").modal({backdrop: 'static', keyboard: false});
        $("#addModal").modal("show");
    })
}

//删除用户
function deleteAttr(attrId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此字典吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/attr/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    attrId: attrId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除字典成功", function () {
                            refreshAttrList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), data.msg);
                    }
                }
            });
        }
    });

}
