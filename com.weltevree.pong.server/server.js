var WebSocketServer = require('websocket').server;
var User = require('../com.weltevree.blokje.model/User.js');
var Logger = require('../com.weltevree.blokje.model/Logger.js');
var http = require('http');
var users = new Map();

var l = new Logger();

var server = http.createServer(function(request, response) {
	l.info(['Received request for ' + request.url]);
	response.writeHead(404);
	response.end();
});

server.listen(7777, function() {
	l = new Logger();
	l.info(['Server is listening on port 7777']);
});

wsServer = new WebSocketServer({
	httpServer : server,
	// You should not use autoAcceptConnections for production
	// applications, as it defeats all standard cross-origin protection
	// facilities built into the protocol and the browser. You should
	// *always* verify the connection's origin and decide whether or not
	// to accept it.
	autoAcceptConnections : false
});

function originIsAllowed(origin) {
	// put logic here to detect whether the specified origin is allowed.
	return true;
}

wsServer.on('request', function(request) {
	if (!originIsAllowed(request.origin)) {
		// Make sure we only accept requests from an allowed origin
		request.reject();
		l.info(['Connection from origin ' + request.origin
				+ ' rejected.']);
		return;
	}

	// for (var property in request) {
	// console.log(property);
	// }

	var connection = request.accept('echo-protocol', request.origin);
	l.info(['Connection accepted from ', request.remoteAddress]);
	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			l.info(['Received Message: ' + message.utf8Data]);
			process(message.utf8Data, request.remoteAddress);
		} else if (message.type === 'binary') {
			l.info(['Received Binary Message of '
					+ message.binaryData.length + ' bytes']);
			connection.sendBytes(message.binaryData);
		}
	});

	connection.on('close', function(reasonCode, description) {
		logout(request.remoteAddress);
		l.info(['Peer ' + connection.remoteAddress
				+ ' disconnected. Reason ' + reasonCode + ' -> ' + description]);
	});

	var process = function(message, origin) {
		
		var parms = JSON.parse(message);
		
		l.info(parms);
		if (parms[0].startsWith("<LOGIN>")) {
			login(origin, User.fromString(parms[1]));
		}
		if (parms[0].startsWith("<LOGOUT>")) {
			logout(origin);
		}
		if (parms[0].startsWith("<USERS>")) {
			listUsers(origin);
		}
		if (parms[0].startsWith("<POSITION>")) {
			addUser(origin);
		}
	}

	var login = function(origin, user ) {
	// console.log(connection);
		if (!users.has(connection)) {
			users.set(connection, user);
			connection.sendUTF("Hi " + user.name);
			l.info(["User " + user.name, "logged in"]);
		} else {
			l.info(["User " + user.name, "already logged in"]);
			connection.sendUTF("That user is already in use!")
		}
	}

	var logout = function(origin) {
		if (users.has(connection)) {
			var user = users.get(connection);
			users.delete(connection);
			l.info(["User " + user.name, "logged out"]);
			connection.sendUTF("Bye " + user.name);
		} else {
			l.info(["User logged out but never logged in"]);
			connection.sendUTF("Next time you can come in ")
		}
	}

	var listUsers = function(user) {
		connection.sendUTF(JSON.stringify(users));
	}
});