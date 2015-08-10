/**
 * Created by lenovo on 2015/2/6.
 */

//web网站的虚拟路径
var virtualWebPath="/crawl-template-webtool";

$(function(){

   //事件注册
   RegisterEvent();
});

/**
 *
 * 事件注册
 * */
function RegisterEvent(){
   $('#md5_encrypt').click(md5EncryptBtnHandler);
}

/**
 *
 * MD5加密按钮
 * */
function md5EncryptBtnHandler(){
   var md5_template_url=$('#md5_template_url').val();
   var md5_textAreaControl=$('#md5_textArea');

    if(md5_template_url==""){
        md5_textAreaControl.val("模板url不能为空");
        return;
    }

    $.ajax({
        url: virtualWebPath + '/webapi/crawlToolService/getTemplateGuid',
        type: 'POST',
        data: {
            templateUrl: md5_template_url
        },
        success: function (data) {
            var json=data;//JSON.parse(data);
            if(json.success){
                md5_textAreaControl.val(json.data);
            }else{
                md5_textAreaControl.val("接口调用出错！");
            }
        },
        error: function (error) {
            md5_textAreaControl.val(error.responseText);
        }
    });    
}

/******重写Ajax操作,做成通用Loading操作*******/
$.ajax2 = function (options, aimDiv) {
    var img = $("<img id=\"progressImgage\"  src=\"../../image/load.gif\" />"); //Loading小图标
    var mask = $("<div id=\"maskOfProgressImage\"></div>").addClass("mask"); //Div遮罩
    var PositionStyle = "fixed";
    //是否将Loading固定在aimDiv中操作,否则默认为全屏Loading遮罩
    if (aimDiv != null && aimDiv != "" && aimDiv != undefined) {
        $(aimDiv).css("position", "relative").append(img).append(mask);
        PositionStyle = "absolute";
    }
    else {
        $("body").append(img).append(mask);
    }
    img.css({
        "z-index": "2000",
        "display": "none"
    });
    mask.css({
        "position": PositionStyle,
        "top": "0",
        "right": "0",
        "bottom": "0",
        "left": "0",
        "z-index": "1000",
        "background-color": "#000000",
        "display": "none"
    });
    var complete = options.complete;
    options.complete = function (httpRequest, status) {
        img.hide();
        mask.hide();
        if (complete) {
            complete(httpRequest, status);
        }
    };
    options.async = true;
    img.show().css({
        "position": PositionStyle,
        "top": "40%",
        "left": "50%",
        "margin-top": function () { return -1 * img.height() / 2; },
        "margin-left": function () { return -1 * img.width() / 2; }
    });
    mask.show().css("opacity", "0.1");
    $.ajax(options);
};