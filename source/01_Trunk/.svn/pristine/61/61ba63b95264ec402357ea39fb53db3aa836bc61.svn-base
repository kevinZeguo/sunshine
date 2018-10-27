var rep_info = {};
rep_info.queryListUrl = "/repertory/billList.ajax";//查询列表地址

//grid定义
var grid_selector = "#part-grid-table";
var pager_selector = "#part-grid-pager";

$(document).ready(function ($) {
    //初始化列表
    rep_info.init_grid();
});

//初始化grid列表
rep_info.init_grid = function () {
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
        url: rep_info.queryListUrl,
        datatype: "json",
        height: 365,
        colNames: ['配件编号', '配件名称', '仓库名称', '出入库类型', '合同编号', '出入库数量', '出入库单价', '总价', '操作人', '出入库时间'],
        colModel: [
            {name: 'pCode', index: 'pCode', width: 120},
            {name: 'pName', index: 'pName', width: 90},
            {name: 'storageName', index: 'storageName', width: 120},
            {
                name: 'repertoryType', index: 'repertoryType', width: 70, formatter: function (code, data, record) {
                if (code == 1) {
                    return "入库";
                } else if (code == 2) {
                    return "出库";
                } else {
                    return '--';
                }
            }
            },
            {name: 'contractCode', index: 'contractCode', width: 120},
            {name: 'num', index: 'num', width: 70},
            {name: 'price', index: 'price', width: 70},
            {name: 'totalPrice', index: 'totalPrice', width: 70, formatter: function (code, data, record) {
                var repertoryType = record.repertoryType;
                if(repertoryType == 2){
                    return record.totalAmt;
                }else {
                    var num = record.num == null ? 0 : record.num;
                    var price = record.price == null ? 0 : record.price;
                    return num * price;
                }
            }},
            {name: 'creatorName', index: 'creatorName', width: 80},
            {name: 'createdStr', index: 'createdStr', width: 120}
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
            storageId: $("#storageId").val(),
            pId: $("#pId").val()
        },
        caption: "库存变更记录",
        autowidth: true
    });
    $(window).triggerHandler('resize.jqGrid');

    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });

}

