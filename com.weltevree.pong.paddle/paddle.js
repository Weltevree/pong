    var bal = new Ball(window.innerWidth, window.innerHeight);
    var paddle = new Paddle(60, window.innerHeight / 2 - (125 / 2));
    var paddle2 = new Paddle(window.innerWidth - 60, window.innerHeight / 2 - (125 / 2));

    function setup() {
        createCanvas(window.innerWidth, window.innerHeight);

        color(255);
        strokeWeight(1);
        stroke(0);
    }

    function draw() {
        background(51);

        bal.calculate();
        bal.show();
        paddle2.calculate(mouseY);
        paddle.calculate(mouseY);
        paddle2.show();
        paddle.show();
    }

    function Vector(x, y) {
        this.x = x;
        this.y = y;

        this.add = function (pVector) {
            this.x = this.x + pVector.x;
            this.y = this.y + pVector.y;
        }
    }

    function Ball(pWidth, pHeight) {
        this.width = pWidth;
        this.height = pHeight;
        this.positie = new Vector(Math.random() * pWidth, Math.random() * pHeight);
        var value = Math.round(Math.random()) - 1 * 10;
        //    console.log(value);
        this.baan = new Vector(value, value);

        this.calculate = function () {
            this.bounds();
            this.paddleHit();
            this.positie.add(this.baan);
        }

        this.paddleHit = function () {
            if (paddle.hit(this) == true) {
                this.baan.x = this.baan.x * -1;
            }

            if (paddle2.hit(this) == true) {
                this.baan.x = this.baan.x * -1;
            }
        }

        this.bounds = function () {
            if (this.positie.x <= 0 || this.positie.x >= this.width - 19) {
                background(255);
                // this.baan.x = this.baan.x * -1;
            }

            if (this.positie.y <= 0 || this.positie.y >= this.height - 19) {
    //            background(255);
                this.baan.y = this.baan.y * -1;
            }
        }

        this.show = function () {
            rect(this.positie.x, this.positie.y, 20, 20);
        }
    }

    function Paddle(pX, pY) {
        this.x = pX;
        this.y = pY;

        this.show = function () {
            rect(this.x, this.y, 20, 125);
            //        console.log(this.y);
        }

        this.calculate = function (pY) {
            this.y = pY;
        }

        this.hit = function (pBall) {
            if (this.x < pBall.positie.x && pBall.baan.x < 0) {
                if (pBall.positie.x + pBall.baan.x <= this.x && pBall.positie.y >= this.y && pBall.positie.y <= this.y + 125) {
                    return true;
                }
            }
            if (this.x > pBall.positie.x && pBall.baan.x > 0) {
                if (pBall.positie.x + pBall.baan.x >= this.x && pBall.positie.y >= this.y && pBall.positie.y <= this.y + 125) {
                    return true;
                }
            }
            return false;
        }
    }
