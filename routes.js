
/*
 * GET home page.
 */
var Movie = require('./controllers/user');
// var $ = require('jQuery');
var database = require('./database');
var logger = require('./log').logger('index');

exports.index = function(req, res){
    console.log("This is an index page!");
    logger.info("This is an index page! -- log4js");
    
    res.render('index', { title: '首页'});
};
exports.login = function(req, res){
    res.render('login', { title: '用户登陆'});
};
exports.doLogin = function(req, res){
    var user={
        username:'admin',
        password:'admin'
    };
    if(req.body.username===user.username && req.body.password===user.password){
        req.session.user = user;
        return res.redirect('/home');
    } else {
        req.session.error = '用户名或密码不正确';
        return res.redirect('/login');
    }
};
exports.logout = function(req, res){
    req.session.destroy(function() {
        res.redirect('/');
    });
};
exports.home = function(req, res){
    // var url="http://movie.douban.com/subject/11529526";
    // console.log(url);
    // Movie.get(url,function(content,status){
    //     console.log("status:="+status);
    //     var movie={};
    //     movie.name = $(content).find('span[property="v:itemreviewed"]').text();
    //     movie.director = $(content).find('#info span:nth-child(1) a').text();
    //     console.log(movie);
    //     res.render('home', {title: '电影', content: movie});
    //     // res.send(content);
    // });
    if(req.session.views) {
        ++req.session.views;
    } else {
        req.session.views = 1;
    }
    res.render('home', { title: 'Home', user: req.session.user, views: req.session.views});
};