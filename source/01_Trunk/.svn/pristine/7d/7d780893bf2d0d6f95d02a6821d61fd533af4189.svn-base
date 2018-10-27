var initE = false;
//编辑配件信息
$(document).ready(function () {
    ///alert("init");
    init_base();//初始化基本信息
    init_event();//初始化事件
    init_form_submit();//初始化表单提交
});

//初始化基本信息
function init_base() {
    $('#debugDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        defaultDate: new Date(),
        autoclose: true //选择日期后自动关闭
    });
    listMulUser("#serviceEngineer", 1, "请选择服务工程师!");
    listcustomer("#cId", changeCustomer);
    listhostnum("#eId", changeEq, "#cId");
    var fileUploader = new fileUtils("#picSpan", "#debugPicBtn", "#picContant", "#picIds", "#picBar", "#ePicMsg");
    fileUploader.initUploader($("#fileIds").val(), 6);
}

//初始化事件
function init_event() {
    //$("#closeAdd").click(function () {
    //    window.opener = null;
    //    window.open("", "_self");
    //    window.close();
    //});
}

//初始化表单提交
function init_form_submit() {
    $('#debugForm').validate({
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
            customerId: {
                required: true
            },
            eqId: {
                required: true
            },
            debugDate: {
                required: true
            },
            serviceEngineer: {
                required: true
            }
        },
        messages: {
            customerId: {
                required: "* 不能为空"
            },
            eqId: {
                required: "* 不能为空"
            },
            debugDate: {
                required: "* 不能为空"
            },
            serviceEngineer: {
                required: "* 不能为空"
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

            $('#debugForm').ajaxSubmit({
                url: "/serve/debugeq/save.ajax",
                type: 'post',
                data: {
                    customerId: $("#cId").val(),
                    eqId: $("#eId").val()
                },
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#submit-btn").removeAttr("disabled");
                    if (json.success) {
                        $.cmsUtil.alertDialog($("#mainContenter"), "保存调试单成功",function(){
                            window.history.go(-1);
                        });
                    }
                },
                error: function (e) {
                    $.cmsUtil.alertDialog($("#mainContenter"), "保存调试单失败");
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
        $("#hostNum").val(e.hostNum);
    } else {
        $("#motorBrand").val("");
        $("#eModel").val("");
        $("#hostNum").val("");
    }
}

//修改用户
function changeCustomer(evt) {
    var customer = evt.added;
    console.log(customer);
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