//初始化 file工具类
function FileUtils($fileDiv, $fileIds, appType) {
    this.$fileDiv = $fileDiv;
    this.$fileIds = $fileIds;
    this.appType = appType;
}

//初始化 上传文件工具
FileUtils.prototype.initUploaderFile = function ($uploadSpan, $uploadButton, $progressBar, $upMsgDiv) {
    var $uploadSpan = $uploadSpan;
    var fileContainer = this.fileContainer;
    var fileIds = this.fileIds;
    var progressBar = this.progressBar;
    var fileBtn = this.fileBtn;
    var upMsg = this.upMsg;
    $(this.fileBtn).click(function () {
        $("#file").click();
    })

    //初始化已有的文件下载地址
    if (appType != null && appType != '' && 'undefined' != appType && appId != null && appId != '' && 'undefined' != appId) {
        this.initShowFile(appType, appId, true);
    }
    if (this.progressBar != null && this.progressBar != '') {
        $(this.progressBar).html("");
        $(this.progressBar).html($("#fileUploadProgress").html());
    }

    var bar = $('.bar');//进度条
    var percent = $('.percent');//获取上传百分比
    var showimg = $('.showimg');//显示图片的div
    var progress = $('.progress');//显示进度的div
    var files = $('.files');//文件上传控件的input元素
    var btn = $('.btn span'); //按钮文本


    //点击确定自动上传
    $("#file").change(function () {
        var files = $(this).prop('files');
        var selectedFile = files[0];
        var parts = selectedFile.name.split('.');
        var ext = parts[parts.length - 1];
        $(fileSpan).html(selectedFile.name);
        $(upMsg).html("文件上传中...");
        $(fileBtn).addClass("disabled");
        $("#fileUploadForm").ajaxSubmit({
            url: "/file/saveFile.ajax",
            dataType: 'json',//返回数据类型
            beforeSend: function () {
                showimg.empty();
                progress.show();
                var percentVal = '0%';
                bar.width(percentVal);
                percent.html(percentVal);
            },
            //更新进度条事件处理代码
            uploadProgress: function (event, position, total, percentComplete) {
                var percentVal = percentComplete + '%';
                bar.width(percentVal);
                percent.html(percentVal);
            },
            success: function (data) {//图片上传成功时
                $(fileBtn).removeClass("disabled");
                //获取服务器端返回的文件数据
                if (data.success) {
                    $(upMsg).html("上传成功!");
                    var file = data.obj;
                    var fileCon = '<div class="col-xs-12" id="dFile' + file.fileId + '" style="margin-top:5px;margin-left:-20px"><span class="col-xs-8"><a href="/file/downLoad.html?fileId=' + file.fileId + '">' + file.fileName + '</a></span><a href="#" class="col-xs-1 rm-btn" id="rm-btn' + file.fileId + '" fileId="' + file.fileId + '">x</a></div>';
                    $(fileContainer).append(fileCon);
                    var ids = $(fileIds).val();
                    if (ids != null && ids != '') {
                        ids += ",";
                    }
                    ids += data.obj.fileId;
                    $(fileIds).val(ids);

                    //文件id列表
                    //删除文件定义
                    $("#rm-btn" + file.fileId).bind("click", function () {
                        var fileId = $(this).attr("fileId");
                        $("#dFile" + fileId).remove();
                        var ids = $(fileIds).val();
                    });
                } else {
                    $(upMsg).html("上传失败!");
                }

                //alert(data.name + "," + data.pic + "," + data.size);
                //$(this.fileIdContainer).append("<a>asdfsdfsdfsdfsdfsdf</a>");
            },
            error: function (xhr) {
                $(upMsg).html("上传失败!");
                bar.width('0');
            }
        });
    })
}

