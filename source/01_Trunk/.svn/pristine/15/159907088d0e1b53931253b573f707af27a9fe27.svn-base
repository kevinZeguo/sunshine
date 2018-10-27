/**
 * 选择用户
 * @param selector 选择器
 * @param placeholder 占位符
 * @param multiple 是否多选
 */
function listPart(selector, onPartSelectorChanged) {
    try {
        $(selector).select2({
            placeholder: "请选择设备",
            multiple: false,
            cache: true,
            allowClear: true,
            id: function (part) {
                return part.pId;
            },
            ajax: {
                url: "/part/list.ajax",
                dataType: 'json',
                method: 'post',
                data: function (term, page) {
                    return {
                        keyword: encodeURI(term),
                        pPrice: '',
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
                $.ajax("/part/findById.ajax", {
                    //type: 'post',
                    data: {
                        pId: data
                    },
                    dataType: "json"
                }).done(function (json) {
                    var customer = json.obj;
                    callback(customer);
                });
            },
            formatResult: formatResult,
            formatSelection: formatSelection,
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
            if ($.isFunction(onPartSelectorChanged)) {
                onPartSelectorChanged(e);
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

function formatResult(part) {
    return part.pName + "(" + part.pCode + ")"

}

function formatSelection(part) {
    return part.pName + "(" + part.pCode + ")";
}


/**
 * 选择仓库中已有的 配件
 * @param selector 选择器
 * @param placeholder 占位符
 * @param multiple 是否多选
 */
function listStoragePart(selector, storageId, onPartSelectorChanged) {
    try {
        $(selector).select2({
            placeholder: "请选择设备",
            multiple: false,
            cache: true,
            allowClear: true,
            id: function (part) {
                return part.pId;
            },
            ajax: {
                url: "/part/storagePart.ajax",
                dataType: 'json',
                method: 'post',
                data: function (term, page) {
                    return {
                        keyword: encodeURI(term),
                        storageId: $(storageId).val(),
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
                $.ajax("/part/findById.ajax", {
                    data: {
                        pId: data
                    },
                    async: false,
                    dataType: "json"
                }).done(function (json) {
                    var customer = json.obj;
                    callback(customer);
                });
            },
            formatResult: formatResult,
            formatSelection: formatSelection,
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
            if ($.isFunction(onPartSelectorChanged)) {
                onPartSelectorChanged(e);
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
