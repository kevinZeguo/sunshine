<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8"/>
    <title>合同管理</title>
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
    <div class="page-content">
        <!-- /section:settings.box -->
        <div class="page-content-area">

            <div class="row">
                <div class="col-xs-12">
                    <!-- PAGE CONTENT BEGINS -->
                    <div class="well well-sm" style="height: 150px !important;">
                        <form class="form-horizontal" action="###">
                        <div class="row">
                            <div class="form-group col-xs-4">
                                <label class="col-xs-4 control-label no-padding-right" for="contractCode"> 合同编号: </label>

                                <div class="col-xs-8">
                                    <input type="text" id="contractCode" placeholder="请输入合同编号" class="col-xs-12">
                                </div>
                            </div>
                            <div class="form-group col-xs-4">
                                <label class="col-xs-4 control-label no-padding-right" for="customerName"> 客户名称:</label>

                                <div class="col-xs-8">
                                    <input type="text" id="customerName" placeholder="请输入客户名称" class="col-xs-12">
                                </div>
                            </div>
                            <div class="form-group col-xs-4">
                                <label class="col-xs-4 control-label no-padding-right" for="isOpenInvoice"> 是否已开发票:</label>

                                <div class="col-xs-8">
                                    <select id="isOpenInvoice" name="isOpenInvoice" class="col-xs-12">
                                    	<option value="-1">--请选择--</option>
                                    	<option value="0">否</option>
                                    	<option value="1">是</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                            <div class="row">
                            <div class="form-group col-xs-4">
                                <label class="col-xs-4 control-label no-padding-right" for="isSendGoods"> 是否发货:</label>

                                <div class="col-xs-8">
                                    <select id="isSendGoods" class="col-xs-12">
                                    	<option value="-1">--请选择--</option>
                                     	<option value="0">否</option>                                   	
                                    	<option value="1">是</option>
                                    </select>
                                    <!-- <input type="text" id="customerName" placeholder="请输入客户名称" class="col-xs-12"> -->
                                </div>
                            </div>
                           	<div class="form-group col-xs-4">
                                <label class="col-xs-4 control-label no-padding-right" for="isCashBack"> 是否已回款:</label>

                                <div class="col-xs-8">
                                    <select id="isCashBack" class="col-xs-12">
                                    	<option value="-1">--请选择--</option>
                                    	<option value="0">否</option>                                    	
                                    	<option value="1">是</option>
                                    </select>
                                    <!-- <input type="text" id="customerName" placeholder="请输入客户名称" class="col-xs-12"> -->
                                </div>
                            </div>
                            <div class="form-group col-xs-4">
                                <label class="col-xs-4 control-label no-padding-right" for="queryContractType"> 合同类型:</label>

                                <div class="col-xs-8">
                                    <select id="queryContractType" class="col-xs-12">
                                    	<option value="-1">--请选择--</option>
                                    	<option value="0">销售合同</option>
                                    	<option value="1">采购合同</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                            <div class="row">
                             <div class="form-group col-xs-3 align-center" style="float:right">
                                <input type="button" class="btn btn-sm btn-info" id="queryBtn" value="查询" />
                            </div>                           
                            </div>

                        </form>
                    </div>

                    <div>
                        <%--<input type="button" class="btn btn-sm btn-success" id="addModel" value="新增" />--%>
                        <%--<button class="btn btn-sm btn-success">Small</button>--%>
                   		<button class="btn btn-sm btn-success" id="addContract" data-toggle="modal"
                                data-target="#addModal">新增
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

<%--<jsp:include page="/context/list_js.jsp"/> --%>
<script src="/plug-in/fusheng/customer/listcustomer.js"></script>
<script src="/plug-in/fusheng/contract/list.js"></script>
</body>
</html>

<!--addModal-->
<div class="modal fade cms-modal" id="addModal" tabindex="1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-body">
    </div>
</div>