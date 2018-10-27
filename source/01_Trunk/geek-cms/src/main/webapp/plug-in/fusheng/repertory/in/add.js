//编辑客户信息
$(document).ready(function () {
    init_event();//初始化事件
    init_base();//初始化基本信息
    init_form_submit();//初始化表单提交
});

//初始化事件
function init_event() {
    $("#closeModal").click(function () {
        $("#addModal").modal("hide");
    })
    listPart("#pId", changePart);
}

//初始化基本信息
function init_base() {
    $('#recordDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        defaultDate: new Date(),
        autoclose: true //选择日期后自动关闭
    });
    listPart("#pId");
    initAttrSelect("#storageId", "part.stock.storagelist", $("#storageId").attr("aVal"));

}
//初始化表单提交
function init_form_submit() {
    $('#inPartForm').validate({
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
            pId: {
                required: true
            },
            num: {
                required: true,
                digits: true,
                min: 1
            },
            storageId: {
                required: true
            },
            recordDate: {
                required: true
            },
            note: {
                rangelength: [0, 256]
            }
        },
        messages: {
            pId: {
                required: "* 不能为空"
            },
            num: {
                required: "* 不能为空",
                digits: "* 请输入大于1的整数",
                min: "* 请输入大于1的整数"
            },
            storageId: {
                required: "* 不能为空"
            },
            recordDate: {
                required: "* 不能为空"
            },
            note: {
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
        },
        submitHandler: function (form) {
            $("#submit-btn").attr("disabled", true);
            $('#inPartForm').ajaxSubmit({
                url: "/repertory/in/save.ajax",
                type: 'post',
                data: {},
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#inPartForm"), "保存入库信息成功");
                        refreshInList();
                    }
                },
                error: function (e) {
                    $.cmsUtil.alertDialog($("#inPartForm"), "保存入库信息失败");
                    $("#submit-btn").removeAttr("disabled");
                }
            });
        }
    })
}

function changePart(e) {
    console.log(e.added);
    $("#pName").val(e.added.pName);
    $("#pCode").val(e.added.pCode);

}