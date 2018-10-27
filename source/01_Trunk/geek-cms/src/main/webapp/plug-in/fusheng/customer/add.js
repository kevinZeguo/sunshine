var customer_add = {}

//编辑客户信息
$(document).ready(function () {
    init_base();//初始化基本信息
    init_event();//初始化事件
    init_form_submit();//初始化表单提交
});

//初始化事件
function init_event() {
    $("#closeModal").click(function () {
        $("#addModal").modal("hide");
    })

    jQuery.validator.addMethod("isNameExist", function (value, element) {
        var isNotExist = false;
        $.ajax({
            url: "/customer/nameIsUsed.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                cId: $("#cId").val(),
                cName: $("#cName").val()
            },
            success: function (json, statusText, xhr, $form) {
                if (json.success) {
                    isNotExist = true;
                }
            }
        });

        return isNotExist;
    }, " * 客户名称已存在,不能重复输入！");

}

//初始化基本信息
function init_base() {
    listUser("#serviceEngineer", 1, "请选择服务工程师!");

}
//初始化表单提交
function init_form_submit() {
    $('#customerForm').validate({
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
            cName: {
                required: true,
                rangelength: [4, 128],
                isNameExist: true
                //isNameExist: true
            },
            address: {
                //required: true,
                rangelength: [0, 1000]
            },
            contact: {
                rangelength: [0, 100]
            },
            phone: {
                rangelength: [0, 50]
            },
            payAcct: {
                rangelength: [0, 100]
            },
            taxNum: {
                rangelength: [0, 200]
            },
            serviceEngineer: {
                required: true
            },
            fax: {
                rangelength: [0, 50]
            },
            postCode: {
                rangelength: [0, 50]
            }
        },
        messages: {
            cName: {
                required: "* 不能为空",
                rangelength: "* 请输入{0}到{1}之间的字符串",
                isNameExist: "* 客户已存在,不能重复输入！"
                //isNameExist: true
            },
            address: {
                //required: "* 请输入客户详细地址",
                rangelength: "* 请输入{0}到{1}之间的字符串"
            },
            contact: {
                rangelength: "* 请输入{0}到{1}之间的字符串"
            },
            phone: {
                rangelength: "* 请输入{0}到{1}之间的字符串"
            },
            payAcct: {
                rangelength: "* 请输入{0}到{1}之间的字符串"
            },
            taxNum: {
                rangelength: "* 请输入{0}到{1}之间的字符串"
            },
            serviceEngineer: {
                required: "* 不能为空"
            },
            fax: {
                rangelength: "* 请输入{0}到{1}之间的字符串"
            },
            postCode: {
                rangelength: "* 请输入{0}到{1}之间的字符串"
            }
        },
        // errorElement: 'label',
        // errorClass: 'help-block red',
        errorClass: "error",
        focusInvalid: true,
        invalidHandler: function (form, validator) {
        },
        // errorPlacement: function (error, element) {
        //     error.appendTo(element.parent());
        // },
        errorPlacement: function (error, element) {
            if ($(element).next("div").hasClass("tooltip")) {
                $(element).attr("data-original-title", $(error).text()).tooltip("show");
            } else {
                $(element).attr("title", $(error).text()).tooltip("show");
            }
        },
        unhighlight: function (element, errorClass, validClass) { //验证通过
            $(element).tooltip('destroy').removeClass(errorClass);
        },
        // highlight: function (e) {
        //     $(e).closest('.form-group').find(".form-control").removeClass('wrong').addClass('wrong');
        // },
        success: function (e) {
            $(e).closest('.form-group').find(".form-control").removeClass('wrong');
            $(e).remove();
        },
        submitHandler: function (form) {
            $("#submit-btn").attr("disabled", true);
            $('#customerForm').ajaxSubmit({
                url: "/customer/save.ajax",
                type: 'post',
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#customerForm"), "保存客户信息成功");
                        refreshCustomerList();
                    }
                },
                error: function (e) {
                    $.cmsUtil.alertDialog($("#customerForm"), "保存客户信息失败");
                    $("#submit-btn").removeAttr("disabled");
                }
            });
        }
    })
}