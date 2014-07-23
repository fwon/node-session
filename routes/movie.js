var Movie = require('./../models/Movie.js');
exports.movieAdd = function(req, res) {
    if(req.params.name) {
        return res.render('movie',{
            title:req.params.name + '|电影|管理|movie.me',
            label:'编辑电影:' + req.params.name,
            movie: req.params.name
        });
    } else {
        return res.render('movie', {
            title:'新增加|电影|管理|moive.me',
            label:'新增加电影',
            movie:false
        });
    }
};
exports.doMovieAdd = function(req, res) {
    console.log(req.body.content);
    var json = req.body.content;
    if(json._id){//update
    
    } else {//insert
        Movie.save(json, function(err){
            if(err) {
                res.send({'success':false,'err':err});
            } else {
                res.send({'success':true});
            }
        });
    }
};
exports.movieJSON = function(req, res) {
    var url = '/javascripts/movie.json';
    var movie = $('#c_editor').attr('movie');
    if(movie) {
        url = '/movie/json/' + movie;
    }
};
