const mysql=require('./../tool/mysql');
const url=require('url');
const routes={
    defaultRoute:(req,res)=>{
        mysql.find('movie_collection',{},{},(data)=>{
            res.render('movie',{
                result:data,
                pageCode:1,
                totalNum:1,
                limitNum:1
            })
        })
    },
    pagingRoute:(req,res)=>{
        let obj= url.parse(req.url,true).query;
        let pageCode=obj.pageCode ||0;
        let limitNum=obj.limitNum||5;
        pageCode < 1 ? pageCode=0 : pageCode=pageCode;
        mysql.find('movie_collection',{},{},(data)=>{
            let len =data.length;
            let totalNum= Math.ceil(len/limitNum);
            let result=data.splice(pageCode*limitNum,limitNum);
            pageCode++;
            res.render('movie',{
                result:result,
                pageCode:pageCode,
                totalNum:totalNum,
                limitNum:limitNum
            })
        })
    },
    distinctRoute:(req,res)=>{
        let type=url.parse(req.url,true).query.type;
        mysql.distinct('movie_collection',type,(data)=>{
            // console.log(data);
            res.send(data);
        })
    },
    findRoute:(req,res)=>{
        let obj=url.parse(req.url,true).query;
        let type =obj.type;
        let val = obj.val * 1;
        let whereObj ={};
        whereObj[type] =val;
        mysql.find('movie_collection',whereObj,{},(data)=>{
            res.render('movie',{
                result:data,
                pageCode:1,
                totalNum:1,
                limitNum:data.length
            })
        })
    },
    searchRoute:(req,res)=>{
        let obj = url.parse(req.url,true).query;
        let searchTxt = obj.searchTxt;
        let whereObj= {
            title: eval('/'+searchTxt+'/')
        }
        mysql.find('movie_collection',whereObj,{},(data)=>{
            res.render('movie',{
                result:data,
                pageCode:1,
                totalNum:1,
                limitNum:data.length
            })
        })
    },
    sortRoute:(req,res)=>{
        let obj = url.parse(req.url,true).query;
        let type=obj.type;
        let val =obj.val;
        mysql.find('movie_collection',{},{},(data)=>{
            if(val ==1){
                data.sort((a,b)=>{
                    return a[type]-b[type]
                })
            }else {
                data.sort((a,b)=>{
                    return b[type]-a[type]
                })
            }
            res.render('movie',{
                result:data,
                pageCode:1,
                totalNum:1,
                limitNum:data.length
            })
        })
    },
    deleteRoute:(req,res)=>{
        let {id}= url.parse(req.url,true).query;
        let whereObj={
            id //如何对象里面的key和value相同，并且value是一个变量或者常量；可以简写
        };
        mysql.delete('movie_collection',whereObj,false,()=>{
            console.log('删除成功');
            res.redirect('/moviePaging')//重定向路由
        })
    },
    addMovieRoute:(req,res)=>{
        res.render('movie_add')
    },
    addMovieActionRoute:(req,res)=>{
        //express中post提交信息，后端采用req.body拿取参数
        let movieObj =req.body;
        let directorsListArr =movieObj.directorsList.split(',');
        movieObj.directorsList=directorsListArr;
        let castsArr=movieObj.casts.split(',');
        movieObj.casts=castsArr;
        movieObj.year*=1;
        movieObj.average*=1;
        movieObj.collect_count*=1;
        console.log(movieObj);
        mysql.insert('movie_collection',movieObj,()=>{
            res.redirect('/moviePaging')
        })
    },
    updateMovieRoute:(req,res)=>{
        let{id}=url.parse(req.url,true).query;
        let whereObj={id};
        mysql.find('movie_collection',whereObj,{},(data)=>{
            let {
                id,title,average,collect_count,images,alt,casts,year,
                directorsList,subtype,original_title,genres
            }=data[0];
            res.render('movie_update',{
                id,title,average,collect_count,images,alt,casts,year,
                directorsList,subtype,original_title,genres
            })
        })
    },
    updateMovieActionRoute:(req,res)=>{
        let movieObj =req.body;
        let directorsListArr =movieObj.directorsList.split(',');
        movieObj.directorsList=directorsListArr;
        let castsArr=movieObj.casts.split(',');
        movieObj.casts=castsArr;
        movieObj.year*=1;
        movieObj.average*=1;
        movieObj.collect_count*=1;
        console.log(movieObj);
        let whereObj={id:movieObj.id};
        let updateObj={
            average:movieObj.average,
            collect_count:movieObj.collect_count,
            genres:movieObj.genres,
            images:movieObj.images,
            alt:movieObj.alt
        };
        mysql.update('movie_collection',whereObj,updateObj,false,()=>{
            res.redirect('/moviePaging')
        })
    }
};
module.exports= routes;