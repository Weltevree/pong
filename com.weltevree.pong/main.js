"use strict";
var user;
var pietje;
var socket;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	pietje = new Blok();
	user = new User("wim", pietje.pos);
	console.log(user);
	socket = new MySocket("ws://localhost:7777/myapp", "echo-protocol");
	socket.addEventListener("open", function(event) {
		var command = JSON.stringify(["<LOGIN>", user]);
		console.log(command);
		socket.send(command);
	});
}

function draw() {
	background(51);
	pietje.show();
}

function calcBlok() {
}