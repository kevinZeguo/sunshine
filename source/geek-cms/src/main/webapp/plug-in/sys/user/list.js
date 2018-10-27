var user_list = {};
user_list.queryListUrl = "/cms/user/list.ajax";//查询列表地址

//grid定义
var grid_selector = "#user-grid-table";
var pager_selector = "#user-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    user_list.init_base();
    //初始化事件
    user_list.init_event();
    //初始化列表
    user_list.init_grid();
});

//初始化基本信息
user_list.init_base = function () {
    $("#addModal").on("hidden", function () {
        $(this).removeData("modal");
    });
}

//初始化事件
user_list.init_event = function () {
    //添加用户
    $("#addUser").click(function () {
        $(".user-body").empty();
        $(".user-body").load('/cms/user/add.html', function () {
            $("#addModal").modal({backdrop: 'static', keyboard: false});
            $("#addModal").modal("show");
        })
    });

    //查询事件
    $("#queryBtn").click(function () {
        refreshUserList();
    })

    //回车事件
    $("#userNameQ").keydown(function (e) {
        keyEvent(e);
    })
    $("#realNameQ").keydown(function (e) {
        keyEvent(e);
    })

}
//初始化grid列表
user_list.init_grid = function () {
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
        + '<button class="btn btn-xs btn-info" onclick="editUser(userId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button class="btn btn-xs btn-danger" onclick="deleteUser(userId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '<button class="btn btn-xs btn-warning" onclick="initUserPwd(userId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<span>初始化用户密码</span>'
        + '</button>'
        + '</div>';


    //初始化grid
    $(grid_selector).jqGrid({
        url: user_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['用户编号', '用户账号', '姓名', '部门', '角色', '创建时间', '状态', '操作'],
        colModel: [
            {name: 'userId', index: 'userId', width: 60, sorttype: "int"},
            {name: 'userName', index: 'userName', width: 90},
            {name: 'realName', index: 'realName', width: 150},
            {name: 'departName', index: 'departName', width: 70},
            {name: 'roleNames', index: 'roleNames', width: 150},
            {name: 'createdStr', index: 'createdStr', width: 120},
            {
                name: 'status',
                index: 'status',
                width: 40,
                sortable: false,
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == 1) {
                        return "正常";
                    } else {
                        return "禁用";
                    }
                }
            },
            {
                name: 'actions',
                index: 'actions',
                width: 180,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var html = actionHtml.replace("userId", rowObject.userId);
                    html = html.replace("userId", rowObject.userId);
                    html = html.replace("userId", rowObject.userId);
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
            userName: encodeURI($("#userNameQ").val()),
            realName: encodeURI($("#realNameQ").val())
        },
        caption: "用户管理",
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
function refreshUserList() {
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            userName: encodeURI($("#userNameQ").val()),
            realName: encodeURI($("#realNameQ").val())
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshUserList();
    }
}


//编辑用户
function editUser(userId) {
    $(".user-body").html("");
    $(".user-body").load('/cms/user/edit.html?userId=' + userId, function () {
        $("#addModal").modal({backdrop: 'static', keyboard: false});
        $("#addModal").modal("show");
    })
}

//删除用户
function deleteUser(userId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此用户信息吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/cms/user/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    userId: userId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除用户信息成功", function () {
                            refreshUserList();
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

function initUserPwd(userId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认初始化此用户的密码吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/cms/user/initUserPwd.ajax",
                async: false,
                dataType: 'json',
                data: {
                    userId: userId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "初始化用户密码成功,新密码：[" + data.obj.pwd + "]", function () {
                            refreshUserList();
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