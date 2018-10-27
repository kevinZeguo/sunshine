var customer_info = {};
customer_info.outRepDetailListUrl = "/repertory/out/outRepDetailList.ajax";//查询列表地址

//grid定义 设备
var equipment_grid_selector = "#equipment-grid-table";
var equipment_pager_selector = "#equipment-grid-pager";
//配件
var parts_grid_selector = "#parts-grid-table";
var parts_pager_selector = "#parts-grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    customer_info.init_base();
    //初始化事件
    customer_info.init_event();
});

//初始化基本信息
customer_info.init_base = function () {
    $("#bCustomerId").val($("#cId").val());
}

//初始化事件
customer_info.init_event = function () {

    $("#toggle-equipment").click(function () {
        $('.toggle-component').removeClass("active");
        $(this).parent().addClass("active");
        $("#equipmentDiv").removeClass("hidden");
        $("#equipmentDiv").addClass("active in");
        $("#partsDiv").removeClass("active in");
        $("#partsDiv").addClass("hidden");

        var cId = $("#cId").val();

    })

    $("#toggle-parts").click(function () {
        $('.toggle-component').removeClass("active");
        $(this).parent().addClass("active");
        $("#partsDiv").removeClass("hidden");
        $("#partsDiv").addClass("active in");

        $("#equipmentDiv").addClass("hidden");
        $("#equipmentDiv").removeClass("active in");

        ////初始化列表
        customer_info.init_parts_grid();
    })


}
//配件更换记录列表
customer_info.init_parts_grid = function () {

    $(window).on('resize.jqGrid', function () {
        $(parts_grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    })

    ////resize on sidebar collapse/expand
    var parent_column = $(parts_grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name == 'sidebar_collapsed' || event_name == 'main_container_fixed') {
            setTimeout(function () {
                $(parts_grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })

    //初始化grid
    $(parts_grid_selector).jqGrid({
        url:customer_info.outRepDetailListUrl,
        datatype: "json",
        height: 365,
        colNames: ['合同编号（甲方）', '配件编号', '配件名称', '更换时间',  '单价', '数量', '单位', '总价', '备注'],
        colModel: [
            {name: 'contractCode', index: 'contractCode', width: 150},
            {name: 'pCode', index: 'pCode', width: 120},
            {name: 'pName', index: 'pName', width: 120},
            {name: 'createdStr', index: 'createdStr', width: 120},
            {name: 'price', index: 'price', width: 150, sortable: false},
            {name: 'num', index: 'num', width: 150, sortable: false},
            {name: 'unit', index: 'unit', width: 150, sortable: false},
            {name: 'totalAmt', index: 'totalAmt', width: 150, sortable: false},
            {name: 'note', index: 'note', width: 150, sortable: false}
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: parts_pager_selector,
        altRows: true,
        multiselect: true,
        multiboxonly: true,
        //sordname: 'cId',
        sortorder: 'desc',
        jsonReader: {
            root: "list",//保存详细记录的名称
            total: "totalPage",//总共有页
            page: "page",//当前是哪一页
            records: "records",//总共记录数
            repeatitems: false
        },
        postData: {
            cId: $("#cId").val()
        },
        caption: "配件更换记录",
        autowidth: true
    });

    $(window).triggerHandler('resize.jqGrid');
    //设置
    $(document).on('ajaxloadstart', function (e) {
        $(parts_grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });
}


//列表查询
function refreshDeviceList() {
    $(equipment_grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            cId: $("#cId").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}

