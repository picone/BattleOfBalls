$(function(){
    var accounts_list=$('#accounts');
    $('#start').click(function(){
        var loading=createLoading('正在刷棒棒糖...');
        for(name in accounts){
            if(accounts.hasOwnProperty(name)){
                $(document).queue('ajax',function(){
                    $.post('/begin',{id:accounts[name]},function(data){
                        if(data.code==1){
                            loading.text(name+'...');
                        }else{
                            loading.text(data.msg);
                        }
                        $(document).dequeue('ajax');
                    });
                });
            }
        }
        $(document).queue('ajax',function(){
            loading.remove();
        });
        $(document).dequeue('ajax');
    });
    function delete_account(){
        var account=$(this).find('.weui_cell_bd').text();
        showConfirm('警告','你确定要删除'+account+'?',function(){
            delete accounts[account];
            localStorage.setItem('accounts',JSON.stringify(accounts));
            window.location.reload();
        });
    }
    for(var name in accounts){
        accounts_list.append($('<div class="weui_cell delete"><div class="weui_cell_bd weui_cell_primary">'+name+'</div><div class="weui_tab_ft"><i class="weui_icon_cancel"></i></div></div>').click(delete_account));
    }
});
