
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  movie = require('./routes/movie'),
  http = require('http'),
  path = require('path'),
  ejs = require('ejs'),
  MemcachedStore = require('connect-memcached')(express.session),
  log4js = require('./log').log4js,
  logger = require('./log').logger('index');

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
  app.use(express.session({
    secret: 'CatOnKeyboard',
    key: 'test',
    proxy: 'true',
    store: new MemcachedStore({
      hosts: ['127.0.0.1:11211']
    })
  }));



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
  // if (!req.session.user) {
  //   req.session.error='请先登陆';
  //   return res.redirect('/login');
  // }
  next();
}
function notAuthentication(req, res, next) {
  // if (req.session.user) {
  //   req.session.error='已登陆';
  //   return res.redirect('/');
  // }
  next();
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
