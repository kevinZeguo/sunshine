<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@include file="/context/mytags.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>北京精通复盛机械有限公司</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="/plug-in/jquery/jquery.contextmenu.css"/>
    <link rel="shortcut icon" href="images/favicon.ico">
    <!-- basic styles -->
    <link href="/plug-in/ace/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="/plug-in/ace/assets/css/font-awesome.min.css"/>

    <!--[if IE 7]>
    <link rel="stylesheet" href="/plug-in/ace/assets/css/font-awesome-ie7.min.css"/>
    <![endif]-->
    <!-- page specific plugin styles -->
    <!-- fonts -->
    <!--  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />  -->
    <!-- ace styles -->

    <link rel="stylesheet" href="/plug-in/ace/assets/css/ace.min.css"/>
    <link rel="stylesheet" href="/plug-in/ace/assets/css/ace-rtl.min.css"/>
    <link rel="stylesheet" href="/plug-in/ace/assets/css/ace-skins.min.css"/>

    <!--[if lte IE 8]>
    <link rel="stylesheet" href="/plug-in/ace/assets/css/ace-ie.min.css"/>
    <![endif]-->

    <!-- inline styles related to this page -->
    <!-- ace settings handler -->
    <script src="/plug-in/ace/assets/js/ace-extra.min.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

    <!--[if lt IE 9]>
    <script src="/plug-in/ace/assets/js/html5shiv.js"></script>
    <script src="/plug-in/ace/assets/js/respond.min.js"></script>
    <![endif]-->
</head>

<body  style="">
<div class="navbar navbar-default" id="navbar">
    <script type="text/javascript">
        try {
            ace.settings.check('navbar', 'fixed')
        } catch (e) {
        }
    </script>

    <div class="navbar-container" id="navbar-container">
        <div class="navbar-header pull-left">
            <a href="#" class="navbar-brand">
                <small>
                    <i class="icon-leaf"></i>
                    北京精通复盛机械有限公司
                </small>
            </a><!-- /.brand -->
        </div>
        <!-- /.navbar-header -->
        <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ace-nav">
                <li class="purple">
                <li class="light-blue">
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle" onclick="bindFrameClick()">
                        <img class="nav-user-photo" src="/plug-in/ace/avatars/avatar2.png" alt="Jason's Photo"/>
								<span class="user-info">
									<small>${userName}</small>
				                    <span style="color: #666633">${roleName}</span>
								</span>
                        <i class="icon-caret-down"></i>
                    </a>

                    <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                        <%--<li>--%>
                            <%--<a href="changePwd.html">--%>
                                <%--<i class="icon-cog"></i>--%>
                                <%--修改密码--%>
                            <%--</a>--%>
                        <%--</li>--%>

                        <%--<li>--%>
                            <%--<a href="#">--%>
                                <%--<i class="icon-user"></i>--%>
                                <%--个人信息--%>
                            <%--</a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="#">--%>
                                <%--<i class="icon-cog"></i>--%>
                                <%--清空缓存--%>
                            <%--</a>--%>
                        <%--</li>--%>

                        <li class="divider"></li>

                        <li>
                            <a href="javascript:logout()">
                                <i class="icon-off"></i>退出

                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- /.ace-nav -->
        </div>
        <!-- /.navbar-header -->
    </div>
    <!-- /.container -->
</div>

