$(function(){
    $('#add').click(function(){
        var link=$('#link').val().trim();
        if(link==''){
            showDialog('请输入链接','警告');
            return;
        }
        var loading=createLoading('正在检查链接');
        $.post('/add',{link:link},function(data){
            loading.remove();
            if(data.code==1){
                accounts[data.name]=data.id;
                localStorage.setItem('accounts',JSON.stringify(accounts));
                window.location='/';
            }else{
                showDialog(data.msg);
            }
        });
    });
});
