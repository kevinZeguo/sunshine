/**
 * 选择用户
 * @param selector 选择器
 * @param placeholder 占位符
 * @param multiple 是否多选
 */
function listContract(selector, cId) {
    try {
        $(selector).select2({
            placeholder: "请选择客户信息",
            multiple: false,
            cache: true,
            allowClear: true,
            id: function (contract) {
                return contract.id;
            },
            ajax: {
                url: "/contract/list.ajax",
                dataType: 'json',
                method: 'post',
                data: function (term, page) {
                    return {
                        contractCode: encodeURI(term),
                        cId: $(cId).val(),
                        queryContractType: 0,
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
                $.ajax("/contract/findById.ajax", {
                    //type: 'post',
                    data: {
                        cId: data
                    },
                    dataType: "json"
                }).done(function (json) {
                    var customer = json.obj;
                    callback(customer);
                });
            },
            formatResult: function (contract) {
                return contract.aCode;
            },
            formatSelection: function (contract) {
                return contract.aCode;
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
        }).on("select2-close", function () {
            //$(this).valid();
        });
    } catch (e) {
        console.log(e);
    }
}
