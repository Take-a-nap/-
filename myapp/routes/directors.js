/**
 * Created by Administrator on 2018/8/18.
 */
let mysql=require('./../tool/mysql');
let fs=require('fs');
const routes={
    defaultRoute:(req,res)=>{
        mysql.find('director_collection',{},{_id:0},(data)=>{
            res.render('directors',{
                result:data
            })
        })
    },
    directorsAddRotue:(req,res)=>{
        res.render('directors_add')
    },
    directorsAddActionRoutes:(req,res)=>{
        let oldPath = './public/uploads/'+req.file.filename; //这里相对路径是根据package.json文件相对的.
        let typeArr = req.file.originalname.split('.');
        let type = typeArr[typeArr.length-1];
        let newPath = './public/uploads/'+req.file.filename+'.'+type;
        let realPath='/uploads/'+req.file.filename+'.'+type;//存到服务器的路径
        fs.rename(oldPath,newPath,()=>{
            let insertObj={
                id:req.body.id,
                name:req.body.name,
                alt:req.body.alt,
                avatars:{
                    small:realPath,
                    large:realPath,
                    medium:realPath
                }
            };
            //存储数据库用的不是相对路径而是绝对路径（访问路径)
            mysql.insert('director_collection',insertObj,()=>{
                res.redirect('directors')
            })
        })
        // { fieldname: 'avatar',
        //     originalname: '20140925100559_RviGZ.jpeg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg',
        //     destination: 'public/uploads/',
        //     filename: '656f1aa053274f6e68c06b8838db7576',
        //     path: 'public\\uploads\\656f1aa053274f6e68c06b8838db7576',
        //     size: 59430 }
    }
};

module.exports= routes;