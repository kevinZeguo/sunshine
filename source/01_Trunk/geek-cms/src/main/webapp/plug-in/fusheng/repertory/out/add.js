var rep_out_add = {}
rep_out_add.queryListUrl = "/repertory/out/outRepDetailList.ajax";
//grid定义
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";

//编辑客户信息
$(document).ready(function () {
    init_base();//初始化基本信息
    init_event();//初始化事件
    init_form_submit();//初始化表单提交
    //初始化列表
    init_grid();
});

//初始化事件
function init_event() {
    $("#addpart").click(function () {
        var storageId = $("#storageId").val();
        if (storageId == null || storageId == '') {
            $.cmsUtil.alertDialog($("#mainContenter"), "请先选择出库仓库");
            return;
        }
        $("#recordId").val("");
        $("#partId").val("");
        $("#partName").val("");
        $("#partCode").val("");
        $("#leftCount").val("");
        $("#price").val("");
        $("#unit").val("");
        $("#num").val("");
        $("#taxAmt").val("");
        $("#totalAmt").val("")

        listStoragePart("#partId", "#storageId", changetPart);
        $("#selectPartModal").modal({backdrop: 'static', keyboard: false});
        $("#selectPartModal").modal("show");
    })

    $("#closeModal").click(function () {
        $("#selectPartModal").modal("hide");
    })

    //切换仓库，则情况 配件列表
    $("#storageId").change(function () {
        jQuery(grid_selector).jqGrid("clearGridData");
    })
    //添加配件数据
    $("#add-part").click(function () {
        var result = $('#deviceForm').valid();
        if (!result) {
            return false;
        }
        var ids = jQuery(grid_selector).jqGrid('getDataIDs');
        var rowid = 0;
        if (ids == null || ids == '' || ids.length == 0) {
            rowid = 0;
        } else {
            rowid = Math.max.apply(Math, ids);
        }
        var newrowid = rowid + 1;
        var dataRow = {
            pId: $("#partId").val(),
            pName: $("#partName").val(),
            pCode: $("#partCode").val(),
            leftCount: $("#leftCount").val(),
            pPrice: $("#price").val(),
            unit: $("#unit").val(),
            num: $("#num").val(),
            taxAmt: $("#taxAmt").val(),
            totalAmt: $("#totalAmt").val()
        };
        var recordId = $("#recordId").val();
        if (recordId != null && recordId != '') {
            $(grid_selector).jqGrid("setRowData", recordId, dataRow);
        } else {
            $(grid_selector).jqGrid("addRowData", newrowid, dataRow, "first");
        }
        $("#selectPartModal").modal("hide");
        //$(grid_selector).editRow(newrowid, true);
        //$(grid_selector).setGridParam({cellEdit: false});
    });
    $("#price").change(function () {
        var price = $(this).val();
        var num = $("#num").val();
        if (price != null && num != null && price != '' && num != '') {
            $("#totalAmt").val(Number(price) * Number(num));
        }
    })

    $("#num").change(function () {
        var price = $("#price").val();
        var num = $(this).val();
        if (price != null && num != null && price != '' && num != '') {
            $("#totalAmt").val(Number(price) * Number(num));
        }
    })

    $("#closeAdd").click(function () {
        $("#selectPartModal").modal("hide");
    });

}

//初始化基本信息
function init_base() {
    listcustomer("#customerId", changeCustomer);
    initAttrSelect("#sendType", "sender.typelist", $("#sendType").attr("aVal"));
    initAttrSelect("#storageId", "part.stock.storagelist", $("#storageId").attr("aVal"));
    listContract("#contractId", ("#customerId"));
}

