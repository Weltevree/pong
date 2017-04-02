"use strict";
var user;
var bal;
var socket;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	bal = new Blok();
	bal.bounce();
	user = new User("wim", bal.getPosition());
	console.log(user);
	socket = new MySocket("ws://localhost:7777/myapp", "echo-protocol");
	socket.addEventListener("open", function(event) {
		var command = JSON.stringify([ "<LOGIN>", user ]);
		console.log(command);
		socket.send(command);
	});
	bal.addReflectListener(function(pTarget) {
		var vTarget = {
			x : pTarget.x,
			y : pTarget.y
		};
		socket.send(JSON.stringify([ "<REFLECTED>", user, vTarget ]));
	});
}

function draw() {
	background(51);
	bal.show();
	bal.calc();
}