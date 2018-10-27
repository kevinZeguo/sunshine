var attr_add = {};


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
    var attrGroupId = $("#attrGroupId").attr("value");
    if (attrGroupId != null && attrGroupId != '' && undefined != attrGroupId) {
        $("#attrGroupId").val(attrGroupId);
    }
    $("#attrGroupId").select2();
}

//表单提交定义
function init_form_submit() {
    $('#attrForm').validate({
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
            attrGroupId: {
                required: true
            },
            attrCode: {
                required: true,
                rangelength: [1, 128]
            },
            attrValue: {
                required: true,
                rangelength: [1, 256]
            },
            attrOrder: {
                required: true
            },
            attrDesc: {
                required: true,
                rangelength: [0, 512]
            }
        },
        messages: {
            attrGroupId: {
                required: " * 字典组不为空"
            },
            attrCode: {
                required: " * 字典编码不为空",
                rangelength: " * 字典编码为{0}到{1}位的字符串"
            },
            attrValue: {
                required: " * 字典值不为空",
                rangelength: " * 字典值为{0}到{1}位的字符串"
            },
            attrOrder: {
                required: " * 字典顺序不为空"
            },
            attrDesc: {
                required: " * 字典描述不为空",
                rangelength: " * 字典描述为{0}到{1}位的字符串"
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
            $('#attrForm').ajaxSubmit({
                url: "/attr/save.ajax",
                type: 'post',
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#attrForm"), "保存字典成功");
                        refreshAttrList();
                    }
                },
                error: function (e) {
                    $("#addModal").modal("hide");
                    $.cmsUtil.alertDialog($("#attrForm"), "保存字典失败");
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
