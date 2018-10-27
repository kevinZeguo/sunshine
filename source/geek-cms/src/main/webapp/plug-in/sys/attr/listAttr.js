function initAttrSelect(selectId, groupCode, attrValue) {
    $.ajax({
        url: "/attr/findValueListByGroupCode.ajax",
        type: 'post',
        dataType: 'json',
        async: false,
        data: {
            groupCode: groupCode
        },
        success: function (json, statusText, xhr, $form) {
            if (json.success) {
                var list = json.obj;
                var selectHtml = "<option value=''>请选择</option>"
                if (list != null && list != '' && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        selectHtml += "<option value='" + list[i].attrId + "' >" + list[i].attrValue + "</option>"
                    }
                }
                $(selectId).html(selectHtml);
                $(selectId).val(attrValue);
                $(selectId).select2();
            } else {
                console.log(e);
            }
        }
    });
}