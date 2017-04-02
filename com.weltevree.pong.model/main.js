"use strict";
var pietje;
var socket;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	pietje = new Blok();
	socket = new MySocket("ws://localhost:7777/myapp", "echo-protocol");
	socket.addEventListener("open", function (event) {
	    socket.send("{LOGIN}");
	    socket.send("{NAME:WIM}");
	});
}

function draw() {
	background(51);
	pietje.show();
}

function calcBlok() {
}