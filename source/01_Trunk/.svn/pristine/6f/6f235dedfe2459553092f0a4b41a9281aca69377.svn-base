var room_edit = {};


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
    $('#roomForm').validate({
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
            salePrice1: {
                required: true,
                number: true
            },
            salePrice2: {
                required: true,
                number: true
            },
            comment: {
                maxlength: 256
            }
        },
        messages: {
            salePrice1: {
                required: "* 请输入1人优惠价格",
                number: "* 请输入数字！"
            },
            salePrice2: {
                required: "* 请输入2人优惠价格",
                number: "* 请输入数字！"
            },
            comment: {
                maxlength: "* 备注不能超过256 个字符"
            }
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
            $('#roomForm').ajaxSubmit({
                url: "/cms/room/save.ajax",
                type: 'post',
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#roomForm"), "修改房间价格成功");
                        refreshList();
                    }
                },
                error: function (e) {
                    $("#addModal").modal("hide");
                    $.cmsUtil.alertDialog($("#roomForm"), "修改房间价格成功");
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
