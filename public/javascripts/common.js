$(function(){
    var dialog=$('#dialog');
    $('#nav_about').click(function(){
        showDialog('Power by ChienHo');
    });
    $('#confirm_cancel').click(function(){
        $('#confirm').hide();
    });
    dialog.find('a').click(function(){
        dialog.hide();
    });
});
var accounts=localStorage.getItem('accounts');
accounts=accounts?JSON.parse(accounts):{};
function showDialog(msg,title){
    $('#dialog_title').text(title||'提示');
    $('#dialog_content').html(msg);
    $('#dialog').show(300);
}
function showConfirm(title,msg,success){
    $('#confirm_title').text(title);
    $('#confirm_content').html(msg);
    $('#confirm_ok').unbind('click').click(function(){
        success();
        $('#confirm_cancel').click();
    });
    $('#confirm').show(300);
}
function createLoading(text){
    var loading='<div class="weui_loading_toast"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading">';
    for(var i=0;i<=11;i++){
        loading+='<div class="weui_loading_leaf weui_loading_leaf_'+i+'"></div>';
    }
    loading+='</div><p class="weui_toast_content">'+text+'</p></div></div>';
    loading=$(loading);
    $('body').append(loading);
    loading.__proto__.text=function(text){
        loading.find('p').html(text);
    };
    return loading;
}
