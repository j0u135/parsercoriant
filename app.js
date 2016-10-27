var express = require('express');
var workspaceController = require('./controllers/workspace');
var workspaceApiController = require('./controllers/workspace/api');
var filesApiController = require('./controllers/files/api');
var compression = require('compression');

var port = process.env.PORT || 3000;
var app = express();

var base = __dirname + '/base';

var setupBase = require('./config/setup_base.js');

setupBase(base, function(Workspaces, Files){
    
    app.use('/assets', express.static(__dirname + '/public'));
    app.use(compression());
    
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    
    workspaceController(app);
    workspaceApiController(app, Workspaces);
    filesApiController(app, Files);
    
    app.listen(port);
});