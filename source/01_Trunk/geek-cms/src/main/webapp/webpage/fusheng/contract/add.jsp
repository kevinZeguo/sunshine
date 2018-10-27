<%-- 
  User: zhangyongquan
  Time: 2017/6/20 21:42
 --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>合同编辑</title>
    <jsp:include page="/context/common.jsp"/>
    <style>
        body {
            font-family: 微软雅黑, 宋体, Arial, sans-serif;
        }
    </style>
</head>
<body>
<form class="form-horizontal" id="contractForm" role="form">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true" style="font-size: 22px">×</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">编辑合同信息</h4>
    </div>
    <c:if  test  ="${add eq 'edit'}">
    	<input type="hidden" id="id" name="id" value="${contract.id}">  
    </c:if>
    <div class="modal-body">
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="cId">客户名称:</label>
		 			<c:if  test  ="${add eq 'add'}">  
			            <div class="col-xs-8">
			                <input type="text" id="cId" name="cId"
			                       class="col-xs-11 ui-autocomplete-input"
			                       placeholder="请选择客户"/>
			            </div>			
					</c:if>
					<c:if  test  ="${add eq 'edit'}">  
			            <div class="col-xs-8">
			                <input type="text"  name="cId" disabled="disabled" value="${contract.cName}"
			                       class="col-xs-11 ui-autocomplete-input"
			                       placeholder="请选择客户"/>
			            </div>			
					</c:if>                                       
                </div>
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="aCode">合同编号(甲方):</label>
                    <div class="col-xs-8">
                        <input type="text" id="aCode" name="aCode" value="${contract.aCode }" class="col-xs-11 ui-autocomplete-input" placeholder="请输入合同编号"/>
                    </div>
                </div>
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="bCode">合同编号(乙方):</label>
                    <div class="col-xs-8">
                        <input type="text" id="bCode" name="bCode" value="${contract.bCode }" class="col-xs-11 ui-autocomplete-input" placeholder="请输入合同编号"/>
                    </div>
                </div> 
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="type"> 合同类型:</label>
                    <div class="col-xs-8">
                        <select id="type" name="type" class="col-xs-11">
                        	<option value="" <c:if test="${contract.type == '-1'}">selected</c:if>>--请选择--</option>
                        	<option value="0" <c:if test="${contract.type == '0'}">selected</c:if>>销售合同</option>
                        	<option value="1" <c:if test="${contract.type == '1'}">selected</c:if>>采购合同</option>
                        </select>
                    </div>
                </div> 
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="price">价格:</label>
                    <div class="col-xs-8">
                        <input type="text" id="price" name="price" value="${contract.price}" class="col-xs-11 ui-autocomplete-input" placeholder="请输入价格" onkeyup="value=value.replace(/[^\d.]/g,'')"/>
                    </div>
                </div> 
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="isCashBack"> 是否已回款:</label>
                    <div id="addIsCashBack" class="col-xs-8">
                        <c:if  test  ="${add eq 'add'}">  
							<label class="col-xs-4"><input type="radio" id="unBacked" name="isCashBack" value="0" checked="checked" />否</label>&nbsp;&nbsp;&nbsp;&nbsp;
							<label class="col-xs-4"><input type="radio" id="Backed" name="isCashBack" value="1" />是</label>
	                   	</c:if>
	                   	<c:if  test  ="${add eq 'edit'}">  
	 						<label class="col-xs-4"><input type="radio" id="unBacked" name="isCashBack" value="0" <c:if test="${contract.isCashBack=='0' }"> checked="checked"</c:if> />否</label>&nbsp;&nbsp;&nbsp;&nbsp;
							<label class="col-xs-4"><input type="radio" id="Backed" name="isCashBack" value="1" <c:if test="${contract.isCashBack=='1' }"> checked="checked"</c:if> />是</label>              			
               			</c:if>
						<!-- <label class="col-xs-4"><input type="radio" id="unBacked" name="isCashBack" value="0" checked="checked" />否</label>&nbsp;&nbsp;&nbsp;&nbsp; -->
						<!-- <label class="col-xs-4"><input type="radio" id="Backed" name="isCashBack" value="1" />是</label> -->
                    </div>
                </div>                
                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="isSendGoods"> 是否发货:</label>
                    
                    <div id="addIsSendGoods" class="col-xs-8">
	                    <c:if  test  ="${add eq 'add'}">  
	 						<label class="col-xs-4"><input type="radio" id="isSendGoods1" name="isSendGoods" value="0" checked="checked"/>否</label>&nbsp;&nbsp;&nbsp;&nbsp;
							<label class="col-xs-4"><input type="radio" id="isSendGoods2" name="isSendGoods" value="1" />是</label>                   
	                    </c:if>
               			<c:if  test  ="${add eq 'edit'}">  
	 						<label class="col-xs-4"><input type="radio" id="isSendGoods1" name="isSendGoods" value="0" <c:if test="${contract.isSendGoods=='0' }"> checked="checked"</c:if> />否</label>&nbsp;&nbsp;&nbsp;&nbsp;
							<label class="col-xs-4"><input type="radio" id="isSendGoods2" name="isSendGoods" value="1" <c:if test="${contract.isSendGoods=='1' }"> checked="checked"</c:if> />是</label>              			
               			</c:if>
						<!-- <label class="col-xs-4"><input type="radio" id="rdoIsSendGoods" name="rdoIsSendGoods" value="0" <c:if test="${contract.isSendGoods=='0' }"> checked="checked"</c:if> />否</label>&nbsp;&nbsp;&nbsp;&nbsp; -->
						<!-- <label class="col-xs-4"><input type="radio" id="rdoIsSendGoods" name="rdoIsSendGoods" value="1" <c:if test="${contract.isSendGoods=='1' }"> checked="checked"</c:if> />是</label> -->
                    </div>
                </div> 

                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="isOpenInvoice"> 是否已开发票:</label>
                    <div id="addIsOpenInvoice" class="col-xs-8">              
                   		<c:if  test  ="${add eq 'add'}">  
							<label class="col-xs-4"><input type="radio" id="unOpened" name="isOpenInvoice" value="0" checked="checked" />否</label>&nbsp;&nbsp;&nbsp;&nbsp;
							<label class="col-xs-4"><input type="radio" id="Opened" name="isOpenInvoice" value="1" />是</label>
	                   	</c:if>
	                   	<c:if  test  ="${add eq 'edit'}">  
	 						<label class="col-xs-4"><input type="radio" id="unOpened" name="isOpenInvoice" value="0" <c:if test="${contract.isOpenInvoice=='0' }"> checked="checked"</c:if> />否</label>&nbsp;&nbsp;&nbsp;&nbsp;
							<label class="col-xs-4"><input type="radio" id="Opened" name="isOpenInvoice" value="1" <c:if test="${contract.isOpenInvoice=='1' }"> checked="checked"</c:if> />是</label>              			
               			</c:if>
						<!-- <label class="col-xs-4"><input type="radio" id="unOpened" name="isOpenInvoice" value="0" checked="checked" />否</label>&nbsp;&nbsp;&nbsp;&nbsp; -->
						<!-- <label class="col-xs-4"><input type="radio" id="Opened" name="isOpenInvoice" value="1" />是</label> -->
                    </div>
                </div> 

                <div class="form-group col-xs-12">
                    <label class="col-xs-4 control-label no-padding-right" for="upLoadFile">上传合同文件:</label>
                    <div id="divUpload" class="col-xs-8">
	                    <span>
	 						<input type="file" id="upLoadFile" name="upLoadFile" title="请选择文件" style="z-index:-1;opacity:0;filter:alpha(opacity=0);cursor: pointer;"/>                   
	                    	<a href="javascript:void(0);" style="position:absolute;top:0;z-index:99;cursor:pointer;">
	                    		<input type="text" id="inpUpload" class="form-control" readonly="readonly"  placeholder="请选择文件"/>
	                    	</a>
	                    </span>
                    </div>
                </div> 
    </div>
    <div class="col-xs-12 text-center">
        <button class="btn btn-sm btn-primary" type="submit" id="submit-btn" name="submit-btn">
            <i class="ace-icon fa fa-check bigger-110"></i>
            提交
        </button>
        &nbsp; &nbsp; &nbsp;
        <button class="btn btn-white btn-info " type="reset" id="closeModal">
            <i class="ace-icon fa fa-undo bigger-110"></i>
            关闭
        </button>
    </div>
</form>
<script src="/plug-in/fusheng/customer/listcustomer.js"></script>
<script src="/plug-in/fusheng/contract/add.js"></script>
</body>
</html>