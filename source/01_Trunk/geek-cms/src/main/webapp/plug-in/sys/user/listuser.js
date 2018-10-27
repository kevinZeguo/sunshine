/**
 * 选择用户
 * @param selector 选择器
 * @param placeholder 占位符
 * @param multiple 是否多选
 */
function listUser(selector, roleId, placeholder, onUserSelectorChanged) {
    try {
        $(selector).select2({
            placeholder: placeholder,
            multiple: false,
            cache: true,
            allowClear: true,
            id: function (user) {
                return user.userId;
            },
            ajax: {
                url: "/user/list.ajax",
                dataType: 'json',
                method: 'post',
                data: function (term, page) {
                    return {
                        keyword: encodeURI(term),
                        roleId: roleId,
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
                $.ajax("/user/findById.ajax", {
                    //type: 'post',
                    data: {
                        userIds: data
                    },
                    dataType: "json"
                }).done(function (json) {
                    var user = json.obj;
                    callback(user[0]);
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
        }).on("select2-close", function () {
            //$(this).valid();
        });
    } catch (e) {
        console.log(e);
    }
}

function formatResult(user) {
    return user.realName;

}

function formatSelection(user) {
    return user.realName;
}


function listMulUser(selector, roleId, placeholder, onUserSelectorChanged) {
    try {
        $(selector).select2({
            placeholder: placeholder,
            multiple: true,
            cache: true,
            allowClear: true,
            id: function (user) {
                return user.userId;
            },
            ajax: {
                url: "/user/list.ajax",
                dataType: 'json',
                method: 'post',
                data: function (term, page) {
                    return {
                        keyword: encodeURI(term),
                        roleId: roleId,
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
                $.ajax("/user/findById.ajax", {
                    //type: 'post',
                    data: {
                        userIds: data
                    },
                    dataType: "json"
                }).done(function (json) {
                    var user = json.obj;
                    console.log(user);
                    callback(user);
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
        }).on("select2-close", function () {
            //$(this).valid();
        });
    } catch (e) {
        console.log(e);
    }
}

