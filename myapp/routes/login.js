/**
 * Created by Administrator on 2018/8/22.
 */
let mysql=require('./../tool/mysql');
let md5=require('md5');
const routes={
    defaultRoute:(req,res)=>{
        res.render('login')
    },
    adminRoute:(req,res)=>{
        let{username,password}=req.body;
        let newPassword=md5(password);
        mysql.find('admin_collection',{username,password:newPassword},{_id:0},(data)=>{
            if(data.length==0){
                res.send('0')
            }else {
                res.cookie('username',username);
                res.cookie('isLogin',1);
                res.send('1');
            }
        })
    }
};
module.exports= routes;