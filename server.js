// Server for Fantasti Spork stuff

/**
 * Created by rdantzer on 18/06/16.
 */

// Npid for easy npm stop ! ~abarbaro
/*
var npid = require('npid');

try {
	var pid = npid.create('./pidfile', true);
	pid.removeOnExit();
} catch (err) {
	console.log(err);
	process.exit(1);
}
*/
var http            = require('http'),
    express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    path            = require('path'),
	mongoose		= require('mongoose'),
	config			= require('./app/config/database');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
	//mount all /api routes
    require('./app/index')(app);
	mongoose.connect(config.database);
});

app.get('/', function (req, res) {
	res.sendFile(path.resolve('public/views/index.html'));
});