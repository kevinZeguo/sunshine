/**
 * zhangyongquan created by 2017/07/07
 */
var part_list = {};
part_list.queryListUrl = "/part/list.ajax";///查询列表地址
//grid定义
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";

$(document).ready(function ($) {
    //初始化基本信息
    part_list.init_base();
    //初始化事件
    part_list.init_event();
    //初始化列表
    part_list.init_grid();
});
//初始化基本信息
part_list.init_base = function () {

}

part_list.init_event = function () {
    //查询事件
    $("#queryBtn").click(function () {
        ///alert("querybtn clicked");
        refreshPartList();
    });
    //回车事件
    $("#querypCode").keydown(function (e) {
        keyEvent(e);
    });
    $("#querypName").keydown(function (e) {
        keyEvent(e);
    });
    $("#querypPrice").keydown(function (e) {
        keyEvent(e);
    });
    $("#addPart").click(function () {
        $(".part-body").empty();
        //$('#addModal').modal('data-remote'="/customer/add.html",'data-show'="true")
        $(".part-body").load('/part/add.html', function () {
            $("#addModal").modal({backdrop: 'static', keyboard: false});
            $("#addModal").modal("show");
        })

    });
    $("#addModal").on("hidden", function () {
        $(this).removeData("modal");
    });
}

