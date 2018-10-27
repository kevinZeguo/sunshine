var role_list = {};
role_list.queryListUrl = "/cms/role/list.ajax";//查询列表地址

//grid定义
var grid_selector = "#role-grid-table";
var pager_selector = "#role-grid-pager";
var zTree;
var roleId;

$(document).ready(function ($) {
    //初始化列表
    role_list.init_grid();

    //初始化基本信息
    role_list.init_base();
    //初始化事件
    role_list.init_event();

});

//初始化基本信息
role_list.init_base = function () {
    $("#addModal").on("hidden", function () {
        $(this).removeData("modal");
    });

    $("#addRightModal").on("hidden", function () {
        $(this).removeData("modal");
    });

    //保存功能权限
    $("#saveFunc").click(function () {
        if (zTree != null) {
            var treeObj = $.fn.zTree.getZTreeObj("funcTree");
            var nodes = treeObj.getCheckedNodes(true);
            console.log(nodes);
            var funIds = "";
            for (var i = 0; i < nodes.length; i++) {
                if (funIds != "" && funIds.length > 0) {
                    funIds += ",";
                }
                funIds += nodes[i].functionId;
            }
            console.log(funIds);
            $.ajax({
                url: "/cms/role/saveMenuRight.ajax",
                async: false,
                data: {
                    roleId: roleId,
                    functionIds: funIds
                },
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "修改角色下的菜单权限成功");
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), data.msg);
                    }
                }
            });
        }
    })

    $("#addUserRole").click(function () {
        addUser();
    });
}

//初始化事件
role_list.init_event = function () {
    //添加用户
    $("#addRole").click(function () {
        $(".role-body").empty();
        $(".role-body").load('/cms/role/add.html', function () {
            $("#addModal").modal({backdrop: 'static', keyboard: false});
            $("#addModal").modal("show");
        })
    });

    //查询事件
    $("#queryBtn").click(function () {
        refreshRoleList();
    })

    //回车事件
    $("#roleNameQ").keydown(function (e) {
        keyEvent(e);
    })

}
//初始化grid列表
role_list.init_grid = function () {
    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(grid_selector).jqGrid('setGridWidth', $(".role-grid").width());
    })

    ////resize on sidebar collapse/expand
    //var parent_column = $(grid_selector).closest('[class*="col-"]');
    //$(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
    //    if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
    //        //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
    //        setTimeout(function () {
    //            $(grid_selector).jqGrid('setGridWidth', parent_column.width());
    //        }, 0);
    //    }
    //})

    //定义修改删除
    var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
        + '<button class="btn btn-xs btn-info" onclick="editRole(roleId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button class="btn btn-xs btn-danger" onclick="deleteRole(roleId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '</div>';
    //初始化grid
    $(grid_selector).jqGrid({
        url: role_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['角色Id', '角色名称', '角色编码', '操作'],
        colModel: [
            {name: 'roleId', index: 'roleId', width: 60, sorttype: "int"},
            {name: 'roleName', index: 'roleName', width: 150},
            {name: 'roleCode', index: 'roleCode', width: 150},
            {
                name: 'actions',
                index: 'actions',
                width: 100,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var html = actionHtml.replace("roleId", rowObject.roleId);
                    html = html.replace("roleId", rowObject.roleId);
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
            roleName: encodeURI($("#roleNameQ").val())
        },
        caption: "角色管理",
        onSelectRow: function (rowid, selected, event) {
            var rowDatas = $(grid_selector).jqGrid('getRowData', rowid);
            if (roleId != rowDatas.roleId) {
                roleId = rowDatas.roleId;
                initFuncTree(roleId);
            }
        }
    });
    $(window).triggerHandler('resize.jqGrid');
    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });


}

//列表查询
function refreshRoleList() {
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            roleName: encodeURI($("#roleNameQ").val())
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshRoleList();
    }
}


//编辑用户
function editRole(roleId) {
    $(".role-body").html("");
    $(".role-body").load('/cms/role/edit.html?roleId=' + roleId, function () {
        $("#addModal").modal({backdrop: 'static', keyboard: false});
        $("#addModal").modal("show");
    })
}

//删除用户
function deleteRole(roleId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此角色信息吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/cms/role/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    roleId: roleId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除角色信息成功", function () {
                            refreshRoleList();
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

//初始化角色下的菜单
function initFuncTree(roleId) {
    $("#saveFunc").removeClass("disabled");
    var setting = {
        view: {
            dblClickExpand: false  //设置是否双击鼠标左键打开
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "functionId",  //设置字段ID格式
                nameKey: "functionName",
                titleKey: "functionName",
                pIdKey: "parentFunctionId"  //设置父ID的格式
            },
            key: {
                name: "functionName",
                title: "functionName"
            }
        },
        check: {
            enable: true   //是否有复选框：true?false
        },
        callback: {
            //onClick: onClick, //鼠标单击事件
            //onRightClick: OnRightClick //鼠标屏蔽右键
        },
        edit: {
            enable: false //是否允许编辑
        },
        showLine: false  //是否允许有下划线
    };

    var treeNodes;  //定义Ztree的节点数组
    $.ajax({
        async: false,
        cache: false,
        type: "post",
        dataType: "json",  //返回json格式
        url: "/cms/role/menulist.ajax?roleId=" + roleId,  //请求的URL路径
        success: function (data) { //请求成功后处理函数。
            //请求后返回的json是字符串，需要用eval()函数转换成Object类型
            treeNodes = data.obj;
        }, error: function (e) {//请求失败处理函数
            console.log("加载菜单数据失败!" + e.msg);
        }
    });

    zTree = $.fn.zTree.init($("#funcTree"), setting, treeNodes);
}


function addUser() {
    if (roleId == null || roleId == '' || undefined == roleId) {
        $.cmsUtil.alertDialog($("#main-container"), "请先选择一个角色后再给用户授权");
        return;
    }

    $(".right-body").empty();
    $(".right-body").load('/cms/role/addUser.html', function () {
        $("#addRightModal").modal({backdrop: 'static', keyboard: false});
        $("#addRightModal").modal("show");
    })
}


