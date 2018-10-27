//初始化 file工具类
function fileUtils(fileSpan, fileBtn, fileContainer, fileIds, progressBar, upMsg) {
    this.fileSpan = fileSpan;
    this.fileBtn = fileBtn;
    this.fileContainer = fileContainer;
    this.fileIds = fileIds;
    this.progressBar = progressBar;
    this.upMsg = upMsg;
}

//初始化 上传文件工具
fileUtils.prototype.initUploader = function (ids) {
    var fileSpan = this.fileSpan;
    var fileContainer = this.fileContainer;
    var fileIds = this.fileIds;
    var progressBar = this.progressBar;
    var fileBtn = this.fileBtn;
    var upMsg = this.upMsg;
    $(this.fileBtn).click(function () {
        $("#file").click();
    })

    //初始化已有的文件下载地址
    if (ids != null && ids != '' && 'undefined' != ids) {
        this.initShowFile(ids, true);
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
fileUtils.prototype.initUploadImg = function (appType, appId, limitCount) {
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
                    fileCon += "<img class='col-xs-10' style='margin-top:5px;margin-buttom:5px;' src='/file/downLoad.html?fileId=" + fileId + "'  alt='" + file.fileName + "' />";
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
fileUtils.prototype.initShowFile = function (ids, isEdit) {
    var fileSpan = this.fileSpan;
    var fileContainer = this.fileContainer;
    var fileIds = this.fileIds;
    //查询文件列表
    //如果文件Id不为空
    if (ids != '' && ids != null) {
        $.ajax({
            url: "/file/findByIds.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                fileIds: ids
            },
            success: function (json, statusText, xhr, $form) {
                var count = 0;
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
function showImgs(ids, $fileContainer) {
    //查询文件列表
    //如果文件Id不为空
    if (ids != '' && ids != null) {
        $.ajax({
            url: "/file/findByIds.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                fileIds: ids
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
                            dataSpan += "<a href='#' onclick='zoomIn(" + data[i].id + ")' >"
                            dataSpan += "<img class='col-xs-10' style='margin-top:5px;margin-buttom:5px;' src='/file/downLoad.html?fileId=" + data[i].id + "'  alt='" + data[i].fileName + "' />";
                            dataSpan += "</a>"
                            dataSpan += "</div>";
                        }
                        dataSpan += "</div>";
                        $($fileContainer).html(dataSpan);
                        //文件id列表
                        //删除文件定义
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
function showFiles(ids, $fileContainer) {
    //查询文件列表
    //如果文件Id不为空
    if (ids != '' && ids != null) {
        $.ajax({
            url: "/file/findByIds.ajax",
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                fileIds: ids
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
                            dataSpan += '</div>';
                            if (ids != "") {
                                ids += ",";
                            }
                            ids += fileId;
                        }
                        $($fileContainer).html(dataSpan);
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


function zoomIn(fileId) {
    $("#fileImg").attr("src", "/file/downLoad.html?fileId=" + fileId);
    $("#fileOpenModal").modal({backdrop: 'static', keyboard: false});
    $("#fileOpenModal").modal("show");
    $("#closeFileOpenModal").click(function () {
        $("#fileOpenModal").modal("hide");
    })
}