//初始化 上传文件工具
FileUtils.prototype.initUploadImg = function (appType, appId, limitCount) {
    var fileSpan = this.fileSpan;
    var fileContainer = this.fileContainer;
    var fileIds = this.fileIds;
    var progressBar = this.progressBar;
    var fileBtn = this.fileBtn;
    var imgLimit = 10;
    var count = 0;
    if (limitCount != null && limitCount != '' && undefined != limitCount) {
        imgLimit = limitCount;
    }

    $(this.fileBtn).click(function () {
        $("#img").click();
    })

    //初始化已有的文件下载地址
    if (appType != null && appType != '' && 'undefined' != appType && appId != null && appId != '' && 'undefined' != appId) {
        this.initShowImg(appType, appId, true, count);
    }

    if (progressBar != null && progressBar != '') {
        $(this.progressBar).html('<div class="progress hidden"> <span class="bar"></span><span class="percent">0%</span> </div> <div class="imgs"></div><div class="showimg"></div>');
    }

    var bar = $('.bar');//进度条
    var percent = $('.percent');//获取上传百分比
    var showimg = $('.showimg');//显示图片的div
    var progress = $('.progress');//显示进度的div
    var files = $('.files');//文件上传控件的input元素
    var btn = $('.btn span'); //按钮文本

    //点击确定自动上传
    $("#img").change(function () {
        var files = $(this).prop('files');
        var selectedFile = files[0];
        var parts = selectedFile.name.split('.');
        var ext = parts[parts.length - 1];
        $(fileSpan).html(selectedFile.name);
        if (count > imgLimit) {
            $("#progressBar").html("最多上传" + limitCount + "个图片");
            return;
        }
        $(fileBtn).attr("disabled", "disabled");
        $(fileBtn).val("上传中...")
        $(".progress").removeClass("hidden");
        console.log(fileBtn);
        $("#imgUploadForm").ajaxSubmit({
            url: "/file/saveFile.ajax",
            dataType: 'json',//返回数据类型
            beforeSend: function () {
                showimg.empty();
                progress.show();
                var percentVal = '0%';
                bar.width(percentVal);
                percent.html(percentVal);
                btn.html('上传中..');
            },
            //更新进度条事件处理代码
            uploadProgress: function (event, position, total, percentComplete) {
                var percentVal = percentComplete + '%';
                bar.width(percentVal);
                percent.html(percentVal);
            },
            success: function (data) {//图片上传成功时
                console.log(data);
                $(fileBtn).val("上传")
                $(fileBtn).removeAttr("disabled");
                //获取服务器端返回的文件数据
                if (data.success) {
                    var file = data.obj;
                    var fileId = file.fileId;
                    var fileCon = "";
                    fileCon += "<div class='col-xs-3 row' style='margin-right:5px;margin-top:5px;width: 110px !important;height: 80px !important;border: 1px solid silver; ' id='dFile" + fileId + "'>";
                    fileCon += "<img class='col-xs-10' style='margin-top:5px;margin-buttom:5px;' src='http://localhost:8080/file/downLoad.html?fileId=" + fileId + "'  alt='" + file.fileName + "' />";
                    fileCon += "<div class='col-xs-1' style='width:10px;margin-right:-10px;padding-top:-100px'><a href='#' class='rm-img' id='rm-btn" + fileId + "' fileId='" + fileId + "'>x</a></div>";
                    $(fileContainer).append(fileCon);

                    console.log(fileCon);

                    var ids = $(fileIds).val();
                    if (ids != null && ids != '') {
                        ids += ",";
                    }

                    ids += data.obj.fileId;
                    $(fileIds).val(ids);
                    count++;

                    //文件id列表
                    //删除文件定义
                    $("#rm-btn" + file.fileId).bind("click", function () {
                        var fileId = $(this).attr("fileId");
                        $("#dFile" + fileId).remove();
                        var ids = $(fileIds).val().split(",");
                        var newIds = ""
                        for (var i = 0; i < ids.length; i++) {
                            if (fileId != ids[i]) {
                                if (newIds != "") {
                                    newIds += ",";
                                }
                                newIds += ids[i];
                            }
                        }
                        $(fileIds).val(newIds);
                        count--;
                    });
                }

                //alert(data.name + "," + data.pic + "," + data.size);
                //$(this.fileIdContainer).append("<a>asdfsdfsdfsdfsdfsdf</a>");
            },
            error: function (xhr) {
                $(fileBtn).removeAttr("disabled");
                console.log(xhr);
                btn.html("上传失败");
                bar.width('0');
            }
        });
    })
}


