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
    <title>用户编辑</title>
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
                >> 用户新增
            </small>
        </h5>
    </div>
    <!-- /section:basics/content.breadcrumbs -->
    <div class="page-content">
        <!-- /section:settings.box -->
        <div class="page-content-area">
            <form class="form-horizontal" id="userForm" role="form">
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" for="userName">用户账号:</label>

                    <div class="col-xs-5">
                        <input type="text" id="userName" name="userName" class="form-control" placeholder="请输入用户账号"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" for="realName">用户名称:</label>

                    <div class="col-xs-5">
                        <input type="text" class="form-control" placeholder="请输入用户真实名称" id="realName" name="realName"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" for="password">密码: </label>

                    <div class="col-xs-5">
                        <input type="text" class="form-control" placeholder="请输入用户密码" id="password" name="password"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" for="confirm_password">重复密码: </label>

                    <div class="col-xs-5">
                        <input type="text" class="form-control" placeholder="请输入重复密码" id="confirm_password"
                               name="confirm_password"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" for="departId">组织机构: </label>

                    <div class="col-xs-5">
                        <input type="text" class="form-control" placeholder="请先选择组织机构" id="departId" name="departId"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" for="telphone">手机号码: </label>

                    <div class="col-xs-5">
                        <input type="text" class="form-control" placeholder="请输入手机号码" id="telphone" name="telphone"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" for="phone">办公电话: </label>

                    <div class="col-xs-5">
                        <input type="text" class="form-control" placeholder="请输入用户手机号" id="phone" name="phone"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label no-padding-right" for="email">常用邮箱: </label>

                    <div class="col-xs-5">
                        <input type="text" class="form-control" placeholder="请输入邮箱" id="email" name="email"/>
                    </div>
                </div>
                <div class="clearfix form-actions">
                    <div class="col-md-offset-3 col-md-9">
                        <button class="btn btn-sm btn-primary" type="submit" id="submit-btn" name="submit-btn">
                            <i class="ace-icon fa fa-check bigger-110"></i>
                            提交
                        </button>
                        &nbsp; &nbsp; &nbsp;
                        <button class="btn btn-white btn-info " type="reset" id="reback"
                                onclick="javascript:window.history.back(-1);">
                            <i class="ace-icon fa fa-undo bigger-110"></i>
                            返回
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<jsp:include page="/context/common_js.jsp"/>
<script src="/plug-in/sys/user/add.js"></script>
</body>
</html>
