/**
 * Created by Administrator on 2018/8/18.
 */
let mysql=require('./../tool/mysql');
let url=require('url');
const routes={
    defaultRoute:(req,res)=>{
        mysql.find('casts_collection',{},{},(data)=>{
            res.render('casts',{
                result:data
            })
        })
    },
    castsPagingRoute:(req,res)=>{
        let obj=url.parse(req.url,true).query;
        let pageCode = obj.pageCode||0;
        let pageNum = obj.pageNum||5;
        pageCode < 1 ?pageCode=0:pageCode=pageCode;
        mysql.find('casts_collection',{},{},(data)=>{
            let len =data.length;
            let totalNum= Math.ceil(len/pageNum);
            let result=data.splice(pageCode*pageNum,pageNum);
            pageCode++;
            res.render('casts',{
                result:result,
                pageCode:pageCode,
                pageNum:pageNum,
                totalNum:totalNum
            })
        })
    }
};
module.exports= routes;