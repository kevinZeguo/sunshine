<%--
  Created by IntelliJ IDEA.
  User: mazeguo
  Date: 2017/5/30
  Time: 17:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8"/>
    <title>客户管理</title>
    <meta name="description" content="Dynamic tables and grids using jqGrid plugin"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <jsp:include page="/context/common.jsp"/>
</head>

<body class="no-skin" style="overflow-y: hidden;padding-top: 10px !important;">
<!-- /section:basics/navbar.layout -->
<div class="main-container" id="main-container">
    <script type="text/javascript">
        try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
        }
    </script>
    <!-- /section:basics/sidebar -->
    <!-- /section:basics/content.breadcrumbs -->
    <div class="page-content" style="padding-top: 0px !important;">
        <!-- /section:settings.box -->
        <div class="page-content-area">
            <div class="row">
                <div class="col-xs-12">
                    <!-- PAGE CONTENT BEGINS -->
                    <div class="well well-sm" style="height: 100px !important;">
                        <form class="form-horizontal" >
                            <div class="row">

                                <div class="form-group col-xs-4">
                                    <label class="col-xs-4 control-label no-padding-right" for="eModelQ"> 设备机型：</label>

                                    <div class="col-xs-8">
                                        <input type="text" id="eModelQ" name="eModelQ" placeholder="输入设备机型"
                                               class="col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group col-xs-4">
                                    <label class="col-xs-4 control-label no-padding-right" for="makeNumQ"> 制造号码</label>

                                    <div class="col-xs-8">
                                        <input type="text" id="makeNumQ" name="makeNumQ" placeholder="请输入制造号码"
                                               class="col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group col-xs-4">
                                    <label class="col-xs-4 control-label no-padding-right" for="hostNumQ"> 主机号码：</label>

                                    <div class="col-xs-8">
                                        <input type="text" id="hostNumQ" name="hostNumQ" placeholder="输入主机号码"
                                               class="col-xs-12">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-xs-4">
                                    <label class="col-xs-4 control-label no-padding-right" for="cNameQ"> 客户名称：</label>

                                    <div class="col-xs-8">
                                        <input type="text" id="cNameQ" name="cNameQ" placeholder="输入客户名称"
                                               class="col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group col-xs-8 align-right">
                                    <button class="btn btn-sm btn-info" type="button" id="queryBtn">查询</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div>
                        <%--<button class="btn btn-sm btn-info" id="queryBtn">查询</button>--%>
                        <button class="btn btn-sm btn-success" id="add" data-toggle="modal"
                                data-target="#addModal">新增
                        </button>
                        <button class="btn btn-sm btn-success" id="addBatch" data-toggle="modal"
                                data-target="#addBatchModal">批量导入
                        </button>
                    </div>

                    <table id="grid-table"></table>
                    <div id="grid-pager"></div>
                    <!-- PAGE CONTENT ENDS -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.page-content-area -->
    </div>
    <!-- /.page-content -->
</div>
<!-- /.main-container -->


<%--<jsp:include page="/context/list_js.jsp"/>--%>
<script src="/plug-in/fusheng/customer/listcustomer.js"></script>
<script src="/plug-in/fusheng/device/list.js"></script>
</body>
</html>

<!--addModal-->
<div class="modal fade cms-modal" id="addModal" role="dialog" aria-hidden="true" data-backdrop="static"   style="overflow-y: auto">
    <div class="modal-body" id="addDeviceModal">
    </div>
</div>

<body>
<!--addModal-->
<div class="modal fade cms-modal" id="addBatchModal" role="dialog" aria-hidden="true" data-backdrop="static"
     style="overflow-y: hidden">
    <div class="modal-body batch-customer-body">
        <form class="form-horizontal" id="customerBatchForm" role="form" enctype="multipart/form-data">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true" style="font-size: 22px">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">批量导入设备信息</h4>
            </div>
            <div class="modal-body" id="addBatchDeviceModal">
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="bCustomerId">* 客户信息:</label>

                    <div class="col-xs-8">
                        <input type="text" id="bCustomerId" name="bCustomerId"
                               class="col-xs-11 ui-autocomplete-input"
                               placeholder="请选择客户"/>
                    </div>
                </div>
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="xlsxFile">* 选择数据文件:</label>

                    <div class="col-xs-8">
                        <p class="upload-file col-xs-11">
                            <span class="file-content">请选择文件</span>
                            <span class="btn btn-white btn-default"><input type="file" id="xlsxFile"
                                                                           name="xlsxFile"><span
                                    id="xlsxFileInfo">选择文件</span></span>
                        </p>
                        <%--<input type="text" id="customerExcel" name="customerExcel"--%>
                        <%--class="col-xs-11 ui-autocomplete-input"--%>
                        <%--placeholder="请选择数据文件"/>--%>
                    </div>
                    <div class="col-xs-12  text-center">
                        <p><span style="color: red" id="xlsxFileTips"></span></p>
                    </div>
                </div>
                <div class="form-group col-xs-12 text-center">
                    <p>示例文件:<a href="/file/downtemplate.html?fileName=devicetmp.xlsx" target="_self">批量导入样本文件</a>
                    </p>
                </div>
            </div>
            <div class="form-group col-xs-12 text-center">
                <button class="btn btn-sm btn-primary" type="button" id="save-batch-btn" name="save-batch-btn">
                    <i class="ace-icon fa fa-check bigger-110"></i>
                    导入
                </button>
                &nbsp; &nbsp; &nbsp;
                <button class="btn btn-white btn-info " type="button" id="addBatch-closeModal">
                    <i class="ace-icon fa fa-undo bigger-110"></i>
                    关闭
                </button>
            </div>
        </form>
    </div>
</div>
</body>

