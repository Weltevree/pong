"use strict";
var fUser;
var fBall;
var fClient;
var l = Logger;

function getDimensions() {
    // if(window.innerHeight/2 > 600){
    return 600;
    // }

}

function setup() {
    createCanvas(getDimensions() + 300, getDimensions());
    fBall = new Ball();
    fBall.bounce();
    login();
    fBall.addBounceListener(function (pBall) {
        fClient.bounced(pBall, fUser);
    });
}

function draw() {
    background(51);
    fBall.show();
    fBall.calc();
}

function login() {
    fUser = new User("wim19" + round(random(20) + 70), fBall.getPosition());
    fClient = new Client("ws://localhost:7777/myapp", "echo-protocol");
    fClient.addEventListener("open", function (event) {
        var command = JSON.stringify(["<LOGIN>", fUser]);
        l.info([command]);
        fClient.send(command);
    });
}
