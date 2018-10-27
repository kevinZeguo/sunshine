var user_add = {};


$(document).ready(function ($) {
    //初始化基本信息
    init_base();
    //初始化事件
    init_event();
    //初始化表单提交定义
    init_form_submit();
});

function init_base() {
    //初始化部门
    var departId = $("#departIdV").val();
    if (departId != null && departId != '' && undefined != departId) {
        $("#departId").val(departId);
    }
    $("#departId").select2();
    var roleIds = $("#roleIdV").val();
    if (roleIds != null && roleIds != '' && undefined != roleIds) {
        var rids = new Array();
        var ids = roleIds.split(",");
        for (var i = 0; i < ids.length; i++) {
            rids.push(ids[i]);
        }
        $("#roleIds").val(rids);
    }
    $("#roleIds").select2();
    var dataType = $("#dataType").val();
    if (dataType != null && dataType != '') {
        if (dataType == 1) {
            $("#dataType1").click();
        } else if (dataType == 2) {
            $("#dataUserIdsDiv").removeClass("hidden");
            $("#dataType2").click();
            initSelectUsers();
        } else {
            $("#dataType3").click();
        }
    }

}

//表单提交定义
function init_form_submit() {
    jQuery.validator.addMethod("isNameExist", function (value, element) {
        var isNotExist = false;
        $.ajax({
            url: "/cms/user/isUserNameExist.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                userId: $("#userId").val(),
                userName: $("#userName").val()
            },
            success: function (json, statusText, xhr, $form) {
                if (json.success) {
                    if (!json.obj.isUsed) {
                        isNotExist = true;
                    }
                }
            }
        });

        return isNotExist;
    }, " * 用户账号已存在,不能重复输入！");

    jQuery.validator.addMethod("passwrdFmt", function (value, element) {
        var isNotExist = false;
        // var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,18}$/;
        // if (reg.test(value)) {
        //     return true;
        // }
        return true;
    }, " * 用户密码，必须为6-18位的数字或字母！");

//校验重复密码是否正确
    jQuery.validator.addMethod("isConfirmPasswrdRight", function (value, element) {
        var password = $("#password").val();
        if (value != null && '' != value && undefined != value) {
            if (value == password) {
                return true;
            }
        }
        return false;
    }, " * 确认密码不正确，请重新输入！");

    $('#userForm').validate({
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
            userName: {
                required: true,
                rangelength: [4, 128],
                isNameExist: true
            },
            password: {
                required: true,
                // passwrdFmt: true,
                rangelength: [6, 18]
            },
            confirm_password: {
                required: true,
                isConfirmPasswrdRight: true
            },
            realName: {
                required: true,
                rangelength: [2, 128]
            },
            departId: {
                required: true
            },
            dataUserIds: {
                required: true
            },
            telephone: {rangelength: [0, 32]},
            officePhone: {rangelength: [0, 32]},
            email: {rangelength: [0, 128]}
        },
        messages: {
            userName: {
                required: " * 用户账号不能为空",
                rangelength: " * 用户账号为{0}到{1}位的字符串",
                isNameExist: " * 用户账号已被使用，请重新输入!"
            },
            password: {
                required: " * 密码不能为空",
                // passwrdFmt: " * 密码为6到18位字符，必须包含数字、字符和特殊符号",
                rangelength: " * 密码为6到18位字符"
            },
            confirm_password: {
                required: " * 确认密码不能为空",
                isConfirmPasswrdRight: " * 与密码不一致，请重新输入!"
            },
            departId: {
                required: " * 部门不能为空"
            },
            realName: {
                required: " * 用户姓名不能为空",
                rangelength: " * 用户名称为{0}到{1}位的字符串"
            },
            dataUserIds: {
                required: " * 可访问的用户数据不能为空"
            },
            telephone: {rangelength: " * 手机号码为{0}到{1}位的字符串"},
            officePhone: {rangelength: " * 办公电话为{0}到{1}位的字符串"},
            email: {rangelength: " * 用户邮箱为{0}到{1}位的字符串"}
        },
        errorElement: 'label',
        errorClass: 'help-block red',
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
            $('#userForm').ajaxSubmit({
                url: "/cms/user/save.ajax",
                type: 'post',
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#userForm"), "保存用户信息成功");
                        refreshUserList();
                    }
                },
                error: function (e) {
                    $("#addModal").modal("hide");
                    $.cmsUtil.alertDialog($("#userForm"), "保存用户信息失败");
                    $("#submit-btn").removeAttr("disabled");
                }
            });
        }
    })
}

function init_event() {
    $("#closeModal").click(function () {
        $("#addModal").modal("hide");
    });

    //dataType切换事件
    $("input[name='dataType']").change(function () {
        var dataType = $(this).val();
        if (dataType == 2) {
            $("#dataUserIdsDiv").removeClass("hidden");
            initSelectUsers();
        } else {
            $("#userIdsDiv").empty();
            $("#dataUserIdsDiv").addClass("hidden");
        }
    })
}

//选择用户
function initSelectUsers() {
    $.ajax({
        url: "/cms/user/list.ajax",
        type: 'post',
        dataType: 'json',
        async: false,
        data: {limit: 1000},
        success: function (json, statusText, xhr, $form) {
            console.log(json);
            if (json != null && json.list != null && json.list.length > 0) {
                var list = json.list;
                var selectUserHtml = "";
                var values = $("#dataUserIds").val();
                for (var i = 0; i < list.length; i++) {
                    selectUserHtml += "<label>";
                    selectUserHtml += "<input type='checkbox' name='dataUserIds' id='dataUserIds" + list[i].userId + "' value='" + list[i].userId + "' class='ace ace-checkbox-2'";
                    if (values != null && values != '' && values != "undefined") {
                        for (var j = 0; j < values.split(",").length; j++) {
                            if (values.split(",")[j] == list[i].userId) {
                                selectUserHtml += "checked ";
                            }
                        }
                    }
                    selectUserHtml += ">";
                    selectUserHtml += "  <span class='lbl'>";
                    selectUserHtml += list[i].realName;
                    selectUserHtml += "</span></label>";
                }
                $("#userIdsDiv").html(selectUserHtml);
            }
            console.log(json);
        }
    });
}