//初始化表单提交
function init_form_submit() {
    $('#inOutForm').validate({
        // 默认validate在提交表达之前是不会触发验证的，
        // 重写onfocusout方法，使其不需提交表单就能触发验证
        onfocusout: function (element) {
            $(element).valid();
        },
        onchange: function (element) {
            $(element).valid();
        },
        // 默认validate是不对隐藏的元素进行验证的,即忽略:hidden
        ignore: ":hidden",
        rules: {
            customerId: {
                required: true
            },
            contractId: {
                required: true
            },
            sendType: {
                required: true

            },
            receiverAddress: {
                rangelength: [0, 256]
            },

            storageId: {
                required: true
            },

            linkman: {
                rangelength: [0, 128]
            },
            telSign: {
                rangelength: [0, 128]
            },
            postcode: {
                rangelength: [0, 128]
            },
            fax: {
                rangelength: [0, 128]
            }, sender: {
                rangelength: [0, 128]
            },
            note: {
                rangelength: [0, 256]
            }
        },
        messages: {
            customerId: {
                required: "* 请选择客户"
            },
            contractId: {
                required: "* 请选择销售合同"
            },
            sendType: {
                required: "* 请选择配送方式"
            },
            receiverAddress: {
                rangelength: "* 收货地址为介于{0}到{1}之间的字符串"
            },

            storageId: {
                required: "* 请选择仓库"
            },

            linkman: {
                rangelength: "* 联系人为介于{0}到{1}之间的字符串"
            },
            telSign: {
                rangelength: "* 联系电话为介于{0}到{1}之间的字符串"
            },
            postcode: {
                rangelength: "* 邮编为介于{0}到{1}之间的字符串"
            },
            fax: {
                rangelength: "* 传真为介于{0}到{1}之间的字符串"
            }, sender: {
                rangelength: "* 发货人为介于{0}到{1}之间的字符串"
            },
            note: {
                rangelength: "* 备注为介于{0}到{1}之间的字符串"
            }
        },
        errorElement: 'label',
        errorClass: 'help-block',
        focusInvalid: true,
        invalidHandler: function (form, validator) {
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },
        highlight: function (e) {
            $(e).closest('.form-group').find(".form-control").removeClass('wrong').addClass('wrong');
        },
        success: function (e) {
            $(e).closest('.form-group').find(".form-control").removeClass('wrong');
            $(e).remove();
        },
        submitHandler: function (form) {
            //配件是否为空
            var parts = $(grid_selector).jqGrid("getRowData");
            if (parts == null || parts == '' || parts.length == 0) {
                $.cmsUtil.alertDialog($("#mainContenter"), "请先添加配件后保存");
                return;
            }
            var msg = validPart(parts);
            if (msg != null && msg != '') {
                $.cmsUtil.alertDialog($("#mainContenter"), msg);
                return;
            }
            var ps = getParts(parts);
            $("#saveOut").attr("disabled", true);
            $('#inOutForm').ajaxSubmit({
                url: "/repertory/out/save.ajax",
                type: 'post',
                data: {
                    parts: JSON.stringify(ps)
                },
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#saveOut").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#inOutForm"), "保存出库信息成功", function () {
                            window.location.href = '/repertory/out/index.html'
                        });
                    }
                },
                error: function (e) {
                    $.cmsUtil.alertDialog($("#inOutForm"), "保存出库信息失败");
                    $("#submit-btn").removeAttr("disabled");
                }
            });
        }
    });

    jQuery.validator.addMethod("effectNum", function (value, element) {
        var leftCount = $("#leftCount").val();
        if (parseInt(value.trim()) > leftCount) {
            return false;
        }
        return true;
    }, " * 数量不能大于剩余数量！");

    $('#deviceForm').validate({
        // 默认validate在提交表达之前是不会触发验证的，
        // 重写onfocusout方法，使其不需提交表单就能触发验证
        onfocusout: function (element) {
            $(element).valid();
        },
        onchange: function (element) {
            $(element).valid();
        },
        // 默认validate是不对隐藏的元素进行验证的,即忽略:hidden
        ignore: ":hidden",
        rules: {
            partId: {
                required: true
            },
            num: {
                required: true,
                effectNum: true,
                min: 1
            },
            unit: {
                required: true,
                rangelength: [0, 10]
            }
        },
        messages: {
            partId: {
                required: "* 不能为空"
            },
            num: {
                required: "* 不能为空",
                effectNum: '* 填写数量不能大于剩余数量!',
                min: "* 请输入大于0的数字"
            },
            unit: {
                required: "* 不能为空",
                rangelength: "* 请输入{0}到{1}之间的字符串"
            }

        },
        errorElement: 'label',
        errorClass: 'help-block',
        focusInvalid: true,
        invalidHandler: function (form, validator) {
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },
        highlight: function (e) {
            $(e).closest('.form-group').find(".form-control").removeClass('wrong').addClass('wrong');
        },
        success: function (e) {
            $(e).closest('.form-group').find(".form-control").removeClass('wrong');
            $(e).remove();
        }
    })
}


//修改配件信息
function editPart(recordId) {
    var data = $(grid_selector).jqGrid('getRowData', recordId);
    $("#partId").val(data.pId);
    $("#recordId").val(recordId);
    listStoragePart("#partId", "#storageId", changetPart);
    $("#partName").val(data.pName);
    $("#partCode").val(data.pCode);
    $("#leftCount").val(data.leftCount);
    $("#price").val(data.pPrice);
    $("#unit").val(data.unit);
    $("#num").val(data.num);
    $("#taxAmt").val(data.taxAmt);
    $("#totalAmt").val(data.totalAmt);

    $("#selectPartModal").modal({backdrop: 'static', keyboard: false});
    $("#selectPartModal").modal("show");
}

