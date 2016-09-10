'use strict';

const http=require('http');
const url=require('url');
const querystring=require('querystring');

/**
 * post请求
 * @param query_url
 * @param data
 * @param callback
 */
exports.http_post=(query_url,data,callback)=>{
    query_url=url.parse(query_url);
    data=querystring.stringify(data);
    if(data.length==0)throw Error('请求数据不为空');
    let options={
        method:'POST',
        host:query_url.host,
        port:query_url.port||80,//默认端口80
        path:query_url.path,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length':data.length
        }
    };
    let req=http.request(options,(res)=>{
        let chunks=[];
        let size=0;
        res.on('data',(chunk)=>{
            chunks.push(chunk);//拼接所有chunk
            size+=chunk.length;
        });
        res.on('end',()=>{
            callback(Buffer.concat(chunks,size).toString());//调用回调函数
        });
    });
    req.on('error',(e)=>{
        console.log(`problem with request: ${e.message}`);
    });
    req.write(data);
    req.end();
};
