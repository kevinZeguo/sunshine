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
    <title>用户管理</title>
    <meta name="description" content="Dynamic tables and grids using jqGrid plugin"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <jsp:include page="/context/common.jsp"/>
</head>

<body class="no-skin" style="overflow-y: hidden">
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
                    <div class="well well-sm" style="height: 50px !important;">
                        <form class="form-horizontal" action="###">
                            <div class="form-group col-xs-4">
                                <label class="col-xs-4 control-label no-padding-right" for="userName"> 用户账号 </label>
                                <div class="col-xs-8">
                                    <input type="text" id="userName" placeholder="输入用户账号" class="col-xs-12">
                                </div>
                            </div>
                            <div class="form-group col-xs-4">
                                <label class="col-xs-4 control-label no-padding-right" for="realName"> 用户名 </label>

                                <div class="col-xs-8">
                                    <input type="text" id="realName" placeholder="输入用户名" class="col-xs-12">
                                </div>
                            </div>
                            <div class="form-group col-xs-4 align-center">
                                <button class="btn btn-sm btn-info" id="queryBtn">查询</button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <%--<button class="btn btn-sm btn-info" id="queryBtn">查询</button>--%>
                        <button class="btn btn-sm btn-success" id="addUser">新增</button>
                        <%--<button class="btn btn-sm btn-success">Small</button>--%>
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

<jsp:include page="/context/list_js.jsp"/>
<script src="/plug-in/sys/user/list.js"></script>
</body>
</html>
