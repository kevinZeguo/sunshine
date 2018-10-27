/**
 *
 */
var part_info = {};

$(document).ready(function ($) {
    //初始化基本信息
    part_info.init_base();
    //初始化事件
    part_info.init_event();
});
//初始化基本信息
part_info.init_base = function () {
    showImgs($("#fileIds").val(), "#pPicId")
}

//初始化事件
part_info.init_event = function () {

}
