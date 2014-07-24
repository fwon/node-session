
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , movie = require('./routes/movie')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  ,log4js = require('./log').log4js
  ,logger = require('./log').logger('index')
  , SessionStore = require('session-mongoose')(express);
  var store = new SessionStore({
    url: "mongodb://localhost/session",
    interval: 120000
  });

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.engine('.html', ejs.__express);
  app.set('view engine', 'html');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //session
  app.use(express.cookieParser());
  app.use(express.cookieSession({secret: 'fens.me'}));
  app.use(express.session({
    secret: 'fens.me',
    store: store,
    cookie: {maxAge: 900000}
  }));
  //页面locals赋值session
  app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = '';
    if(err) {
      res.locals.message = '<div class="alert alert-error">' + err + '</div>';
    }
    next();
  });

  app.use(log4js.connectLogger(logger, {level:'auto', format:':method :url'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/', routes.index);
app.all('/login', notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', authentication);
app.get('/logout', routes.logout);
app.get('/home', authentication);
app.get('/home', routes.home);

console.log(movie);
app.get('/movie/add', movie.movieAdd);
app.post('/movie/add', movie.doMovieAdd);
app.get('/movie/:name', movie.movieAdd);
app.get('/movie/json/:name', movie.movieJSON);

function authentication(req, res, next) {
  if (!req.session.user) {
    req.session.error='请先登陆';
    return res.redirect('/login');
  }
  next();
}
function notAuthentication(req, res, next) {
  if (req.session.user) {
    req.session.error='已登陆';
    return res.redirect('/');
  }
  next();
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
