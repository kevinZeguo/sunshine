<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>配件编辑</title>
    <script src="/plug-in/fusheng/part/add.js"></script>
</head>
<body>
<div class="form-page-content">
    <div class="page-content-area">
        <div class="page-header">
            <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true" style="font-size: 22px">×</span><span class="sr-only">Close</span></button>
            <h3>
               	 配件管理
                <small>
                    <i class="ace-icon fa fa-angle-double-right"></i>
                    >>编辑配件信息
                </small>
            </h3>
        </div>
        <form class="form-horizontal" id="partForm" role="form">

            <input type="hidden" id="pId" name="pId" value="${part.pId}">

            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="pCode"><a class="red">*</a> 配件编号:</label>

                <div class="col-xs-8">
                    <input type="text" id="pCode" name="pCode" value="${part.pCode}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入配件编号"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="pName"><a class="red">*</a> 配件名称:</label>

                <div class="col-xs-8">
                    <input type="text" id="pName" name="pName" value="${part.pName}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入配件名称"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="pPrice"><a class="red">*</a> 配件价格:</label>

                <div class="col-xs-8">
                    <input type="text" id="pPrice" name="pPrice" value="${part.pPrice}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入配件价格" onkeyup="value=value.replace(/[^\d.]/g,'')"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="pPic">上传照片:</label>

                <div class="col-xs-8">
                    <input type="file" id="pPic" name="pPic" value="${part.pPic}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入选择照片"/>
                </div>
            </div>

            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="note">备注:</label>

                <div class="col-xs-8">
                	<textarea id="note" name="note" rows="3" class="col-xs-12 form-control">${part.note }</textarea>
                    <!-- <input type="text" id="note" name="note" value="${part.note}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入备注"/> -->
                </div>
            </div>

            <div class="form-group col-xs-12 text-center" style="margin-top: 20px">
                <button class="btn btn-sm btn-primary" type="submit" id="submit-btn" name="submit-btn">
                    <i class="ace-icon fa fa-check bigger-110"></i>
                    提交
                </button>

                &nbsp; &nbsp; &nbsp;
                <button class="btn btn-white btn-info " type="button" id="closeModal">
                    <i class="ace-icon fa fa-undo bigger-110"></i>
                    关闭
                </button>
            </div>

        </form>

    </div>

</div>

</body>
</html>