<div class="main-container" id="main-container">
    <script type="text/javascript">
        try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
        }
    </script>
    <div class="main-container-inner">
        <a class="menu-toggler" id="menu-toggler" href="#">
            <span class="menu-text"></span>
        </a>

        <div class="sidebar" id="sidebar">
            <script type="text/javascript">
                try {
                    ace.settings.check('sidebar', 'fixed')
                } catch (e) {
                }
            </script>

            <div class="sidebar-shortcuts" id="sidebar-shortcuts">
                <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
                    <button class="btn btn-success">
                        <i class="icon-signal"></i>
                    </button>

                    <button class="btn btn-info">
                        <i class="icon-pencil"></i>
                    </button>

                    <button class="btn btn-warning">
                        <i class="icon-group"></i>
                    </button>

                    <button class="btn btn-danger">
                        <i class="icon-cogs"></i>
                    </button>
                </div>

                <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
                    <span class="btn btn-success"></span>

                    <span class="btn btn-info"></span>

                    <span class="btn btn-warning"></span>

                    <span class="btn btn-danger"></span>
                </div>
            </div>
            <!-- #sidebar-shortcuts -->

            <ul class="nav nav-list">
                <li class="active">
                    <a href="##">
                        <i class="icon-dashboard"></i>
                        <span class="menu-text"> 首页 </span>
                    </a>
                </li>
                <t:menu menuFun="${menuMap}"></t:menu>
            </ul>
            <!-- /.nav-list -->
            <div class="sidebar-collapse" id="sidebar-collapse">
                <i class="icon-double-angle-left" data-icon1="icon-double-angle-left"
                   data-icon2="icon-double-angle-right"></i>
            </div>

            <script type="text/javascript">
                try {
                    ace.settings.check('sidebar', 'collapsed')
                } catch (e) {
                }
            </script>
        </div>

        <div class="main-content">
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12" style="width: 99%;padding-left:2px;padding-right: 2px;" id="tabs">
                        <ul class="nav nav-tabs" role="tablist">
                            <!-- <li class="active"><a href="#Index" role="tab" data-toggle="tab">首页</a></li> -->
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="Index">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.page-content -->
        </div>
        <!-- /.main-content -->

        <div class="ace-settings-container" id="ace-settings-container">
            <div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
                <i class="icon-cog bigger-150"></i>
            </div>

            <div class="ace-settings-box" id="ace-settings-box">
                <div>
                    <div class="pull-left">
                        <select id="skin-colorpicker" class="hide">
                            <option data-skin="default" value="#438EB9">#438EB9</option>
                            <option data-skin="skin-1" value="#222A2D">#222A2D</option>
                            <option data-skin="skin-2" value="#C6487E">#C6487E</option>
                            <option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
                        </select>
                    </div>
                    <span>&nbsp; 选择皮肤</span>
                </div>
                <div>
                    <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-navbar"/>
                    <label class="lbl" for="ace-settings-navbar"> 固定导航条</label>
                </div>

                <div>
                    <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-sidebar"/>
                    <label class="lbl" for="ace-settings-sidebar"> 固定滑动条</label>
                </div>

                <div>
                    <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-breadcrumbs"/>
                    <label class="lbl" for="ace-settings-breadcrumbs">固定面包屑</label>
                </div>

                <div>
                    <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-rtl"/>
                    <label class="lbl" for="ace-settings-rtl">切换到左边</label>
                </div>

                <div>
                    <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-add-container"/>
                    <label class="lbl" for="ace-settings-add-container">
                        切换窄屏
                        <b></b>
                    </label>
                </div>
            </div>
        </div>
        <!-- /#ace-settings-container -->
    </div>
    <!-- /.main-container-inner -->

    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="icon-double-angle-up icon-only bigger-110"></i>
    </a>
</div>
<!-- /.main-container -->
<!--修改密码-->
<div id="changepassword" style="display:none">
    <input id="id" type="hidden" value="${user.id }">
    <table style="width: 550px" cellpadding="0" cellspacing="1" class="formtable">
        <tbody>
        <tr>
            <td align="right" width="20%"><span class="filedzt">原密码:</span></td>
            <td class="value"><input id="password" type="password" value="" name="password" class="inputxt" datatype="*"
                                     errormsg="请输入原密码"/> <span class="Validform_checktip"> 请输入原密码 </span></td>
        </tr>
        <tr>
            <td align="right"><span class="filedzt">新密码:</span></td>
            <td class="value"><input type="password" value="" name="newpassword" class="inputxt"
                                     plugin="passwordStrength" datatype="*6-18" errormsg="密码至少6个字符,最多18个字符！"/> <span
                    class="Validform_checktip"> 密码至少6个字符,最多18个字符！ </span> <span class="passwordStrength"
                                                                                style="display: none;"> <b>密码强度：</b> <span>弱</span><span>中</span><span
                    class="last">强</span> </span></td>
        </tr>
        <tr>
            <td align="right"><span class="filedzt">重复密码:</span></td>
            <td class="value"><input id="newpassword" type="password" recheck="newpassword" datatype="*6-18"
                                     errormsg="两次输入的密码不一致！"> <span class="Validform_checktip"></span></td>
        </tr>
        </tbody>
    </table>
</div>
<!-- basic scripts -->
<script type="text/javascript">
    window.jQuery || document.write("<script src='/plug-in/ace/assets/js/jquery-2.0.3.min.js'>" + "<" + "script>");
</script>

<!--[if IE]>
<script type="text/javascript">
    window.jQuery || document.write("<script src='/plug-in/ace/assets/js/jquery-1.10.2.min.js'>" + "<" + "script>");
</script>
<![endif]-->

<script type="text/javascript">
    if ("ontouchend" in document) document.write("<script src='/plug-in/ace/assets/js/jquery.mobile.custom.min.js'>" + "<" + "script>");
</script>
<script src="/plug-in/ace/assets/js/jquery-ui-1.10.3.custom.min.js"></script>
<script src="/plug-in/ace/assets/js/bootstrap.min.js"></script>
<script src="/plug-in/ace/assets/js/typeahead-bs2.min.js"></script>

<!-- page specific plugin scripts -->

<!--[if lte IE 8]>
<script src="/plug-in/ace/assets/js/excanvas.min.js"></script>
<![endif]-->
<!-- ace scripts -->
<%--<t:base type="tools"></t:base>--%>
<script src="/plug-in/jquery-plugs/storage/jquery.storageapi.min.js"></script>
<script src="/plug-in/ace/assets/js/ace-elements.min.js"></script>
<script src="/plug-in/ace/assets/js/ace.min.js"></script>
<script type="text/javascript" src="/plug-in/ace/assets/js/bootstrap-tab.js"></script>
<script src="/plug-in/jquery/jquery.contextmenu.js"></script>
<script src="/plug-in/layer/layer.js"></script>
<script src="/plug-in/cms/cmsUtil.js"></script>
<script src="/plug-in/sys/main.js"></script>
</body>
</html>

