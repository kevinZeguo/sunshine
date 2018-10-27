<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>合同管理-详情页面</title>
    <jsp:include page="/context/common.jsp"/>
    <script src="/plug-in/fusheng/contract/info.js"></script>
</head>
<body class="no-skin">
<!-- /section:basics/navbar.layout -->
<div class="main-container" id="main-container">
    <script type="text/javascript">
        try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
        }
    </script>

    <!-- /section:basics/sidebar -->
    <div class="main-content">
        <!-- #section:basics/content.breadcrumbs -->
        <div class="breadcrumbs" id="breadcrumbs" style="font-size: 20px;">
            <script type="text/javascript">
                try {
                    ace.settings.check('breadcrumbs', 'fixed')
                } catch (e) {
                }
            </script>

            <ul class="breadcrumb">
                <li>
                    <i class="ace-icon fa fa-home home-icon"></i>
                    <a href="#">合同管理</a>
                </li>

                <li>
                    <a href="#">详情</a>
                </li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <!-- /section:basics/content.breadcrumbs -->
        <div class="page-content">
            <!-- #section:settings.box -->
            <div class="page-wrap">
                <form class="form-horizontal form-inline" id="data-form">
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5  control-label"> 客户编码:
                        </label>

                        <div class="col-xs-7">
                            <span id="cCode">${customer.cCode}</span>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5  control-label"> 客户名称:
                        </label>

                        <div class="col-xs-7">
                            <span id="cName">${customer.cName}</span>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5 control-label"> 详细地址:
                        </label>

                        <div class="col-xs-7">
                            <span id="address">${customer.address}</span>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5 control-label"> 联系人:
                        </label>

                        <div class="col-xs-7">
                            <span id="contact">${customer.contact}</span>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5 control-label"> 联系电话:
                        </label>

                        <div class="col-xs-7">
                            <span id="phone">${customer.phone}</span>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5 control-label"> 付款账号:
                        </label>

                        <div class="col-xs-7">
                            <span id="payAcct">${customer.payAcct}</span>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5 control-label"> 税号:
                        </label>

                        <div class="col-xs-7">
                            <span id="taxNum">${customer.taxNum}</span>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5 control-label"> 服务工程师:
                        </label>

                        <div class="col-xs-7">
                            <span id="serviceEngineerName">${customer.serviceEngineerName}</span>
                        </div>
                    </div>

                    <div class="form-group col-xs-6">
                        <label class="col-xs-5 control-label"> 传真:
                        </label>

                        <div class="col-xs-7">
                            <span id="fax">${customer.fax}</span>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <label class="col-xs-5 control-label"> 服务工程师:
                        </label>

                        <div class="col-xs-7">
                            <span id="postCode">${customer.postCode}</span>
                        </div>
                    </div>

                </form>
            </div>


            <div class="row col-xs-12" style="margin-top: 10px">
                <div class="tabbable">
                    <ul class="nav nav-tabs" id="myTab">
                        <li class="active toggle-component">
                            <a data-toggle="tab" href="#equipmentDiv" id="toggle-equipment">
                                <i class="green ace-icon fa fa-home bigger-120"></i>
                                设备信息
                            </a>
                        </li>
                        <li class=" toggle-component">
                            <a data-toggle="tab" href="#partsDiv" id="toggle-parts">
                                配件更换记录
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div id="equipmentDiv" class="tab-pane fade in active">
                            <div style="margin-top: 5px;">
                                <%--<button class="btn btn-sm btn-info" id="queryBtn">查询</button>--%>
                                <button class="btn btn-sm btn-success" id="addDe" data-toggle="modal"
                                        data-target="#addModalDe">新增
                                </button>
                                <button class="btn btn-sm btn-success" id="addBatchDe">批量导入</button>
                            </div>
                            <table id="grid-table"></table>
                            <div id="grid-pager"></div>
                            <script src="/plug-in/fusheng/device/list.js"></script>
                        </div>

                        <div id="partsDiv" class="tab-pane fade">
                            <table id="parts-grid-table"></table>
                            <div id="parts-grid-pager"></div>
                            <%--<table id="parts-grid-table"></table>--%>
                            <%--<div id="parts-grid-pager"></div>--%>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- /.page-content -->
    </div>
    <!-- /.main-content -->

    <div class="footer">
        <div class="footer-inner">
            <!-- #section:basics/footer -->
            <div class="footer-content">

            </div>

            <!-- /section:basics/footer -->
        </div>
    </div>
</div>
<!-- /.main-container -->

</body>
</html>
