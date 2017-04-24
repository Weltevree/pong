function Ball() {

	this.bWidth = 10;
	this.bHeight = 10;
	this.vPos; // Vector
	this.vTarget; // Vector
	this.bounceListeners = new Array();

	this.init = function() {
		this.vPos = new Vector(random(width), random(height), 0);
	}

	this.addBounceListener = function(callBack) {
		this.bounceListeners.push(callBack);
	}

	this.notifyBounceListeners = function() {
		this.bounceListeners.forEach(function(entry) {
			Logger.info(["Ball", "calling bounceListener"]);
			entry(this);
		}, this);
	}

	this.show = function() {
		rect(this.vPos.x, this.vPos.y, this.bWidth, this.bHeight);
	}

	this.getPosition = function() {
		return this.vPos;
	}

	this.getDirection = function() {
		return this.vTarget;
	}

	this.isBounce = function(pos, target, dim) {
		if (pos > (dim - this.bWidth) || pos <= 0) {
			Logger.info(["Ball", "bounce"]);
			this.notifyBounceListeners();
			return target * -1;
		}
		return target;
	}

	this.calc = function() {
		this.vPos.add(this.vTarget);
		this.vTarget.x = this.isBounce(this.vPos.x, this.vTarget.x, width);
		this.vTarget.y = this.isBounce(this.vPos.y, this.vTarget.y, height);
	}

	this.bounce = function() {
		this.vTarget = new Vector(random(2) + 2, random(2) + 2, 0);
	}

	this.init();
}

if (typeof module != 'undefined') {
	module.exports = Ball;
}
