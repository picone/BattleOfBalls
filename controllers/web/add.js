'use strict';

const http_post=require('../../utils/http').http_post;

exports.add=(req,res,next)=>{
    let link=req.body.link;
    if(link==''){
        next({code:100});
    }
    http_post('http://xzfuli.cn/index.php?a=api_qiuqiu',{type:4,url:link},(data)=>{
        data=JSON.parse(data);
        if(data.code==0){
            data.url=decodeURI(data.url);
            data.url=/id=(\d+)&Account=([\w\W]+)$/.exec(data.url);
            if(data.url&&data.url.hasOwnProperty('index')){
                next({code:1,id:data.url[1],name:data.url[2]});
            }else{
                next({code:101});
            }
        }else{
            next({code:1,msg:data.msg});
        }
    });
};

exports.begin=(req,res,next)=>{
    let id=req.body.id||0;
    id=parseInt(id);
    if(id==0){
        return next({code:102});
    }
    http_post('http://xzfuli.cn/index.php?a=api_qiuqiu',{type:2,id:id},(data)=>{
        data=JSON.parse(data);
        console.log(data);
        if(data.code==0){
            next({code:1,msg:data.msg});
        }else{
            next({code:10,msg:data.msg});
        }
    })
};
