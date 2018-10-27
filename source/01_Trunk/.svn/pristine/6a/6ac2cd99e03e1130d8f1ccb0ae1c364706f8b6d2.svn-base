var isInit_no = false;

/**
 * 选择设备
 * @param selector 选择器
 * @param placeholder 占位符
 * @param multiple 是否多选
 */
function listhostnum(selector, onCusSelectorChanged, cIdSelector) {
    if (isInit_no) {
        return;
    }

    try {
        isInit_no = true;
        $(selector).select2({
            placeholder: "请选择主机编号",
            multiple: false,
            cache: true,
            allowClear: true,
            id: function (device) {
                return device.eId;
            },
            ajax: {
                url: "/device/list4select.ajax",
                dataType: 'json',
                method: 'post',
                data: function (term, page) {
                    return {
                        keyword: encodeURI(term),
                        cId: $(cIdSelector).val(),
                        rows: 10,
                        page: 1
                    };
                },
                results: function (data, page) {
                    return {results: data.list};
                }
            },
            //初始化选中;
            initSelection: function (element, callback) {
                var data = element.val();
                $.ajax("/device/findById.ajax", {
                    //type: 'post',
                    data: {
                        eId: data
                    },
                    dataType: "json"
                }).done(function (json) {
                    var device = json.obj;
                    callback(device);
                });
            },
            formatResult: function (device) {
                if (device.hostNum != null && device.hostNum != "")
                    return device.hostNum;
                else
                    return device.oldHostNum;
            },
            formatSelection: function (device) {
                if (device.hostNum != null && device.hostNum != "")
                    return device.hostNum;
                else
                    return device.oldHostNum;
            },
            dropdownCssClass: "bigdrop",
            formatSearching: function () {
                return "加载中..."
            },
            formatNoMatches: function (term, data) {
                return "没有匹配结果."
            },
            escapeMarkup: function (m) {
                return m;
            }
        }).on("change", function (e) {
            if ($.isFunction(onCusSelectorChanged)) {
                onCusSelectorChanged(e);
            }

            if (e && e.removed) {
                var oldValues = $(selector).val().split(/,|;/);
                var newValues = [];
                for (var i = 0; i < oldValues.length; i++) {
                    if (oldValues[i] != e.removed) {
                        newValues.push(oldValues[i]);
                    }
                }
                if (newValues.length > 0) {
                    $(selector).val(newValues.join(";"));
                } else {
                    $(selector).val("");
                }
            }
            $(this).valid();
        }).on("select2-close", function () {
            //$(this).valid();
        });
    } catch (e) {
        console.log(e);
    }
}
