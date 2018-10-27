$(document).ready(function () {
    $("#loginTips").empty();
    //author:scott---date:20160426---for:判断浏览器跳转兼容风格
    var navigatorName = "Microsoft Internet Explorer";
    if (navigator.appName == navigatorName) {
        alert("IE浏览器采用传统首页风格，更佳体验建议使用Chrome浏览器!")
        //setCookie("JEECGINDEXSTYLE","shortcut");
        $.cookie('JEECGINDEXSTYLE', 'shortcut');
    }

    $("#userName").attr("nullmsg", pleaseinutusername);
    $("#userName").attr("title", username);

    $("#password").attr("nullmsg", pleaseinutpassword);
    $("#password").attr("title", password);

    $("#randCode").attr("nullmsg", pleaseinputvalidatecode);
    $("#randCode").attr("title", validatecode);

    getCookie();
    onfocus();

    $(".on_off_checkbox").iphoneStyle();
    $('.tip a ').tipsy({
        gravity: 'sw'
    });
    $('#login').show().animate({
        opacity: 1
    }, 50);
    $('.logo').show().animate({
        opacity: 1,
        top: '32%'
    }, 1, function () {
        $('.logo').show().delay(20).animate({
            opacity: 1,
            top: '1%'
        }, 10, function () {
            $('.formLogin').animate({
                opacity: 1,
                left: '0'
            }, 10);
            $('.userbox').animate({
                opacity: 0
            }, 10).hide();
        });
    });
});
$('.userload').click(function (e) {
    $('.formLogin').animate({
        opacity: 1,
        left: '0'
    }, 300);
    $('.userbox').animate({
        opacity: 0
    }, 200, function () {
        $('.userbox').hide();
    });
});

$('#randCodeImage').click(function () {
    $("#loginTips").empty();
    reloadRandCodeImage();
});

/**
 * 刷新验证码
 */
function reloadRandCodeImage() {
    $("#loginTips").empty();
    var date = new Date();
    var img = document.getElementById("randCodeImage");
    img.src = 'randCodeImage?a=' + date.getTime();
}

// 重置
$('#forgetpass').click(function (e) {
    $("#loginTips").empty();
    $(":input").each(function () {
        $('#' + this.name).val("");
    });
});
// 点击登录
$('#but_login').click(function (e) {
    submit();
});
//回车登录
$(document).keydown(function (e) {
    if (e.keyCode == 13) {
        submit();
    }
});
//表单提交
function submit() {
    $("#loginTips").empty();
    var submit = true;
    $("input[nullmsg]").each(function () {
        if ($("#" + this.name).val() == "") {
            showError($("#" + this.name).attr("nullmsg"), 500);
            setTimeout('hideTop()', 1000);
            submit = false;
            return false;
        }
    });
    if (submit) {
        hideTop();
        try {
            loading(checking, 1);
        } catch (e) {
            // TODO: handle exception
        }
        setTimeout("unloading()", 1000);
        setTimeout("Login()", 1000);
    }

}

//登录处理函数
function Login(orgId) {
    setCookie();
    var actionurl = $('form').attr('action');//提交路径
    var checkurl = $('form').attr('check');//验证路径
    var formData = new Object();
    var data = $(":input").each(function () {
        formData[this.name] = $("#" + this.name).val();
    });

    formData['langCode'] = $("#langCode").val();
    formData['langCode'] = $("#langCode option:selected").val();
    $.ajax({
        async: false,
        cache: false,
        type: 'POST',
        url: checkurl,// 请求的action路径
        data: formData,
        error: function () {// 请求失败处理函数
        },
        success: function (data) {
            console.log(data);
            var d = $.parseJSON(data.jsonStr);
            console.log(d);
            if (d.success) {
                loginsuccess();
                setTimeout("window.location.href='" + actionurl + "'", 1000);
            } else {
                showError(d.msg);
            }
        }
    });
}
//设置cookie
function setCookie() {
    if ($('#on_off').val() == '1') {
        $("input[iscookie='true']").each(function () {
            $.cookie(this.name, $("#" + this.name).val(), "/", 24);
            $.cookie("COOKIE_NAME", "true", "/", 24);
        });
    } else {
        $("input[iscookie='true']").each(function () {
            $.cookie(this.name, null);
            $.cookie("COOKIE_NAME", null);
        });
    }
}
//读取cookie
function getCookie() {
    var COOKIE_NAME = $.cookie("COOKIE_NAME");
    if (COOKIE_NAME != null) {
        $("input[iscookie='true']").each(function () {
            $($("#" + this.name).val($.cookie(this.name)));

            if ("admin" == $.cookie(this.name)) {
                $("#randCode").focus();
            } else {
                $("#password").val("");
                $("#password").focus();
            }

        });
        $("#on_off").attr("checked", true);
        $("#on_off").val("1");
    }
    else {
        $("#on_off").attr("checked", false);
        $("#on_off").val("0");

        $("#randCode").focus();

    }
}
//点击消息关闭提示
$('#alertMessage').click(function () {
    hideTop();
});
//显示错误提示
function showError(str) {
    $("#loginTips").html("* " + str);
    //$('#alertMessage').addClass('error').html(str).stop(true, true).show().animate({
    //    opacity: 1,
    //    right: '0'
    //}, 500);

}
//验证通过加载动画
function loginsuccess() {
    $("#login").animate({
        opacity: 1,
        top: '49%'
    }, 200, function () {
        $('.userbox').show().animate({
            opacity: 1
        }, 500);
        $("#login").animate({
            opacity: 0,
            top: '60%'
        }, 500, function () {
            $(this).fadeOut(200, function () {
                $(".text_success").slideDown();
                $("#successLogin").animate({
                    opacity: 1,
                    height: "200px"
                }, 1000);
            });
        });
    });
}
function showSuccess(str) {
    $('#alertMessage').removeClass('error').html(str).stop(true, true).show().animate({
        opacity: 1,
        right: '0'
    }, 500);
}

function onfocus() {
    if ($(window).width() > 480) {
        $('.tip input').tipsy({
            trigger: 'focus',
            gravity: 'w',
            live: true
        });
    } else {
        $('.tip input').tipsy("hide");
    }
}

function hideTop() {
    $('#alertMessage').animate({
        opacity: 0,
        right: '-20'
    }, 500, function () {
        $(this).hide();
    });
}
//加载信息
function loading(name, overlay) {
    $('body').append('<div id="overlay"></div><div id="preloader">' + name + '..</div>');
    if (overlay == 1) {
        $('#overlay').css('opacity', 0.1).fadeIn(function () {
            $('#preloader').fadeIn();
        });
        return false;
    }
    $('#preloader').fadeIn();
}

function unloading() {
    $('#preloader').fadeOut('fast', function () {
        $('#overlay').fadeOut();
    });
}
// 表单晃动
function jrumble() {
    //$('.inner').jrumble({
    //    x: 4,
    //    y: 0,
    //    rotation: 0
    //});
    //$('.inner').trigger('startRumble');
    //setTimeout('$(".inner").trigger("stopRumble")', 500);
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}