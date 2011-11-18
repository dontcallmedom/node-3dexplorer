var express = require('express');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var app = express.createServer();
var fs = require('fs');

var eventQueue = [];
var queueStart = 0;

app.configure(function(){
  emitter.setMaxListeners(0);
  app.use(express.logger());
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public', { maxAge: 86400}));
});

// Run on port 80 when in production mode
app.configure('production', function(){
  app.use(express.errorHandler()); 
    app.set('port', process.env.PORT || 80);
});


// rotation
app.post('/rotate', function(req, res){
    eventQueue.push({alpha: req.body.alpha, beta: req.body.beta, gamma: req.body.gamma});
    emitter.emit("rotate", req.body.alpha, req.body.beta, req.body.gamma, eventQueue.length);
    res.end();
});

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        response.send(text);
    });
});

// broadcast received draw/clear events
app.get('/stream', function(req, res) {
    res.setHeader("Content-Type", 'text/event-stream');
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.writeHead(200);
    // avoid timeout
    setInterval(function() { res.write(":\n"); }, 30000);
    emitter.on("rotate", function(alpha, beta, gamma, id) {
        res.write("data: " + JSON.stringify({'alpha': alpha, 'beta': beta, 'gamma': gamma})+ "\n");
        res.write("id: " + id + "\n\n");
    });
});

app.listen(app.set('port'));
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);