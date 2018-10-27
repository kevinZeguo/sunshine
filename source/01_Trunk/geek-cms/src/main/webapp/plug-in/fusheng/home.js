var home = {};
home.customerList = "/customer/list.ajax";//查询列表地址
home.deviceList = "/device/list.ajax";//查询列表地址
home.partList = "/part/list.ajax";//查询列表地址
home.inList = "/repertory/in/list.ajax";//查询列表地址
home.outList = "/repertory/out/list.ajax";//查询列表地址
home.contractList = "/contract/list.ajax";//查询列表地址
home.debugList = "/serve/debug/list.ajax";//查询列表地址
home.maintenanceList = "/server/maintenance/list.ajax";//查询列表地址
home.pollingList = "/serve/polling/list.ajax";//查询列表地址

$(document).ready(function ($) {
    //初始化基本信息
    home.init_customer();
    //初始化基本信息
    home.init_device();
    //初始化基本信息
    home.init_part();
    //初始化基本信息
    home.init_in();
    //初始化基本信息
    home.init_out();
    //初始化基本信息
    home.init_contract();
    //初始化基本信息
    home.init_debug();
    //初始化基本信息
    home.init_polling();
    //初始化基本信息
    home.init_maintenance();

});

//初始化客户
home.init_customer = function () {
    $.ajax({
        url: home.customerList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].cName + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].createdStr + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            console.log(html);
            $("#customer_list").html(html);
        }
    });
}
//设备
home.init_device = function () {
    $.ajax({
        url: home.deviceList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].eCode + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].createdStr + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            $("#device_list").html(html);
        }
    });
}

//配件
home.init_part = function () {
    $.ajax({
        url: home.partList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            pCode: '',
            pName: '',
            pPrice: '',
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].pName + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].createdStr + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            $("#part_list").html(html);
        }
    });
}

//入库
home.init_in = function () {
    $.ajax({
        url: home.inList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].pCode + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].createdStr + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            $("#in_list").html(html);
        }
    });
}


//出库
home.init_out = function () {
    $.ajax({
        url: home.outList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].customerName + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].createdStr + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            $("#out_list").html(html);
        }
    });
}

//合同
home.init_contract = function () {
    $.ajax({
        url: home.contractList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            pCode: '',
            pName: '',
            pPrice: '',
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].aCode + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].cName + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            $("#contract_list").html(html);
        }
    });
}


//维保
home.init_maintenance = function () {
    $.ajax({
        url: home.partList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            pCode: '',
            pName: '',
            pPrice: '',
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].pName + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].createdStr + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            $("#part_list").html(html);
        }
    });
}

//巡检
home.init_polling = function () {
    $.ajax({
        url: home.partList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            pCode: '',
            pName: '',
            pPrice: '',
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].pName + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].createdStr + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            $("#part_list").html(html);
        }
    });
}
//调试
home.init_debug = function () {
    $.ajax({
        url: home.partList,
        type: 'post',
        dataType: 'json',
        data: {
            page: 1,
            pCode: '',
            pName: '',
            pPrice: '',
            rows: 5
        },
        success: function (json, statusText, xhr, $form) {
            var html = "";
            if (json.list != null && json.list != '' && json.list.length > 0) {
                for (var i = 0; i < json.list.length; i++) {
                    html += '<li class=""> <i class="ace-icon fa fa-check green"></i>';
                    html += '<span class=" ">' + json.list[i].pName + '</span>';
                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    html += '<span class="">' + json.list[i].createdStr + '</span>';
                    html += '</li>';
                }
            } else {
                html = "暂无数据"
            }
            $("#part_list").html(html);
        }
    });
}

