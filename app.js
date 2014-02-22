/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var jobDescription = require('./routes/jobDescription');
var job = require('./routes/job');
var component = require('./routes/component');
var schedule = require('./routes/schedule');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var nconf = require('nconf');
var OAuth2 = require('./oauth2').OAuth2;

var app = express();

nconf.argv().env();
nconf.file({
    file: 'config.json'
});

var db = monk(nconf.get('mongo:connectionString'));

// all environments
app.set('port', process.env.PORT || nconf.get('server:port'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if('development' == app.get('env')){
    app.use(express.errorHandler());
}

var oa = new OAuth2(nconf.get('oAuth:clientId'), nconf.get('oAuth:clientSecret'), nconf.get('oAuth:idmURL'),
        '/oauth2/authorize', '/oauth2/token', nconf.get('oAuth:callbackURL'));

app.get('/', routes.welcome);
app.get('/app', routes.app(oa));
app.get('/auth/fi-ware', routes.auth(oa));
app.get('/login', routes.login(oa));
app.get('/logout', routes.logout);
app.get('/schedule/:id', schedule.start(db));
app.get('/users', user.list(db));
app.get('/users/new', user.newuser);
app.get('/api/job-description/list', jobDescription.list(db));
app.get('/api/job-description/:id', jobDescription.get(db));
app.get('/api/component/list', component.list(db));
app.get('/api/component/:id', component.get(db));
app.get('/api/job/list', job.list(db));
app.get('/api/job/:id', job.get(db));
app.get('/api/logs/:jobId', job.logs);

app.post('/api/job-description', jobDescription.create(db));
app.post('/api/component', component.create(db));
app.post('/users/add', user.add(db));
app.post('/schedule/next', schedule.process(db));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
