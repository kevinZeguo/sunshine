/**
 * zhangyongquan created 2017/08/11
 */

//编辑配件信息
$(document).ready(function () {
    ///alert("init");
    init_base();//初始化基本信息
    init_event();//初始化事件

    init_form_submit();//初始化表单提交
});

//初始化基本信息
function init_base() {
    $('#serviceDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        defaultDate: new Date(),
        autoclose: true //选择日期后自动关闭
    });
    listMulUser("#serviceEngineer", 1, "请选择服务工程师!");
    listcustomer("#cId", changeCustomer);
    listhostnum("#eId", changeEq, "#cId");

    var serviceContent = $("#serviceContent").val();
    if (serviceContent != null && serviceContent != '' && serviceContent != undefined) {
        var scs = serviceContent.split(",");
        for (var i = 0; i < scs.length; i++) {
            if (scs[i] == -1) {
                $("#serviceContent_1").click();
                $("#serviceOtherContent").removeClass("hidden");
            } else {
                $("#serviceContent" + scs[i]).click();
            }
        }
    }

}

//初始化事件
function init_event() {
    //$("#closeAdd").click(function () {
    //    window.opener = null;
    //    window.open('', '_self');
    //    window.close();
    //});

    //change事件
    $("#serviceContent_1").change(function () {
        var serviceContent = $(this).attr("checked");
        if (serviceContent == 'checked') {
            $("#serviceOtherContent").removeClass("hidden");
        } else {
            $("#serviceOtherContent").addClass("hidden");
        }
    })

    jQuery.validator.addMethod("isCodeExist", function (value, element) {
        var isNotExist = false;
        $.ajax({
            url: "/server/maintenance/codeIsUsed.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                id: $("#id").val(),
                mCode: $("#mCode").val()
            },
            success: function (json, statusText, xhr, $form) {
                if (json.success) {
                    isNotExist = true;
                }
            }
        });

        return isNotExist;

    }, " * 维保单据号已存在,不能重复输入！");
    ///alert("init fileupload");
    var fileUploader = new fileUtils("#picSpan", "#picBtn", "#picContant", "#picIds", "#picBar", "#picMsg");
    fileUploader.initUploader($("#fileIds").val(), 3);///.initUploader();


}

//初始化表单提交
function init_form_submit() {
    $('#maintenanceForm').validate({
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
            serviceEngineer: {
                required: true
            },
            serviceDate: {
                required: true
            },
            cId: {
                required: true
            },
            eId: {
                required: true
            },
            repairContent: {
                required: true,
                rangelength: [0, 256]
            },
            faultReason: {
                rangelength: [0, 256]
            },
            serviceContent: {
                required: true
            },
            engineerSuggest: {
                rangelength: [0, 256]
            },
            serviceOtherContent: {
                required: true
            }
        },
        messages: {
            serviceEngineer: {
                required: "* 不能为空"
            },
            serviceDate: {
                required: "* 不能为空"
            },
            cId: {
                required: "* 不能为空"
            },
            eId: {
                required: "* 不能为空"
            },
            repairContent: {
                required: "* 不能为空",
                rangelength: "* 请输入{0}到{1}之间的字符串"
            },
            faultReason: {
                rangelength: "* 请输入{0}到{1}之间的字符串"
            },
            serviceContent: {
                required: "* 请选择服务内容"
            },
            serviceOtherContent: {
                required: "* 请输入服务内容"
            },
            engineerSuggest: {
                rangelength: "* 请输入{0}到{1}之间的字符串"
            }
        },
        errorElement: 'label',
        errorClass: 'help-block',
        focusInvalid: true,
        invalidHandler: function (form, validator) {
        },
        errorPlacement: function (error, element) {
            if (element.attr("type") == 'checkbox') {
                error.appendTo(element.parent().parent());
            } else {
                error.appendTo(element.parent());
            }
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
            $('#maintenanceForm').ajaxSubmit({
                url: "/server/maintenance/save.ajax",
                type: 'post',
                data: {
                    cId: $("#cId").val(),
                    eId: $("#eId").val()
                },
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $.cmsUtil.alertDialog($("#maintenanceForm"), "保存维保服务单成功", function () {
                            window.history.go(-1);
                        });
                        //window.location.href = '/server/maintenance/index.html'
                    }
                },
                error: function (e) {
                    $.cmsUtil.alertDialog($("#maintenanceForm"), "保存维保服务单失败");
                    $("#submit-btn").removeAttr("disabled");
                }
            });
        }
    })
}

//修改设备
function changeEq(evt) {
    var e = evt.added;
    if (e != null && e != "" && undefined != e) {
        $("#motorBrand").val(e.motorBrand);
        $("#eModel").val(e.eModel);
        $("#makeNum").val(e.makeNum);
    } else {
        $("#motorBrand").val("");
        $("#eModel").val("");
        $("#makeNum").val("");
    }
}

//修改用户
function changeCustomer(evt) {
    var customer = evt.added;
    if (customer != '' && customer != null && undefined != customer) {
        $("#address").val(customer.address);
        $("#phone").val(customer.phone);
        $("#contact").val(customer.contact);
    } else {
        $("#address").val("");
        $("#phone").val("");
        $("#contact").val("");
    }
    $("#eId").val("");
    $("#eId").trigger("change");

}