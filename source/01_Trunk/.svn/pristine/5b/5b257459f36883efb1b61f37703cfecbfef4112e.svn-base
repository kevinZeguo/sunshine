$(document).ready(function ($) {
//表单提交定义
    jQuery.validator.addMethod("validOldPwd", function (value, element) {
        var isRight = false;
        $.ajax({
            url: "/user/validOldPwd.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                password: value
            },
            success: function (json, statusText, xhr, $form) {
                if (json.success) {
                    if (json.obj.isRight) {
                        isRight = true;
                    }
                }
            }
        });
        return isRight;
    }, " * 原密码输入错误，请重新输入！");

    jQuery.validator.addMethod("passwrdFmt", function (value, element) {
        var isNotExist = false;
        var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,18}$/;
        if (reg.test(value)) {
            return true;
        }
        return false;
    }, " * 用户密码，必须为6-18位的数字或字母！");

    //校验重复密码是否正确
    jQuery.validator.addMethod("isConfirmPasswrdRight", function (value, element) {
        var password = $("#newPwd").val();
        if (value != null && '' != value && undefined != value) {
            if (value == password) {
                return true;
            }
        }
        return false;
    }, " * 确认密码不正确，请重新输入！");

    $('#editPwdForm').validate({
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
            oldPwd: {
                required: true,
                validOldPwd: true
            },
            newPwd: {
                required: true,
                // passwrdFmt: true,
                rangelength: [6, 18]
            },
            confirmNewPwd: {
                required: true,
                isConfirmPasswrdRight: true
            }
        },
        messages: {
            oldPwd: {
                required: " * 原密码不能为空",
                validOldPwd: " * 原密码不正确，请重新输入!"
            },
            newPwd: {
                required: " * 密码不能为空",
                // passwrdFmt: " * 密码为6到18位字符(必须包含数字、字符和特殊符号)",
                rangelength: " * 密码为6到18位字符"
            },
            confirmNewPwd: {
                required: " * 确认密码不能为空",
                isConfirmPasswrdRight: " * 与密码不一致，请重新输入!"
            }
        },
        errorElement: 'label',
        errorClass: 'help-block red',
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
            $("#editPwd-submit-btn").attr("disabled", true);
            $('#editPwdForm').ajaxSubmit({
                url: "/user/editPwd.ajax",
                type: 'post',
                data: {
                    oldPassword: $("#oldPwd").val(),
                    password: $("#newPwd").val()
                },
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#ediPwdModal").modal("hide");
                    $("#editPwd-submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#ediPwdModal").modal("hide");
                        $.cmsUtil.alertDialog($("#editPwdForm"), "密码修改成功，请重新登录！");
                    } else {
                        $.cmsUtil.alertDialog($("#editPwdForm"), "密码修;改失败," + json.msg);
                        $("#editPwd-submit-btn").removeAttr("disabled")
                    }
                },
                error: function (e) {
                    $("#ediPwdModal").modal("hide");
                    $.cmsUtil.alertDialog($("#editPwdForm"), "密码修改失败," + e);
                    $("#editPwd-submit-btn").removeAttr("disabled");
                }
            });
        }
    })

    $("#editPwd-closeModal").click(function () {
        $("#ediPwdModal").modal("hide");
    });
});
