<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<script src="/plug-in/fusheng/customer/add.js"></script>

<form id="applyAddForm" class="form-horizontal" role="form"
      data-validator-option="{theme:'yellow_right_effect',stopOnError:true, ignore: '.ignored'}">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">编辑客户信息</h4>
    </div>
    <div class="modal-body">
        <fieldset>
            <input type="hidden" id="cId" name="cId" value="${customer.cId}">

            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="cName">* 客户名称:</label>

                <div class="col-xs-6">
                    <input type="text" id="cName" name="cName" value="${customer.cName}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入客户名称"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="address"> * 详细地址:</label>

                <div class="col-xs-6">
                    <input type="text" id="address" name="address" value="${customer.address}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入详细地址"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="contact"><a class="red">*</a> 联系人:</label>

                <div class="col-xs-6">
                    <input type="text" id="contact" name="contact" value="${customer.contact}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入联系人"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="phone">* 联系电话:</label>

                <div class="col-xs-6">
                    <input type="text" id="phone" name="phone" value="${customer.phone}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入联系电话"/>
                </div>
            </div>

            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="payAcct">* 付款账号:</label>

                <div class="col-xs-6">
                    <input type="text" id="payAcct" name="payAcct" value="${customer.payAcct}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入付款账号"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="taxNum">* 税号:</label>

                <div class="col-xs-6">
                    <input type="text" id="taxNum" name="taxNum" value="${customer.taxNum}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入税号"/>
                </div>
            </div>

            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="serviceEngineer">* 服务工程师:</label>

                <div class="col-xs-6">
                    <input type="text" id="serviceEngineer" value="${customer.serviceEngineer}" name="serviceEngineer"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请选择服务工程师"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="fax">传真:</label>

                <div class="col-xs-6">
                    <input type="text" id="fax" name="fax" value="${customer.fax}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入传真"/>
                </div>
            </div>
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="payAcct">邮编:</label>

                <div class="col-xs-6">
                    <input type="text" id="postCode" name="postCode" value="${customer.postCode}"
                           class="col-xs-12 ui-autocomplete-input"
                           placeholder="请输入邮编"/>
                </div>
            </div>
        </fieldset>

    </div>
</form>

<div class="modal-footer">
    <button class="btn btn-sm btn-primary" type="button" id="submit-btn" name="submit-btn">
        <i class="ace-icon fa fa-check bigger-110"></i>
        保存
    </button>
    &nbsp; &nbsp; &nbsp;
    <button class="btn btn-white btn-info " type="button" id="closeModal">
        <i class="ace-icon fa fa-undo bigger-110"></i>
        关闭
    </button>
</div>


<%--<form class="form-horizontal" id="customerForm" role="form">--%>


<%--<div class="form-group col-xs-12 text-center" style="margin-top: 20px">--%>

<%--</div>--%>

<%--</form>--%>

<%--</div>--%>

<%--</div>--%>

<%--</body>--%>
