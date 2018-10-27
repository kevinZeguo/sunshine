//编辑客户信息
$(document).ready(function () {
    init_event();//初始化事件
    init_base();//初始化基本信息
    init_form_submit();//初始化表单提交
});

//初始化事件
function init_event() {
    $("#closeModal").click(function () {
        $("#addDeviceModal").modal("hide");
    })

    $("#regularCheck").change(function () {
        if ($(this).val() == 1) {
            $("#checkMonthsDiv").show();
        } else {
            $("#checkMonthsDiv").hide();
            $("#checkMonths").val("");
        }
    })

    var fileUploader = new fileUtils("#picSpan", "#ePicBtn", "#picContant", "#ePicIds", "#picBar","#ePicMsg");
    fileUploader.initUploader($("#fileIds").val(), 3);
}

//初始化基本信息
function init_base() {
    $('#motorMakeDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });

    $('#debugDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    $('#makeDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        autoclose: true //选择日期后自动关闭
    });
    listcustomer("#customerId", 1, "请选择客户!");

    //初始化定期巡检状态
    var regularCheck = $("#regularCheck").attr("value");
    $("#regularCheck").val(regularCheck);
    $("#regularCheck").select2().trigger("change");

    var checkMonths = $("#checkMonths").attr("value");
    $("#checkMonths").val(checkMonths);
    $("#checkMonths").select2().trigger("change");


}
//初始化表单提交
function init_form_submit() {
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
//        	eName: {
//                required: true,
//                rangelength: [4, 128]
//                //isNameExist: true
//            },
            eModel: {
                required: true
            },
            // motorBrand: {
            //     required: true
            // },
            makeNum: {
                required: true
            },
            // elecPanModel: {
            //     required: true
            // },
            hostNum: {
                required: true
            },
            customerId: {
                required: true
            // },
            // motorMakeDate: {
            //     required: true
            }
            /*
             ,
             serviceEngineer: {
             required: true
             },
             fax: {
             required: true
             },
             postCode: {
             required: true
             }
             */
        },
        messages: {
//        	eName: {
//                required: "* 设备名称为介于{0}到{1}之间的字符串",
//                rangelength: "* 设备名称为介于{0}到{1}之间的字符串"
//                //isNameExist: true
//            },
            eModel: {
                required: "* 不能为空"
            },
            // motorBrand: {
            //     required: "* 不能为空"
            // },
            makeNum: {
                required: "* 不能为空"
            },
            // elecPanModel: {
            //     required: "* 不能为空"
            // },
            hostNum: {
                required: "* 不能为空"
            },
            customerId: {
                required: "* 不能为空"
            // },
            // motorMakeDate: {
            //     required: "* 不能为空"
            }
            /*
             ,
             serviceEngineer: {
             required: "* 客户名称为介于{0}到{1}之间的字符串"
             },
             fax: {
             required: "* 客户名称为介于{0}到{1}之间的字符串"
             },
             postCode: {
             required: "* 客户名称为介于{0}到{1}之间的字符串"
             }
             */
        },
        errorElement: 'div',
        errorClass: 'help-block col-xs-6',
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
            $('#deviceForm').ajaxSubmit({
                url: "/device/save.ajax",
                type: 'post',
                data: {
                    cId: $("#customerId").val()
                },
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addDeviceModal").modal("hide");
                        $.cmsUtil.alertDialog($("#deviceForm"), "保存设备消息成功");
                        refreshDeviceList();
                    }
                },
                error: function (e) {
                    $.cmsUtil.alertDialog($("#deviceForm"), "保存设备信息失败");
                    $("#submit-btn").removeAttr("disabled");
                }
            });
        }
    })
}