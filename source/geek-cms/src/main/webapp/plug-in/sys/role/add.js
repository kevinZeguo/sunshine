var role_add = {};


$(document).ready(function ($) {
    //初始化基本信息
    init_base();
    //初始化事件
    init_event();
    //初始化表单提交定义
    init_form_submit();
});

function init_base() {

}

//表单提交定义
function init_form_submit() {
    jQuery.validator.addMethod("isRoleCodeExist", function (value, element) {
        var isNotExist = false;
        $.ajax({
            url: "/cms/role/isRoleCodeExist.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                roleId: $("#roleId").val(),
                roleCode: $("#roleCode").val()
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
    }, " * 角色编码已存在,不能重复输入！");

    jQuery.validator.addMethod("roleCodeFmt", function (value, element) {
        var isNotExist = false;
        var reg =  /^((\w*\d\w*[a-z]\w*)|(\w*[a-z]\w*\d\w*))$/i;;
        if (reg.test(value)) {
            return true;
        }
        return false;
    }, " * 角色编码，必须为3-18位的数字或字母！");


    $('#roleForm').validate({
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
            roleName: {
                required: true
                //rangelength: [4, 128],
                //isNameExist: true
            },
            roleCode: {
                required: true
                //roleCodeFmt: true
            }
        },
        messages: {
            roleName: {
                required: "角色名称不能为空"
                //rangelength: "角色名称为{0}到{1}位的字符串",
                //isRoleCodeExist: "角色名称已被使用，请重新输入!"
            },
            roleCode: {
                required: "角色编码不能为空"
                //roleCodeFmt: "角色编码为2到32位字符"
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
            $("#submit-btn").attr("disabled", true);
            $('#roleForm').ajaxSubmit({
                url: "/cms/role/save.ajax",
                type: 'post',
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#roleForm"), "保存角色信息成功");
                        refreshRoleList();
                    } else {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#roleForm"), "保存角色信息失败," + json.msg);
                        refreshRoleList();
                    }
                },
                error: function (e) {
                    $.cmsUtil.alertDialog($("#roleForm"), "保存角色信息失败," + e);
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

}
