var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
//引入路由
const usersRoutes = require('./users');
const movieRoutes = require('./movie');
const castsRoutes = require('./casts');
const directorsRoutes = require('./directors');
const loginRoutes = require('./login');

/* GET home page. */
router.get('/', function(rreq, res, next) {
  res.render('index', { title: 'express' });
});
/***----注册路由----当路由为参数1时候，执行参数2的函数体然后渲染对应的页面***/
//用户管理的相关接口
router.get('/users',usersRoutes.defaultRoute);
router.get('/addusers',usersRoutes.addUserRoutes);

//电影管理的相关接口
router.get('/movie',movieRoutes.defaultRoute);
router.get('/moviePaging',movieRoutes.pagingRoute);//分页电影列表
router.get('/movieDistinct',movieRoutes.distinctRoute);//去重路由
router.get('/movieFind',movieRoutes.findRoute);//查询路由(以评分或者年限)
router.get('/movieSearch',movieRoutes.searchRoute);//查询数据
router.get('/movieSort',movieRoutes.sortRoute);//查询数据
router.get('/movieDelete',movieRoutes.deleteRoute);//删除数据
router.get('/movieAdd',movieRoutes.addMovieRoute);//跳转到添加电影页面
router.post('/movieAddAction',movieRoutes.addMovieActionRoute);
router.get('/movieUpdate',movieRoutes.updateMovieRoute);//跳转到修改页面
router.post('/movieUpdateAction',movieRoutes.updateMovieActionRoute);//修改数据

//演员管理的相关接口
// router.get('/casts',castsRoutes.defaultRoute);
router.get('/castsPaging',castsRoutes.castsPagingRoute);

//导演管理的相关接口
router.get('/directors',directorsRoutes.defaultRoute);
router.get('/directorsAdd',directorsRoutes.directorsAddRotue);
router.post('/directorsAddAction', upload.single('avatar'),directorsRoutes.directorsAddActionRoutes);

//登陆界面的相关接口
router.get('/login',loginRoutes.defaultRoute);
router.post('/adminLogin',loginRoutes.adminRoute);

module.exports = router;
