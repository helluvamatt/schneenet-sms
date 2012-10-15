var http = require('http');
var sys = require('sys');
var fs = require('fs');

var sse = {};

http.createServer(function(req, res) {
  debugHeaders(req);

  var parms = require('url').parse(req.url, true);

  console.log('Got some request params: \n\n %j \n\n', parms);

  if (req.headers.accept && req.headers.accept == 'text/event-stream') {
    if (parms.pathname == '/events' && parms.query.sessid) {
      registerSSE(parms.query.sessid, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  } else {
    if (parms.pathname == '/send') {
      if (parms.query.sessid && parms.query.msg) {
        if (sendMSG(parms.query.sessid, parms.query.msg)) {
          res.writeHead(200, {'Content-type': 'text/plain'});
          res.write('Success');
          res.end();
        } else {
          res.writeHead(200, {'Content-type': 'text/plain'});
          res.write('Failed');
          res.end();
        }
      } else {
        res.writeHead(404);
        res.end();
      }
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(fs.readFileSync(__dirname + '/sse-node.html'));
      res.end();
    }
  }
}).listen(8000);

function sendMSG(sessid, message) {
  var res = sse.sessid;
  if (!res) return false;
  
  constructSSE(res, sessid, message);

  return true;
}

function registerSSE(sessid, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  sse[sessid] = res;
}

function constructSSE(res, id, data) {
  res.write('id: ' + id + '\n');
  res.write("data: " + data + '\n\n');
}

function debugHeaders(req) {
  sys.puts('URL: ' + req.url);
  for (var key in req.headers) {
    sys.puts(key + ': ' + req.headers[key]);
  }
  sys.puts('\n\n');
}
