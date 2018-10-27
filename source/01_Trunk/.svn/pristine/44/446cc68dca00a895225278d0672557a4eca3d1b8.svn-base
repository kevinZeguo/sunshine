var isInit = false;

/**
 * 选择用户
 * @param selector 选择器
 * @param placeholder 占位符
 * @param multiple 是否多选
 */
function listcustomer(selector, onCusSelectorChanged) {
    if (isInit) {
        return;
    }
    try {
        isInit = true;
        $(selector).select2({
            placeholder: "请选择客户信息",
            multiple: false,
            cache: true,
            allowClear: true,
            id: function (customer) {
                return customer.cId;
            },
            ajax: {
                url: "/customer/list4select.ajax",
                dataType: 'json',
                method: 'post',
                data: function (term, page) {
                    return {
                        keyword: encodeURI(term),
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
                $.ajax("/customer/findById.ajax", {
                    data: {
                        cId: data
                    },
                    dataType: "json"
                }).done(function (json) {
                    var customer = json.obj;
                    console.log(customer);
                    callback(customer);
                });
            },
            formatResult: function (customer) {
                return customer.cName;
            },
            formatSelection: function (customer) {
                return customer.cName;
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
        isInit = true;
    } catch (e) {
    }
}