//初始化显示文件,文件ID多个 以逗号分隔
FileUtils.prototype.initShowFile = function (appType, appId, isEdit) {
    var fileSpan = this.fileSpan;
    var fileContainer = this.fileContainer;
    var fileIds = this.fileIds;
    //查询文件列表
    //如果文件Id不为空
    if (appType != '' && appId != '') {
        $.ajax({
            url: "/file/fileList.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                appType: appType,
                appId: appId
            },
            success: function (json, statusText, xhr, $form) {
                if (json.success) {
                    var data = json.obj;
                    var dataSpan = "";
                    if (data != null && data.length > 0) {
                        var ids = "";
                        for (var i = 0; i < data.length; i++) {
                            var file = data[i];
                            var fileId = file.id;
                            dataSpan += '<div class="col-xs-12" id="dFile' + fileId + '" style="margin-top:5px;margin-left:-20px"><span class="col-xs-8"><a href="/file/downLoad.html?fileId=' + fileId + '">' + file.fileName + '</a></span>';
                            if (isEdit) {
                                dataSpan += '<a href="#" class="col-xs-1 rm-btn" id="rm-btn' + fileId + '" fileId="' + fileId + '">x</a>';
                            }
                            dataSpan += '</div>';
                            if (ids != "") {
                                ids += ",";
                            }
                            ids += fileId;
                        }
                        $(fileIds).val(ids);
                        $(fileContainer).html(dataSpan);
                        $(".rm-btn").bind("click", function () {
                            var fileId = $(this).attr("fileId");
                            $("#dFile" + fileId).remove();
                            var ids = $(fileIds).val().split(",");
                            var newIds = ""
                            for (var i = 0; i < ids.length; i++) {
                                if (fileId != ids[i]) {
                                    if (newIds != "") {
                                        newIds += ",";
                                    }
                                    newIds += ids[i];
                                }
                            }
                            $(fileIds).val(newIds);
                            count--;
                        });
                    }
                } else {
                    console.log(json);
                }
            }, error: function (json) {
                console.log(json);
            }
        });
    }
}


//初始化显示文件,文件ID多个 以逗号分隔
FileUtils.prototype.initShowImg = function (appType, appId, isEdit, count) {
    var fileContainer = this.fileContainer;
    var fileIds = this.fileIds;
    //查询文件列表
    //如果文件Id不为空
    if (appType != '' && appId != '') {
        $.ajax({
            url: "/file/fileList.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                appType: appType,
                appId: appId
            },
            success: function (json, statusText, xhr, $form) {
                if (json.success) {
                    var data = json.obj;
                    var dataSpan = "";
                    if (data != null && data.length > 0) {
                        var ids = "";
                        dataSpan += "<div style='margin-top:10px;' class='col-xs-12'>";
                        for (var i = 0; i < data.length; i++) {
                            if (ids != null && ids != '') {
                                ids += ",";
                            }
                            ids += data[i].id;
                            dataSpan += "<div class='col-xs-3 row' style='margin-right:5px;margin-top:5px;width: 110px !important;height: 80px !important;border: 1px solid silver; ' id='dFile" + data[i].id + "'>";
                            dataSpan += "<img class='col-xs-10' style='margin-top:5px;margin-buttom:5px;' src='http://localhost:8080/file/downLoad.html?fileId=" + data[i].id + "'  alt='" + data[i].fileName + "' />";
                            if (isEdit) {
                                dataSpan += "<div class='col-xs-1' style='width:10px;margin-right:-10px;padding-top:-100px'><a href='#' class='rm-img' id='rm-btn" + data[i].id + "' fileId='" + data[i].id + "'>x</a></div>";
                            }
                            dataSpan += "</div>";
                        }
                        dataSpan += "</div>";
                        $(fileContainer).html(dataSpan);
                        count++;

                        //文件id列表
                        //删除文件定义
                        if (isEdit) {
                            $(fileIds).val(ids);

                            $(".rm-img").bind("click", function () {
                                var fileId = $(this).attr("fileId");
                                $("#dFile" + fileId).remove();
                                console.log(ids);
                                ids = $(fileIds).val();
                                var fids = ids.split(",");
                                var nIds = "";
                                for (var i = 0; i < fids.length; i++) {
                                    console.log(fileId + "  " + fids[i]);
                                    if (fileId != fids[i]) {
                                        if (nIds != null && nIds != '') {
                                            nIds += ",";
                                        }
                                        nIds += fids[i];
                                    }
                                }
                                console.log(nIds);
                                $(fileIds).val(nIds);
                                count--;
                            });
                        }
                    }
                } else {
                    console.log(json);
                }
            }, error: function (json) {
                console.log(json);
            }
        });
    }
}




