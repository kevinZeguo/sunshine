var rep_out = {};
//rep_out.queryListUrl = "/repertory/billList.ajax";//查询列表地址
//
////grid定义
//var grid_selector = "#part-grid-table";
//var pager_selector = "#part-grid-pager";

$(document).ready(function ($) {
    //初始化列表
    //rep_out.init_grid();
    $("#closeInfoModal").click(function () {
        $("#infoModal").modal("hide");
    })

    $("#print-btn").click(function () {
        $("#out-Info").jqprint({
            debug: false,
            importCSS: true,
            printContainer: true
        });
        $("#infoModal").modal("hide");
    })
});
//
////初始化grid列表
//rep_out.init_grid = function () {
//    //resize to fit page size
//    $(window).on('resize.jqGrid', function () {
//        $(grid_selector).jqGrid('setGridWidth', $(".page-content").width());
//    })
//
//    ////resize on sidebar collapse/expand
//    var parent_column = $(grid_selector).closest('[class*="col-"]');
//    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
//        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
//            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
//            setTimeout(function () {
//                $(grid_selector).jqGrid('setGridWidth', parent_column.width());
//            }, 0);
//        }
//    })
//
//    //初始化grid
//    $(grid_selector).jqGrid({
//        url: rep_out.queryListUrl,
//        datatype: "json",
//        height: 365,
//        colNames: ['配件编号', '配件名称', '出库数量', '出库单价', '含税价格', '出库总价', '操作人', '操作时间'],
//        colModel: [
//            {name: 'pCode', index: 'pCode', width: 120},
//            {name: 'pName', index: 'pName', width: 90},
//            {name: 'num', index: 'num', width: 70},
//            {name: 'price', index: 'price', width: 70},
//            {name: 'taxAmt', index: 'taxAmt', width: 70},
//            {name: 'totalAmt', index: 'totalAmt', width: 70},
//            {name: 'creatorName', index: 'creatorName', width: 120},
//            {name: 'createdStr', index: 'createdStr', width: 120}
//        ],
//        viewrecords: true,
//        rowNum: 10,
//        rowList: [10, 20, 30],
//        pager: pager_selector,
//        altRows: true,
//        multiselect: true,
//        multiboxonly: true,
//        sordname: 'id',
//        sortorder: 'desc',
//        jsonReader: {
//            root: "list",//保存详细记录的名称
//            total: "totalPage",//总共有页
//            page: "page",//当前是哪一页
//            records: "records",//总共记录数
//            repeatitems: false
//        },
//        postData: {
//            recordId: $("#id").val()
//        },
//        caption: "出库记录",
//        autowidth: true
//    });
//    $(window).triggerHandler('resize.jqGrid');
//
//    //设置
//    $(document).on('ajaxloadstart', function (e) {
//        $(grid_selector).jqGrid('GridUnload');
//        $('.ui-jqdialog').remove();
//    });
//
//}

