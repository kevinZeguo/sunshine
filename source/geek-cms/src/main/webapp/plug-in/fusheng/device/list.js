var device_list = {};
device_list.queryListUrl = "/device/list.ajax";//查询列表地址

//grid定义
var grid_selector = "#device-grid-table";
var pager_selector = "#device-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    device_list.init_base();
    //初始化事件
    device_list.init_event();
    //初始化列表
    device_list.init_grid();
});

//初始化基本信息
device_list.init_base = function () {
    $("#addModal").on("hidden", function () {
        $(this).removeData("modal");
    });
    listcustomer("#bCustomerId");
    listcustomer("#cNameQ");
}

//初始化事件
device_list.init_event = function () {
    //添加设备
    $("#addDevice").click(function () {
        $("#addDeviceBody").html("");
        $("#addDeviceModal").attr("style", "height:650px;width:1200px !important;margin-left:200px");
        var customerId = $("#cId").val();
        if (customerId != null && customerId != "" && undefined != customerId) {
            //$('#addModal').modal('data-remote'="/customer/add.html",'data-show'="true")
            $("#addDeviceBody").load('/device/add.html?customerId=' + customerId, function () {
                $("#addDeviceModal").modal({backdrop: 'static', keyboard: false});
                $("#addDeviceModal").modal("show");
            })
        } else {
            //$('#addModal').modal('data-remote'="/customer/add.html",'data-show'="true")
            $("#addDeviceBody").load('/device/add.html', function () {
                $("#addDeviceModal").modal({backdrop: 'static', keyboard: false});
                $("#addDeviceModal").modal("show");
            })
        }

    });


    //查询事件
    $("#queryBtn").click(function () {
        refreshDeviceList();
    })

    //回车事件
    $("#eModelQ").keydown(function (e) {
        keyEvent(e);
    })
    $("#makeNumQ").keydown(function (e) {
        keyEvent(e);
    })
    $("#hostNumQ").keydown(function (e) {
        keyEvent(e);
    })

    $("#addDeviceBatch").click(function () {
        $("#xlsxFileTips").html("");
        $("#bCustomerId").val("");
        var cId = $("#cId").val();
        if (cId != null && cId != '' && undefined != cId) {
            $("#bCustomerId").val(cId);
            $("#bCustomerId").attr("disabled", "disabled");
        }
        $("#bCustomerId").trigger("change");
        //$("#addDeviceModal").html("");
        //批量导入表单
        $("#addDeviceBatchModal").attr("style", "height:300px");
        $("#addDeviceBatchModal").modal({backdrop: 'static', keyboard: false});
        $("#addDeviceBatchModal").modal("show");
    })

    $("#addBatch-closeModal").click(function () {
        $("#addDeviceBatchModal").modal("hide");
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
            $("#xlsxFileTips").html("请选择excel文件进行导入!");
        }
        if (file.size > 107374182400) {
            $("#xlsxFileTips").html("文件不能超过100M");
        }
        $(".file-content").html(file.name);

    });

    //导入文件
    $("#save-device-batch-btn").click(function () {
        var input = $('#xlsxFile');
        var files = input.prop('files');
        $("#xlsxFileTips").html("");
        if (files == null || '' == files || 'undefined' == files || files.length != 1) {
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

        var cId = $("#bCustomerId").val();
        if (cId == null || cId == "") {
            $.cmsUtil.alertDialog($("#main-container"), "请设置客户再提交");
            return;
        }
        $("#addDeviceBatch").attr("disabled", "disabled");
        $('#deviceBatchForm').ajaxSubmit({
            url: "/device/import.ajax?customerId=" + cId,
            type: 'post',
            dataType: 'json',
            success: function (json, statusText, xhr, $form) {
                $("#addDeviceBatchModal").modal("hide");
                $.cmsUtil.alertDialog($("#main-container"), json.msg);
                refreshDeviceList();
                $("#addDeviceBatch").removeAttr("disabled");
                //$(".file-content").html("");
            },
            error: function (e) {
                console.log(e);
                $("#addDeviceBatchModal").modal("hide");
                $.cmsUtil.alertDialog($("#main-container"), "导入失败！请重新提交！" + e);

            }
        });
    })
}
//初始化grid列表
device_list.init_grid = function () {
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


    var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
        + '<button class="btn btn-xs btn-info" onclick="editDevice(eId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button class="btn btn-xs btn-danger" onclick="deleteDevice(eId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '</div>';

    //初始化grid
    $(grid_selector).jqGrid({
        url: device_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['设备编码', '客户名称', '设备机型', '制造号码', '现主机号码', '电控盘型号', '电机厂牌', '电机制造日期', '操作'],
        colModel: [
            {
                name: 'eCode', index: 'eCode', width: 160, formatter: function (eCode, data, record) {
                if (eCode != null && eCode != '' && eCode != "null") {
                    return "<a href='/device/info.html?eId=" + record.eId + "'>" + eCode + "</a>"
                } else {
                    return "--";
                }
            }
            },
            {name: 'cName', index: 'cName', width: 200},
            {name: 'eModel', index: 'eModel', width: 90},
            {name: 'makeNum', index: 'makeNum', width: 70},
            {name: 'hostNum', index: 'hostNum', width: 120},
            {name: 'elecPanModel', index: 'elecPanModel', width: 120},
            {name: 'motorBrand', index: 'motorBrand', width: 130, sortable: false},
            {name: 'formatDate', index: 'formatDate', width: 120, fixed: true, sortable: false},
            {
                name: 'actions',
                index: 'actions',
                width: 80,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
                    var html = actionHtml.replace("eId", rowObject.eId);
                    html = html.replace("eId", rowObject.eId);
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
            eModel: encodeURI($("#eModelQ").val()),
            makeNum: encodeURI($("#makeNumQ").val()),
            hostNum: encodeURI($("#hostNumQ").val()),
            cName: encodeURI($("#cNameQ").val())
        },
        caption: "设备管理",
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
function refreshDeviceList() {
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            eModel: encodeURI($("#eModelQ").val()),
            makeNum: encodeURI($("#makeNumQ").val()),
            hostNum: encodeURI($("#hostNumQ").val()),
            cName: encodeURI($("#cNameQ").val())
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshDeviceList();
    }
}

//编辑
function editDevice(eId) {
    $("#addDeviceBody").html("");
    //$('#addModal').modal('data-remote'="/customer/add.html",'data-show'="true")
    $("#addDeviceBody").load('/device/edit.html?eId=' + eId, function () {
        $("#addDeviceModal").modal({backdrop: 'static', keyboard: false});
        $("#addDeviceModal").modal("show");
    })
}

//删除
function deleteDevice(eId) {
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此设备信息吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/device/delete.ajax",
                async: false,
                dataType: 'json',
                data: {
                    eId: eId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除设备信息成功", function () {
                            refreshDeviceList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "删除设备信息失败");
                    }
                }
            });
        }
    });

}