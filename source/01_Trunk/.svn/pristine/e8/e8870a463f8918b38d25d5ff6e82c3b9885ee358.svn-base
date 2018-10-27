var customer_list = {};
customer_list.queryListUrl = "/customer/list.ajax";//查询列表地址

//grid定义
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    customer_list.init_base();
    //初始化事件
    customer_list.init_event();
    //初始化列表
    customer_list.init_grid();
});

//初始化基本信息
customer_list.init_base = function () {
    $("#addModal").on("hidden", function () {
        $(this).removeData("modal");
    });
    listUser($("#queryServiceEngineer"), 1, "请输入服务工程师姓名");
}

//初始化事件
customer_list.init_event = function () {
    //添加用户
    $("#addCustomer").click(function () {
        $(".customer-body").empty();
        $(".customer-body").load('/customer/add.html', function () {
            $("#addModal").modal({backdrop: 'static', keyboard: false});
            $("#addModal").modal("show");
        })
    });

    //查询事件
    $("#queryBtn").click(function () {
        refreshCustomerList();
    })

    //回车事件
    $("#queryCName").keydown(function (e) {
        keyEvent(e);
    })
    $("#queryAddress").keydown(function (e) {
        keyEvent(e);
    })
    $("#queryContact").keydown(function (e) {
        keyEvent(e);
    })

    $("#addBatch").click(function () {
        $("#xlsxFileTips").html("");
        $(".file-content").html("");
        //批量导入表单
        $("#addBatchModal").attr("style", "height:245px");
        $("#addBatchModal").modal({backdrop: 'static', keyboard: false});
        $("#addBatchModal").modal("show");
    })

    $("#addBatch-closeModal").click(function () {
        $("#addBatchModal").modal("hide");
    })


    $('#xlsxFile').change(function (event) {
        var input = $('#xlsxFile');
        var files = input.prop('files');
        $("#xlsxFileTips").html("");
        if (files == null || '' == files || 'undefined' == files || files.length != 1) {
            $("#xlsxFileTips").html("请选择文件!");
        }
        var file = files[0];
        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type != 'application/vnd.ms-excel') {
            $("#xlsxFileTips").html("请excel文件进行导入!");
        }
        if (file.size > 107374182400) {
            $("#xlsxFileTips").html("文件不能超过100M");
        }
        $(".file-content").html(file.name);

    });

    //导入文件
    $("#save-batch-btn").click(function () {
        var input = $('#xlsxFile');
        var files = input.prop('files');
        $("#xlsxFileTips").html("");
        if (files == null || '' == files || 'undefined' == files || files.length != 1 || $(".file-content").html() == '') {
            $("#xlsxFileTips").html("请选择文件!");
            return;
        }
        var file = files[0];
        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type != 'application/vnd.ms-excel') {
            $("#xlsxFileTips").html("请excel文件进行导入!");
            return;
        }
        if (file.size > 107374182400) {
            $("#xlsxFileTips").html("文件不能超过100M");
            return;
        }
        $("#addBatch").attr("disabled", "disabled");
        $('#customerBatchForm').ajaxSubmit({
            url: "/customer/importCustomer.ajax",
            type: 'post',
            dataType: 'json',
            success: function (json, statusText, xhr, $form) {
                $("#addBatchModal").modal("hide");
                $.cmsUtil.alertDialog($("#main-container"), json.msg);
                refreshCustomerList();
                $("#addBatch").removeAttr("disabled");
            },
            error: function (e) {
                console.log(e);
                $("#addBatchModal").modal("hide");
                $.cmsUtil.alertDialog($("#main-container"), "导入失败！请重新提交！" + e);

            }
        });
    })
}
//初始化grid列表
customer_list.init_grid = function () {
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
        + '<button class="btn btn-xs btn-info" onclick="editCustomer(cId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button class="btn btn-xs btn-danger" onclick="deleteCustomer(cId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '</div>';

    //初始化grid
    $(grid_selector).jqGrid({
        url: customer_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['客户编码', '客户名称', '客户地址', '设备数量', '联系人', '联系人电话', '服务工程师', '操作'],
        colModel: [
            {
                name: 'cCode', index: 'cCode', width: 110, formatter: function (cCode, data, record) {
                if (cCode != null && cCode != '' && cCode != "null") {
                    return "<a href='/customer/info.html?cId=" + record.cId + "'>" + cCode + "</a>"
                } else {
                    return "--";
                }
            }
            },
            {name: 'cName', index: 'cName', width: 90},
            {name: 'address', index: 'address', width: 180},
            {name: 'equipmentCount', index: 'equipmentCount', width: 70},
            {name: 'contact', index: 'contact', width: 70},
            {name: 'phone', index: 'phone', width: 90},
            {name: 'serviceEngineerName', index: 'serviceEngineerName', width: 150, sortable: false},
            {
                name: 'actions',
                index: 'actions',
                width: 80,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var html = actionHtml.replace("cId", rowObject.cId);
                    html = html.replace("cId", rowObject.cId);
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
            cName: encodeURI($("#queryCName").val()),
            address: encodeURI($("#queryAddress").val()),
            contact: encodeURI($("#queryContact").val()),
            serviceEngineer: $("#queryServiceEngineer").val()
        },
        caption: "客户管理",
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
function refreshCustomerList() {
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            cName: encodeURI($("#queryCName").val()),
            address: encodeURI($("#queryAddress").val()),
            contact: encodeURI($("#queryContact").val()),
            serviceEngineer: $("#queryServiceEngineer").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshCustomerList();
    }
}


//编辑用户
function editCustomer(cId) {
    $(".customer-body").html("");
    $(".customer-body").load('/customer/edit.html?cId=' + cId, function () {
        $("#addModal").modal({backdrop: 'static', keyboard: false});
        $("#addModal").modal("show");
    })
}

//删除用户
function deleteCustomer(cId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此客户信息吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/customer/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    cId: cId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除客户信息成功", function () {
                            refreshCustomerList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "删除客户信息失败");
                    }
                }
            });
        }
    });

}