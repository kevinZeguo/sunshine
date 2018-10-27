<%--
  Created by IntelliJ IDEA.
  User: mazeguo
  Date: 2017/5/31
  Time: 0:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户详情</title>
    <jsp:include page="/context/common_css.jsp"/>
</head>
<body class="no-skin" style="overflow-y: hidden">
<div class="main-container" id="main-container">
    <script type="text/javascript">
        try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
        }
    </script>
    <!-- /section:basics/sidebar -->
    <div class="page-header">
        <h5>用户管理
            <small style="color: #6495ED">
                <i class="ace-icon fa fa-angle-double-right"></i>
                >> 用户详情
            </small>
        </h5>
    </div>
    <!-- /section:basics/content.breadcrumbs -->
    <div class="page-content">
        <!-- /section:settings.box -->
        <div class="page-content-area">
            <form class="form-horizontal" role="form" action="/user/save.ajax">
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right">用户账号:</label>

                    <div class="col-xs-5">
                        <span id="userName">${user.userName}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right">用户名称:</label>

                    <div class="col-xs-5">
                        <span>${user.realName}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" >组织机构: </label>

                    <div class="col-xs-5">
                        <span>${user.departName}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" >手机号码: </label>

                    <div class="col-xs-5">
                        <span>${user.telphone}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" >办公电话: </label>

                    <div class="col-xs-5">
                        <span>${user.phone}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" >常用邮箱: </label>

                    <div class="col-xs-5">
                        <span>${user.email}</span>
                    </div>
                </div>
                <div class="clearfix form-actions">
                    <div class="col-md-offset-3 col-md-9">
                        <button class="btn btn-sm btn-primary" type="button" id="editUser">
                            <i class="ace-icon fa fa-check bigger-110"></i>
                            编辑
                        </button>
                        &nbsp; &nbsp; &nbsp;
                        <button class="btn btn-white btn-info " type="reset" id="reback" onclick="javascript:window.history.back(-1);">
                            <i class="ace-icon fa fa-undo bigger-110"></i>
                            返回
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
