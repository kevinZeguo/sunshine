var room_order = {};
room_order.queryListUrl = "/role/list.ajax";//查询列表地址

$(document).ready(function ($) {
    //初始化事件
    room_order.init_event();
    initForm();
});

//初始化事件
room_order.init_event = function () {
    //添加用户
    $("#orderNumRooms").change(function () {
        var roomNum = $(this).val();
        var inCountHtml = "";
        for (var i = 0; i < roomNum; i++) {
            inCountHtml += "<tr>" +
                "<td style=\"width:15%; height:30px;\">Number of guest：</td>" +
                "<td><select name=\"inCount\" id='inCount" + (i + 1) + "' style='width: 60px' class='inCount'>\n" +
                "<option value=\"1\" selected>1</option>\n" +
                "<option value=\"2\" >2</option>\n" +
                "</select>" +
                "</td>\n" +
                "</tr>";
        }
        $("#inCountHtml").html(inCountHtml);
        //默认两人入住
        $("#totalPrice").html(parseInt($(this).val()) * parseFloat($("#salePirce1").val()))
        $("#sumSalePrice").val(parseInt($(this).val()) * parseFloat($("#salePirce1").val()))
        $(".inCount").bind("change", function () {
            var value = 0;
            $(".inCount").each(function (t) {
                var inCount = $(this).val();
                if (inCount == 1) {
                    value += parseFloat($("#salePirce1").val());
                } else {
                    value += parseFloat($("#salePirce2").val())
                }
                $("#totalPrice").html(value)
                $("#sumSalePrice").val(value)
            })
        })
    });

    $("#inCount").change(function () {
        var value = 0;
        var inCount = $(this).val();
        if (inCount == 1) {
            value += parseFloat($("#salePirce1").val());
        } else {
            value += parseFloat($("#salePirce2").val())
        }
        $("#totalPrice").html(value)
        $("#sumSalePrice").val(value)
    });
}

function initForm() {
    $('#orderForm').validate({
        onfocusout: function (element) {
            $(element).valid();
        },
        onchange: function (element) {
            $(element).valid();
        },
        // 默认validate是不对隐藏的元素进行验证的,即忽略:hidden
        ignore: ":hidden",
        rules: {
            username: {
                required: true
            },
            email: {
                required: true
            },

            telephone: {
                required: true
            }
        },
        messages: {
            username: {
                required: "* Please enter your name."
            },
            email: {
                required: "* Please enter Email"
            }, telephone: {
                required: "* Please enter phone number"
            }

        },
        errorElement: 'label',
        errorClass:
            'help-block',
        focusInvalid:
            true,
        invalidHandler:

            function (form, validator) {
            }

        ,
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        }
        ,
        highlight: function (e) {
            $(e).closest('.form-group1').find(".form-control1").find("input").removeClass('wrong').addClass('wrong');
        }
        ,
        success: function (e) {
            $(e).closest('.form-group1').find(".form-control1").find("input").removeClass('wrong');
            $(e).remove();
        }
        ,
        submitHandler: function (form) {
            $("#subOrder").attr("disabled", true);
            var checkCount = ""
            $(".inCount").each(function (t) {
                var inCount = $(this).val();
                if (checkCount != "") {
                    checkCount += ",";
                }
                checkCount += inCount;
            })

            $('#orderForm').ajaxSubmit({
                url: "/saveOrder.ajax",
                type: 'post',
                data: {checkCount: checkCount},
                dataType: 'json',
                success: function (json, statusText, xhr, $form) {
                    $("#subOrder").removeAttr("disabled");
                    if (json.success) {
                        window.location.href = "/ren.html?orderId=" + json.obj.id;
                    } else {
                        alert("Failed to submit an order," + json.msg);
                    }
                },
                error: function (e, textStatus) {
                    alert("Failed to submit an order![" + textStatus + "]");
                    $("#subOrder").removeAttr("disabled");
                }
            });
        }
    })
}

