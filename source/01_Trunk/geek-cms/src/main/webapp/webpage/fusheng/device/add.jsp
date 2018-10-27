<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>设备编辑</title>
    <script src="/plug-in/fusheng/customer/listcustomer.js"></script>
    <script src="/plug-in/fusheng/device/add.js"></script>
    <style>
        body {
            font-family: 微软雅黑, 宋体, Arial, sans-serif;
        }
    </style>
</head>
<body>
<form class="form-horizontal" id="deviceForm" role="form">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true" style="font-size: 22px">×</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">编辑设备信息</h4>
    </div>

    <c:if test="${add eq 'edit'}">
        <input type="hidden" id="eId" name="eId" value="${tbEquipment.eId}">
    </c:if>
    <div class="modal-body">
        <!--
            <div class="form-group col-xs-12">
                <label class="col-xs-4 control-label no-padding-right" for="eName">* 设备名称:</label>

                <div class="col-xs-8">
                    <input type="text" id="cName" name="eName" class="col-xs-11 ui-autocomplete-input"
                           placeholder="请输入设备名称"/>
                </div>
            </div>
         -->
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="eModel"> * 设备机型:</label>

            <div class="col-xs-8">
                <input type="text" id="eModel" name="eModel" class="col-xs-11 ui-autocomplete-input"
                       value="${tbEquipment.eModel}"
                       placeholder="设备机型"/>
            </div>
        </div>
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="motorBrand"><a class="red">*</a> 电机厂牌:</label>

            <div class="col-xs-8">
                <input type="text" id="motorBrand" name="motorBrand" class="col-xs-11 ui-autocomplete-input"
                       value="${tbEquipment.motorBrand}"
                       placeholder="电机厂牌"/>
            </div>
        </div>
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="customerId">* 客户:</label>
            <c:if test="${add eq 'add'}">
                <div class="col-xs-8">
                    <input type="text" id="customerId" name="customerId"
                           class="col-xs-11 ui-autocomplete-input"
                           placeholder="请选择客户"/>
                </div>
            </c:if>
            <c:if test="${add eq 'edit'}">
                <div class="col-xs-8">
                    <input type="text" name="customerId" disabled="disabled" value="${tbEquipment.cName}"
                           class="col-xs-11 ui-autocomplete-input"
                           placeholder="请选择客户"/>
                </div>
            </c:if>
        </div>
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="hostNum">* 现主机号码:</label>

            <div class="col-xs-8">
                <input type="text" id="hostNum" name="hostNum" class="col-xs-11 ui-autocomplete-input"
                       value="${tbEquipment.hostNum}"
                       placeholder="现主机号码"/>
            </div>
        </div>
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="oldHostNum">* 原主机号码:</label>

            <div class="col-xs-8">
                <input type="text" id="oldHostNum" name="oldHostNum" class="col-xs-11 ui-autocomplete-input"
                       value="${tbEquipment.hostNum}"
                       placeholder="原主机号码"/>
            </div>
        </div>

        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="regularCheck">* 是否定期巡检:</label>
            <c:if test="${add eq 'add'}">
                <div class="col-xs-8">
                    <select id="regularCheckS">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                    <input type="hidden" id="regularCheck" name="regularCheck" value="0">
                </div>
            </c:if>

            <c:if test="${add eq 'edit'}">
                <div class="col-xs-8">
                    <select id="regularCheckS">
                        <option value="0">否</option>
                        <option value="1" selected="selected">是</option>
                    </select>
                    <script type="text/javascript">
                        $("#regularCheckS option[value='${tbEquipment.regularCheck}']").attr("selected", "selected");
                    </script>
                    <input type="hidden" id="regularCheck" name="regularCheck" value="${tbEquipment.regularCheck}">
                </div>
            </c:if>
        </div>
        <div class="form-group col-xs-12" id="checkMonthsDiv"
                <c:if test="${tbEquipment.regularCheck==0}">
                    style="display: none;"
                </c:if>
                >
            <label class="col-xs-4 control-label no-padding-right" for="checkMonths">* 巡检周期:</label>

            <div class="col-xs-8">
                <select id="checkMonthsS">
                    <option value="1">1个月</option>
                    <option value="2">2个月</option>
                    <option value="3">3个月</option>
                </select>
                <c:if test="${!empty tbEquipment.checkMonths}">
                    <script type="text/javascript">
                        $("#checkMonthsS option[value='${tbEquipment.checkMonths}']").attr("selected", "selected");
                    </script>
                </c:if>
                <input type="hidden" id="checkMonths" name="checkMonths" value="${tbEquipment.checkMonths}">
            </div>
        </div>

        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="ePic">* 照片:</label>

            <div class="col-xs-8">
                <input type="text" id="ePic" name="ePic" class="col-xs-11 ui-autocomplete-input"
                       placeholder="照片"/>
                <div id="uploadBar"></div>
            </div>
        </div>
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="makeNum">* 制造号码:</label>

            <div class="col-xs-8">
                <input type="text" id="makeNum" name="makeNum" class="col-xs-11 ui-autocomplete-input"
                       value="${tbEquipment.makeNum}"
                       placeholder="制造号码"/>
            </div>
        </div>

        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="elecPanModel">* 电控盘型号:</label>

            <div class="col-xs-8">
                <input type="text" id="elecPanModel" name="elecPanModel" class="col-xs-11 ui-autocomplete-input"
                       value="${tbEquipment.elecPanModel}"
                       placeholder="电控盘型号"/>
            </div>
        </div>

        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="motorMakeDate">* 电机制造日期:</label>

            <div class="col-xs-8">
                <input type="text" class="col-xs-11 ui-autocomplete-input" placeholder="请选择电机制造日期" id="motorMakeDate"
                       name="motorMakeDate" value="${tbEquipment.formatDate}"/>
            </div>
        </div>


        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="debugDate">* 电机调试日期:</label>

            <div class="col-xs-8">
                <input type="text" class="col-xs-11 ui-autocomplete-input" placeholder="请选择电机调试日期" id="debugDate"
                       name="debugDate" value="${tbEquipment.formatDebugDate}"/>
            </div>
        </div>
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="note">备注:</label>

            <div class="col-xs-8"> 
                <textarea id="note" name="note" class="col-xs-11 ui-autocomplete-input">
                    ${tbEquipment.note}
                </textarea>
            </div>
        </div>
        <!--
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="fax">传真:</label>

            <div class="col-xs-8">
                <input type="text" id="fax" name="fax" class="col-xs-11 ui-autocomplete-input"
                       placeholder="请输入传真"/>
            </div>
        </div>
        <div class="form-group col-xs-12">
            <label class="col-xs-4 control-label no-padding-right" for="payAcct">邮编:</label>

            <div class="col-xs-8">
                <input type="text" id="postCode" name="postCode" class="col-xs-11 ui-autocomplete-input"
                       placeholder="请输入邮编"/>
            </div>
        </div>
         -->
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
</body>
</html>
