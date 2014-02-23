/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var person = require('./routes/person');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var nconf = require('nconf');

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
app.use(express.cookieParser('this is my secret'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if('development' == app.get('env')){
    app.use(express.errorHandler());
}

app.get('/', routes.welcome);
app.get('/app', routes.app);
app.get('/users', user.list(db));
app.get('/users/new', user.newuser);
app.get('/api/person/list', person.list(db));
app.get('/api/person/:id', person.get(db));

app.post('/api/person', person.create(db));
app.post('/users/add', user.add(db));

app.delete('/api/person/:id', person.delete(db));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
