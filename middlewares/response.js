'use strict';

const response_code={
    1:'成功',
    10:'系统错误',
    11:'未知错误',
    100:'请输入链接',
    101:'链接有误',
    102:'ID错误'
};

module.exports=exports=(err,req,res,next)=>{
    if(err instanceof Error||!err.code)return next(err);
    if(!err.msg){
        if(!response_code[err.code]){//若错误代码不存在则为未知错误
            err.code=11;
        }
        err['msg']=response_code[err.code];
    }
    res.send(err);
};