//初始化grid列表
init_grid = function () {
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

    //var editHtml = '<button title="编辑" class="btn btn-xs btn-danger" onclick="editPart(rowId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="撤回">'
    //    + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
    //    + '</button>'

    var deleteHtml = '<button title="删除" class="btn btn-xs btn-danger" onclick="deletePart(rowId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="撤回">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'

    //初始化grid
    $(grid_selector).jqGrid({
        url: rep_out_add.queryListUrl,
        datatype: "json",
        height: 180,
        colNames: ['配件ID', '配件编号', '配件名称', '剩余数量', '单价', '数量', '单位', '总价', '操作'],
        colModel: [
            {name: 'pId', index: 'pId', width: 120, hidden: true, sortable: false},
            {name: 'pCode', index: 'pCode', editable: false, width: 120, sortable: false},
            {name: 'pName', index: 'pName', editable: false, width: 120, sortable: false},
            {name: 'leftCount', index: 'leftCount', editable: false, width: 120, sortable: false, hidden: true},
            {
                name: 'pPrice',
                index: 'pPrice',
                width: 120
                , sortable: false
            },
            {
                name: 'num',
                index: 'num',
                width: 120,
                sortable: false
            },
            {
                name: 'unit',
                index: 'unit',
                width: 120,
                sortable: false
            },
            {
                name: 'totalAmt',
                index: 'totalAmt',
                width: 80,
                sortable: false
            },
            {
                name: 'actions',
                index: 'actions',
                width: 80,
                editable: false,
                fixed: true,
                sortable: false
                //,
                //formatter: function (id, b, record) {
                //    var ids = $(grid_selector).jqGrid("getDataIDs");
                //    console.log(ids);
                //    var html = '<div class="hidden-sm hidden-xs btn-group">';
                //    html += '<button title="编辑" type="button" class="btn btn-xs btn-danger" onclick="editPart();" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="编辑">'
                //    + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
                //    + '</button>'
                //    html += deleteHtml.replace("rowId", record);
                //    html += '</div>';
                //    return html;
                //}
            }
        ],
        viewrecords: true,
        rowNum: 5,
        rowList: [5, 10, 20],
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
            recordId: $("#id").val()
        },
        gridComplete: function () {
            var ids = $(grid_selector).jqGrid("getDataIDs");
            var actions = "";
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var actions = '<div class="hidden-sm hidden-xs btn-group">';
                actions += '<button title="编辑" type="button" class="btn btn-xs btn-danger" onclick="editPart(' + id + ');" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="编辑">'
                    + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
                    + '</button>'
                actions += deleteHtml.replace("rowId", id);
                actions += '</div>';
                $(grid_selector).jqGrid("setRowData", id, {actions: actions});
            }
        },
        caption: "出库配件列表",
        autowidth: true
    });
    $(window).triggerHandler('resize.jqGrid');

    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });

    jQuery(grid_selector).jqGrid('navGrid', grid_selector, {
        edit: false,
        add: false,
        del: false
    });
}

function changeCustomer(u) {
    var cus = u.added;
    $("#receiverAddress").val(cus.address);
    $("#linkman").val(cus.contact);
    $("#telSign").val(cus.phone);
    $("#postcode").val(cus.postcode);
    $("#fax").val(cus.fax);
}

function changetPart(p) {
    var part = p.added;
    $("#partCode").val(part.pCode);
    $("#leftCount").val(part.leftCount);
    $("#partName").val(part.pName);
}

//删除配件
function deletePart(rowId) {
    var row = $(grid_selector).jqGrid('getRowData', rowId);
    $(grid_selector).jqGrid('delRowData', rowId);
}


function getParts(parts) {
    var ps = new Array();
    for (var i = 0; i < parts.length; i++) {
        var part = {};
        part.pId = parts[i].pId;
        part.pCode = parts[i].pCode;
        part.pName = parts[i].pName;
        part.price = parts[i].pPrice;
        part.num = parts[i].num;
        part.unit = parts[i].unit;
        part.taxAmt = parts[i].taxAmt;
        part.totalAmt = parts[i].totalAmt;
        ps.push(part);
    }
    return ps;
}

function validPart(parts) {
    for (var i = 0; i < parts.length; i++) {
        var partName = parts[i].pName;
        if (isNaN(parts[i].pPrice)) {
            $(grid_selector).jqGrid('editRow', i, true);
            return partName + "，单价不为数字，请重新输入！";
        }
        if (isNaN(parts[i].num)) {
            $(grid_selector).jqGrid('editRow', i, true);
            return partName + "，数量不为数字，请重新输入！";
        }
        if (isNaN(parts[i].totalAmt)) {
            $(grid_selector).jqGrid('editRow', i, true);
            return partName + "，总价金额不为数字，请重新输入！";
        }
        if (parseInt(parts[i].num) > parseInt(parts[i].leftCount)) {
            $(grid_selector).jqGrid('editRow', i, true);
            return partName + "，剩余数量小于出库数量，请重新输入！";
        }

        if (parts[i].unit == null || parts[i].unit == '') {
            $(grid_selector).jqGrid('editRow', i, true);
            return partName + "，单位不能为空，请重新输入！";
        }
        //
        //if (parts[i].unit.length() > 32) {
        //    $(grid_selector).jqGrid('editRow', i, true);
        //    return partName + "，单位长度不能大于32个字符，请重新输入！";
        //}

    }
    return "";
}


