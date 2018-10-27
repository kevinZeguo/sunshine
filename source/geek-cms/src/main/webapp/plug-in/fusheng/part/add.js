/**
 * zhangyongquan created 2017/07/07
 */
var part_add = {}

//编辑配件信息
$(document).ready(function () {
    init_base();//初始化基本信息
    init_event();//初始化事件

    init_form_submit();//初始化表单提交
});

//初始化基本信息
function init_base() {
}

//初始化事件
function init_event() {
    $("#closeModal").click(function () {
        $("#addModal").modal("hide");
    });
//	$("#pPicFile").change(function(){
//		var input = $('#pPicFile');
//        var files = input.prop('files');
//        $("#pPicTips").html("");
//        if (files == null || '' == files || 'undefined' == files || files.length != 1) {
//            $("#pPicTips").html("请选择文件!");
//        }
//        var file = files[0];
////        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type != 'application/vnd.ms-excel') {
////            $("#xlsxFileTips").html("请选择excel文件进行导入!");
////        }
//        if (file.size > 107374182400) {
//            $("#pPicTips").html("文件不能超过100M");
//        }
//        $(".file-content").html(file.name);
//		 
//	});
    jQuery.validator.addMethod("isCodeExist", function (value, element) {
        var isNotExist = false;
        $.ajax({
            url: "/part/codeIsUsed.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                pId: $("#pId").val(),
                pCode: $("#pCode").val()
            },
            success: function (json, statusText, xhr, $form) {
                if (json.success) {
                    isNotExist = true;
                }
            }
        });

        return isNotExist;

    }, " * 配件编号已存在,不能重复输入！");
    
    jQuery.validator.addMethod("isNameExist", function (value, element) {
        var isNotExist = false;
        $.ajax({
            url: "/part/nameIsUsed.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                pId: $("#pId").val(),
                pName: $("#pName").val()
            },
            success: function (json, statusText, xhr, $form) {
                if (json.success) {
                    isNotExist = true;
                }
            }
        });

        return isNotExist;

    }, " * 配件名称已存在,不能重复输入！");
    var fileUploader = new fileUtils("#picSpan","#pPicBtn","#picContant","#pPic", "#picBar","#pPicMsg");
    fileUploader.initUploader($("#fileIds").val(), 3);///.initUploader();
}

//初始化表单提交
function init_form_submit() {
    $('#partForm').validate({
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
        	pCode:{
        		required:true,
        		rangelength:[2,128],
        		isCodeExist:true
        	},
            pName: {
                required: true,
                rangelength: [4, 128]
                //isNameExist: true
                //isNameExist: true
            },
            pPrice: {
                //required:true
            }
        },
        messages: {
        	pCode:{
        		required:"* 不能为空",
        		rangelength:"* 请输入{0}到{1}之间的字符串",
        		isCodeExist:"* 配件编号已存在，不能重复输入！"
        	},
            pName: {
                required: "* 不能为空",
                rangelength: "* 请输入{0}到{1}之间的字符串"
                //isNameExist: "* 配件名称已存在,不能重复输入！"
                //isNameExist: true
            },
            pPrice: {
                //required: "* 请输入配件价格"
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
            $('#partForm').ajaxSubmit({
                url: "/part/save.ajax",
                type: 'post',
                dataType: 'json',
//                data: {
//                    pPic: $(".file-content").html()
//                },
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $("#addModal").modal("hide");
                        $.cmsUtil.alertDialog($("#partForm"), "保存配件信息成功");
                        refreshPartList();
                    }
                },
                error: function (e) {
                    $.cmsUtil.alertDialog($("#partForm"), "保存配件信息失败");
                    $("#submit-btn").removeAttr("disabled");
                }
            });
        }
    })
}