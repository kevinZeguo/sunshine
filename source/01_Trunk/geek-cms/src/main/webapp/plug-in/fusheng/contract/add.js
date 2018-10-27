var contract_queryCustomersUrl = "/contract/customers.ajax";
$(document).ready(function () {
    init_event();
    init_base();
    init_form_submit();
});

function init_event() {
    $("#closeModal").click(function () {
        $("#addModal").modal("hide");
    });
//	$("#addUpFile").change(function(){
//		var input = $('#addUpFile');
//        var files = input.prop('files');
//        $("#addUpFileTips").html("");
//        if (files == null || '' == files || 'undefined' == files || files.length != 1) {
//            $("#addUpFileTips").html("请选择文件!");
//        }
//        var file = files[0];
////        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type != 'application/vnd.ms-excel') {
////            $("#xlsxFileTips").html("请选择excel文件进行导入!");
////        }
//        if (file.size > 107374182400) {
//            $("#addUpFileTips").html("文件不能超过100M");
//        }
//        $(".file-content").html(file.name);
//		 
//	});
    $("input:radio[name='isCashBack']").click(function () {
        if ($(this).val() == '1') {
            $("#addCashBackDate").css("display", "block");
            $("#addCashBackPrice").css("display", "block");
        }
        else {
            $("#addCashBackDate").css("display", "none");
            $("#addCashBackPrice").css("display", "none");
        }
    });
    $("input:radio[name='isSendGoods']").click(function () {
        if ($(this).val() == '1') {
            $("#addSendGoodsDate").css("display", "block");
        }
        else {
            $("#addSendGoodsDate").css("display", "none");
        }
    });
    $("input:radio[name='isOpenInvoice']").click(function () {
        if ($(this).val() == '1') {
            $("#addOpenInvoiceDate").css("display", "block");
        }
        else {
            $("#addOpenInvoiceDate").css("display", "none");
        }
    });

    var fileUploader = new fileUtils("#picSpan", "#cFileBtn", "#picContant", "#contractFile", "", "#picMsg");
    fileUploader.initUploader($("#fileIds").val());
}

function init_base() {
    $('#cashBackDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    $('#sendGoodsDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    $('#openInvoiceDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    listcustomer("#customerId", 1, "请选择客户!");
    $("#type").select2().trigger("change");
}

//
//初始化表单提交
function init_form_submit() {
    $('#contractForm').validate({
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
            aCode: {
                required: true
            },
            type: {
                required: true
            }
            ///,
//            isSendGoods: {
//                required: true
//            },
//            isOpenInvoice: {
//                required: true
//            },
//            isCashBack: {
//                required: true
//            }
        },
        messages: {
            customerId: {
                required: "* 不能为空"
            },
            aCode: {
                required: "* 不能为空"
            },
            type: {
                required: "* 不能为空"
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
            $("#submit-btn").attr("disabled", true);
            $('#contractForm').ajaxSubmit({
                url: "/contract/save.ajax",
                type: 'post',
                dataType: 'json',
                data: {
                    cId: $("#customerId").val()
                },
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        refreshContractList();
                    }
                },
                error: function (e, textStatus) {
                    alert("保存合同信息失败![" + textStatus + "]");
                    $("#submit-btn").removeAttr("disabled");
                }
            });
        }
    })
}
