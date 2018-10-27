/**
 * cms公用js
 */


$(document).ready(function () {
    //文件上传功能：
    if ($("p.cms-upload-file input[type='file']").change(function () {
            $(this).parents('span').siblings('span.file-content').text($(this).val());
        }));

    //提示框信息：
    $("body").delegate('.cms-hint-sign','mouseenter',function () {
        if($(this).next().hasClass("popover")) {
            return ;
        }
        var $this = $(this);
        var hint = $this.attr('data-hint');
        var html = '<span>' + hint + '</span> ';
        $this.popover({
            'trigger': 'click',
            content: html,
            html: true
        });
        $this.popover('show');
    })
    $("body").delegate('.cms-popover-box','mouseleave',function () {
        var $this = $(this).find("div.popover");
        $this.popover('destroy');
    })

});

jQuery.cmsUtil = {
    //判断是否是空对象
    isEmpty: function (obj) {
        if (obj == undefined || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    },
    checkDialogIsOpen: function ($target) {
        var uniformClass = "cms-utilUniform";
        var $body = $target.parents("body:last");

        var isOpen = false;
        $body.find("." + uniformClass).each(function (index) {
            if (!isOpen && $(this).is(":visible")) {
                isOpen = true;
            }
        });
        return isOpen;
    },
    /**
     * 弹出消息
     * @param $element
     * @param message
     * @param callBack
     */
    alertDialog: function ($element, message, callBack) {
        var uniformClass = "cms-utilUniform";
        var dialogClass = "cms-utilAlert";
        var okClass = "cms-utilAlertOK";
        var messageClass = "cms-modal-ok-no";

        var $body = $element.parents("body:last");
        var $dialog = $body.find("." + dialogClass);
        if ($dialog.length == 0) {
            var newDiv = '<div class="modal ' + dialogClass + ' ' + uniformClass + '"><div class="modal-dialog">' +
                '<div class="modal-content" style="max-height: 869px;">' +
                '<div class="modal-header" ><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h4 class="modal-title">提示</h4></div>' +
                '<div class="modal-body" style="max-height: 749px; overflow-y: auto;">' +
                '<div class="' + messageClass + '">' + message + '</div>' +
                '</div>' +
                '<div class="modal-footer modal-footer">' +
                '<a class="btn btn-primary btn-sm ' + okClass + '">关闭</a></div></div></div></div>';

            $dialog = $(newDiv);
            $body.append($dialog);
        } else {
            var $message = $dialog.find("." + messageClass);
            $message.html(message);
        }

        var checkedOpenFunction = this.checkDialogIsOpen;

        var $ok = $dialog.find("." + okClass);
        var $cmsClose = $dialog.find(".close");

        $cmsClose.unbind("click");
        $cmsClose.bind("click", function () {
            if (jQuery.isFunction(callBack)) {
                callBack();
            }
            $dialog.hide();
            if (!checkedOpenFunction($element)) {
                $body.children("div").each(function (index) {
                    if (!$(this).hasClass(uniformClass)) {
                        $(this).css("opacity", "");
                    }
                });
                $("body").find(".modal-backdrop").each(function () {
                    $(this).remove();
                })
            }
        });

        $ok.unbind("click");
        $ok.bind("click", function () {
            if (jQuery.isFunction(callBack)) {
                callBack();
            }
            $dialog.hide();


            if (!checkedOpenFunction($element)) {
                $body.children("div").each(function (index) {
                    if (!$(this).hasClass(uniformClass)) {
                        $(this).css("opacity", "");
                    }
                });
                $("body").find(".modal-backdrop").each(function () {
                    $(this).remove();
                })
            }
        });

        if (!checkedOpenFunction($element)) {
            $('<div class="modal-backdrop fade in"></div>').appendTo($("body"));
        }

        $dialog.show();
    },
    /**
     * 确认对话框
     * @param $element
     * @param message
     * @param callBack
     */
    showConfirmDialog: function ($element, message, callBack) {
        this.showConfigConfirmDialog({
            $target: $element,
            message: message,
            callBack: callBack
        });
    },
    /**
     * 自定义配置确认对话框
     * @param config
     */
    showConfigConfirmDialog: function (config) {
        config = config || {};
        if (jQuery.isEmptyObject(config)) {
            return;
        }

        config.$target = config.$target || {};
        if (jQuery.isEmptyObject(config.$target)) {
            return;
        }

        if (!jQuery.isFunction(config.callBack)) {
            return;
        }

        config.title = config.title || "提示";
        config.okLable = config.okLable || "确定";
        config.cancelLable = config.cancelLable || "取消";
        config.message = config.message || "";

        var uniformClass = "utilUniform";
        var dialogClass = "utilConfirm";
        var okClass = "utilOk";
        var cancelClass = "utilCancel";
        var messageClass = "modal-ok-no"

        var $body = config.$target.parents("body:last");
        var $dialog = $body.find("." + dialogClass);
        if ($dialog.length == 0) {
            var newDiv = '<div class="modal ' + dialogClass + ' ' + uniformClass + '"><div class="modal-dialog">' +
                '<div class="modal-content" style="max-height: 869px;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h4 class="modal-title">' + config.title + '</h4></div>' +
                '<div class="modal-body" style="max-height: 749px; overflow-y: auto;">' +
                '<div class="' + messageClass + '">' + config.message +
                '</div></div><br/><div class="modal-footer modal-footer">' +
                '<a class="btn btn-primary  btn-sm ' + okClass + '">' + config.okLable + '</a>&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<a class="btn btn-default  btn-sm ' + cancelClass + '">' + config.cancelLable + '</a></div></div></div></div>';

            $dialog = $(newDiv);
            $body.append($dialog);
        } else {
            var $message = $dialog.find("." + messageClass);
            $message.html(config.message);
        }
        var $ok = $dialog.find("." + okClass);
        var $cancel = $dialog.find("." + cancelClass);


        var $cmsClose = $dialog.find(".close");

        $cmsClose.unbind("click");
        $cmsClose.bind("click", function () {
            $dialog.hide();
            if (!checkedOpenFunction(config.$target)) {
                $body.children("div").each(function (index) {
                    if (!$(this).hasClass(uniformClass)) {
                        $(this).css("opacity", "");
                    }
                });

                $("body").find(".modal-backdrop").each(function () {
                    $(this).remove();
                })
            }
        });


        $ok.unbind("click");
        $cancel.unbind("click");

        var checkedOpenFunction = this.checkDialogIsOpen;

        $ok.bind("click", function () {
            config.callBack(true);
            $dialog.hide();

            if (!checkedOpenFunction(config.$target)) {
                $body.children("div").each(function (index) {
                    if (!$(this).hasClass(uniformClass)) {
                        $(this).css("opacity", "");
                    }
                });

                $("body").find(".modal-backdrop").each(function () {
                    $(this).remove();
                })
            }
        });

        $cancel.bind("click", function () {
            config.callBack(false);
            $dialog.hide();

            if (!checkedOpenFunction(config.$target)) {
                $body.children("div").each(function (index) {
                    if (!$(this).hasClass(uniformClass)) {
                        $(this).css("opacity", "");
                    }
                });

                $("body").find(".modal-backdrop").each(function () {
                    $(this).remove();
                })
            }
        });

        if (!checkedOpenFunction(config.$target)) {
            //$body.children("div").each(function (index) {
            //    if (!$(this).hasClass(uniformClass)) {
            //        $(this).css("opacity", "0.3");
            //    }
            //});

            $('<div class="modal-backdrop fade in"></div>').appendTo($("body"));
        }

        $dialog.show();
    },

    /**
     * 获取对话框
     * @param $dialog
     * @returns {{}}
     */
    getDialogHelper: function ($dialog, attachEventHandler) {
        var uniformClass = "utilUniform";
        var dialogClass = "utilCustomDialog";

        var helper = {};
        helper.$target = $dialog;
        if (!helper.$target.hasClass(dialogClass)) {
            helper.$target.addClass(dialogClass);
        }
        if (!helper.$target.hasClass(uniformClass)) {
            helper.$target.addClass(uniformClass);
        }
        helper.$parent = $dialog.parent();
        helper.$body = $dialog.parents("body:last");

        var checkedOpenFunction = this.checkDialogIsOpen;

        helper.show = function () {
            this.$target.remove();
            this.$body.append(this.$target);
            this.$target.css('z-index', 99999);

            if (!checkedOpenFunction($dialog)) {
                this.$body.children("div").each(function (index) {
                    if (!$(this).hasClass(uniformClass)) {
                        $(this).css("opacity", "0.3");
                    }
                });
                $('<div class="modal-backdrop fade in"></div>').appendTo($("body"));
            }
            this.$target.show();

            if (jQuery.isFunction(attachEventHandler)) {
                attachEventHandler();
            }
        };
        helper.close = function () {
            this.$target.hide();
            if (!checkedOpenFunction($dialog)) {
                this.$body.children("div").each(function (index) {
                    if (!$(this).hasClass(uniformClass)) {
                        $(this).css("opacity", "");
                    }
                });

                $("body").find(".modal-backdrop").each(function () {
                    $(this).remove();
                })
            }
            this.$target.remove();
            this.$parent.append(this.$target);
        }
        return helper;
    }
    ,
    /**
     * 弹出消息
     * @param $element
     * @param message
     * @param callBack
     */
    load: function ($element, message, callBack) {
        var $load = $($element).find();
        if($load) {

        }
        $load.show();
    },
    getYesterDay: function () {
        var today = new Date();
        var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
        var yesterday = new Date();
        yesterday.setTime(yesterday_milliseconds);

        return yesterday;
    }


}
;