part_list.init_grid = function () {
    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(grid_selector).jqGrid('setGridWidth', $(".page-content").width());
    })
    //resize on sidebar collapse/expand
    var parent_column = $(grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })

    //定义修改删除
    var actionHtml = '<div class="hidden-sm hidden-xs btn-group">'
        + '<button class="btn btn-xs btn-info" onclick="editPart(pId);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" data-original-title="编辑">'
        + '<i class="ace-icon fa fa-pencil bigger-120"></i>'
        + '</button>'
        + '<button class="btn btn-xs btn-danger" onclick="deletePart(pId,stockNum);" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" data-original-title="删除">'
        + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
        + '</button>'
        + '</div>';

    //初始化grid
    $(grid_selector).jqGrid({
        url: part_list.queryListUrl,
        datatype: "json",
        height: 320,///,'配件照片'
        colNames: ['配件编号', '配件名称', '价格(单位:元)', '库存数量', '备注', '操作'],
        colModel: [
            {
                name: 'pCode',
                index: 'pCode',
                width: 70,
                sorttype: 'string',
                formatter: function (pCode, data, record) {
                    if (pCode != null && pCode != '' && pCode != "null") {
                        return "<a href='/part/info.html?pId=" + record.pId + "'>" + pCode + "</a>"
                    } else {
                        return "--";
                    }
                }
            },
            {name: 'pName', index: 'pName', width: 70},
            {name: 'pPrice', index: 'pPrice', width: 70},
            {name: 'stockNum', index: 'stockNum', width: 50},
//            {
//            	name: 'pPicFile', 
//            	index: 'pPicFile', 
//            	width: 70,
//            	sortable:false,
//            	formatter:function(a, b, rowObject){////part/info.html?pId="+rowObject.pId+"
//            		///alert("pPic:"+rowObject.pPic);
//            		///alert("pPicFile:"+rowObject.pPicFile);
//            		if(rowObject.pPic != null && rowObject.pPic != "" && rowObject.pPic != "null")
//        			{
//            			var arPicId=rowObject.pPic.split(",");
//            			///alert(rowObject.pPicFile);
//            			var arPicFile=rowObject.pPicFile.split(",");
//            			var rowHtml="";
//            			for(i=0; i < arPicId.length; i++)
//        				{/// onclick='photoClick("+rowObject.pId+","+arPicId[i]+",\""+arPicFile[i]+"\")'
//            				rowHtml+="<a href='javascript:void(0);' title='点击查看照片,fid="+arPicId[i]+"'>"+arPicFile[i]+"</a>";
//            				if(i != arPicId.length-1)
//            					rowHtml+=",";
//        				}
//        				return rowHtml;///"<a href='#' title='点击查看照片' fId='"+rowObject.pPic+"'>"+rowObject.pPicFile+"</a>";
//        			}          			
//            		else
//            			return "";
//            	}
//            },
            {name: 'note', index: 'note', width: 120},
            {
                name: 'actions',
                index: 'actions',
                width: 120,
                fixed: true,
                sortable: false,
                formatter: function (a, b, rowObject) {
//                    return '<div style="margin-left:8px;">' +
//                        '<div title="编辑" style="float:left;cursor:pointer;" class="ui-pg-div ui-inline-edit" id="jEditButton_12" ' +
//                        'onclick="editPart(' + c.pId + ')" ' +
//                        'onmouseover="jQuery(this).addClass(\'ui-state-hover\');"' +
//                        ' onmouseout="jQuery(this).removeClass(\'ui-state-hover\')" ' +
//                        'data-original-title="编辑配件信息">' +
//                        '<span class="ui-icon ui-icon-pencil"></span></div>' +
//                        '<div title="删除" style="float:left;margin-left:5px;" ' +
//                        'class="ui-pg-div ui-inline-del" id="jDeleteButton_12" ' +
//                        'onclick="deletePart(' + c.pId + ')" ' +
//                        'onmouseover="jQuery(this).addClass(\'ui-state-hover\');" ' +
//                        'onmouseout="jQuery(this).removeClass(\'ui-state-hover\');" ' +
//                        'data-original-title="删除配件信息"><span class="ui-icon ui-icon-trash"></span>' +
//                        '</div>' +
//                        '</div>';
                    var html = actionHtml.replace("pId", rowObject.pId);
                    html = html.replace("pId", rowObject.pId);
                    html = html.replace("stockNum", rowObject.stockNum);
                    return html;
                }
            }
        ],
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: pager_selector,
        altRows: true,
        multiselect: true,
        multiboxonly: true,
        ///sordname: 'aCode',
        sortorder: 'desc',
        jsonReader: {
            root: "list",//保存详细记录的名称
            total: "totalPage",//总共有页
            page: "page",//当前是哪一页
            records: "records",//总共记录数
            repeatitems: false
        },
        postData: {
            pCode: encodeURI($("#querypCode").val()),
            pName: encodeURI($("#querypName").val()),
            pPrice: $("#querypPrice").val()
        },
        caption: "配件管理",
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
function refreshPartList() {
    ///alert($("#customerName").val());
    $(grid_selector).jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
            pCode: encodeURI($("#querypCode").val()),
            pName: encodeURI($("#querypName").val()),
            pPrice: $("#querypPrice").val()
        }, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}

///编辑所选配件
function editPart(pId) {
    ///alert("edit");
    $(".part-body").empty();
    $(".part-body").load('/part/edit.html?pId=' + pId, function () {

        $("#addModal").modal({backdrop: 'static', keyboard: false});
        $("#addModal").modal("show");
    })
}

///删除所选配件
function deletePart(pId, stockNum) {
    if (stockNum > 0) {
        $.cmsUtil.alertDialog($("#main-container"), "配件数量大于0，不允许删除配件!");
        return;
    }
    ///alert("deletepart:"+pId);
    //弹出确认窗口
    $.cmsUtil.showConfirmDialog($("#main-container"), "确认删除此配件信息吗？", function (result) {
        if (result) {
            $.ajax({
                url: "/part/delete.ajax",
                ///async: false,
                dataType: 'json',
                data: {
                    pId: pId
                },
                type: "get",
                success: function (data) {
                    if (data.success) {
                        $.cmsUtil.alertDialog($("#main-container"), "删除配件信息成功", function () {
                            refreshPartList();
                        });
                        return;
                    } else {
                        $.cmsUtil.alertDialog($("#main-container"), "删除配件信息失败");
                    }
                }
            });
        }
    });
}
function photoClick(pId, fId, fName) {
    ///alert("pId="+pId+",fileid="+fId);
    $(".photo-body").empty();
    $(".photo-body").load('/part/photo.html?pId=' + pId + '&fId=' + fId + '&fName=' + fName, function () {

        $("#photoModal").modal({backdrop: 'static', keyboard: false});
        $("#photoModal").modal("show");
    })
}
function keyEvent(e) {
    var code = e.keyCode;
    if (code == 13) {//回车键
        refreshPartList();
    }
}