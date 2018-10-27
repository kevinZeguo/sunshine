var rep_list = {};
rep_list.queryListUrl = "/repertory/list.ajax";//查询列表地址

//grid定义
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    rep_list.init_base();
    //初始化事件
    rep_list.init_event();
    //初始化列表
    rep_list.init_grid();
});

//初始化基本信息
rep_list.init_base = function () {
    initAttrSelect("#storageIdQ", "part.stock.storagelist", '');
}

//初始化事件
rep_list.init_event = function () {
    //查询事件
    $("#queryBtn").click(function () {
        refreshInList();
    })

    //回车事件
    $("#pCodeQ").keydown(function (e) {
        keyEvent(e);
    })
    $("#pNameQ").keydown(function (e) {
        keyEvent(e);
    })
    $("#inDateQ").keydown(function (e) {
        keyEvent(e);
    })
}
//初始化grid列表
rep_list.init_grid = function () {
    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    })

    ////resize on sidebar collapse/expand
    var parent_column = $(grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })

    //初始化grid
    $(grid_selector).jqGrid({
        url: rep_list.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['库存编号', '配件编号', '配件名称', '仓库名称', '现库存数量', '入库总数量', '出库总数量', '入库总价格', '出库总价格', '修改人', '修改时间'],
        colModel: [
            {
                name: 'code', index: 'code', width: 120, formatter: function (code, data, record) {
                var id = record.id;

                if (id != null && id != '' && id != "null") {
                    return "<a href='/repertory/info.html?id=" + record.id + "'>" + code + "</a>"
                } else {
                    return "--";
                }
                return code;
            }
            },
            {name: 'pCode', index: 'pCode', width: 120},
            {name: 'pName', index: 'pName', width: 90},
            {name: 'storageName', index: 'storageName', width: 120},
            {name: 'stockNum', index: 'stockNum', width: 70},
            {name: 'inNum', index: 'inNum', width: 70},
            {name: 'outNum', index: 'outNum', width: 70},
            {name: 'inFee', index: 'inFee', width: 70},
            {name: 'outFee', index: 'outFee', width: 70},
            {name: 'modifierName', index: 'modifierName', width: 120},
            {name: 'modifiedStr', index: 'modifiedStr', width: 120}
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: pager_selector,
        altRows: true,
        multiselect: true,
        multiboxonly: true,
        sordname: 'id',
        sortorder: 'desc',
        jsonReader: {
            root: "list",//保存详细记录的名称
            total: "totalPage",//总共有页
            page: "page",//当前是哪一页
            records: "records",//总共记录数
            repeatitems: false
        },
        postData: {
            partCode: encodeURI($("#pCodeQ").val()),
            partName: encodeURI($("#pNameQ").val()),
            storageId: $("#storageIdQ").val()
        },
        caption: "库存管理",
        autowidth: true
    });
    $(window).triggerHandler('resize.jqGrid');

    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });

}

//列表查询
function refreshInList() {
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            partCode: encodeURI($("#pCodeQ").val()),
            partName: encodeURI($("#pNameQ").val()),
            storageId: $("#storageIdQ").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshInList();
    }
}

