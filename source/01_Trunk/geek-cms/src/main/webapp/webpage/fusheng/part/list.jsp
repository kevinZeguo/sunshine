<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8"/>
    <title>配件管理</title>
    <meta name="description" content="Dynamic tables and grids using jqGrid plugin"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <jsp:include page="/context/common.jsp"/>
</head>
<body class="no-skin" style="overflow-y: hidden;padding-top: 10px !important;">
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
                    <div class="well well-sm" style="height: 120px !important;">
                        <form class="form-horizontal">
                            <div class="row">

                                <div class="form-group col-xs-4">
                                    <label class="col-xs-4 control-label no-padding-right" for="querypCode">配件编号：</label>
                                    <div class="col-xs-8">
                                        <input type="text" id="querypCode" name="querypCode" placeholder="输入配件编号"
                                               class="col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group col-xs-4">
                                    <label class="col-xs-4 control-label no-padding-right" for="querypName">配件名称: </label>

                                    <div class="col-xs-8">
                                        <input type="text" id="querypName" name="querypName" placeholder="输入配件名称"
                                               class="col-xs-12">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                            	<div class="form-group col-xs-4">
                                    <label class="col-xs-4 control-label no-padding-right" for="querypPrice">配件价格：</label>

                                    <div class="col-xs-8">
                                        <input type="text" id="querypPrice" name="querypPrice" placeholder="输入配件价格"
                                               class="col-xs-12">
                                    </div>
                                </div>
	                             <div class="form-group col-xs-4 align-right">
	                                 <button class="btn btn-sm btn-info" type="button" id="queryBtn">查询</button>
	                             </div>                                
                            </div> 
                        </form>
                    </div>

                    <div>
                        <%--<button class="btn btn-sm btn-info" id="queryBtn">查询</button>--%>
                        <button class="btn btn-sm btn-success" id="addPart" data-toggle="modal"
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

<script src="/plug-in/fusheng/part/list.js"></script>
</body>
</html>
<!--addModal-->
<div class="modal fade cms-modal" id="addModal" role="dialog" aria-hidden="true" data-backdrop="static"
     style="overflow-y: hidden">
    <div class="modal-body customer-body">
    </div>
</div>