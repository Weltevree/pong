function Blok() {

	this.reflectListeners = new Array();

	this.init = function() {
		this.vPos = createVector(random(width), random(height));
	}

	this.addReflectListener = function(callBack) {
		this.reflectListeners.push(callBack);
	}

	this.notifyReflectListeners = function() {
		this.reflectListeners.forEach(function(entry) {
			console.log("calling reflectListener");
			entry(this.vPos, this.vTarget);
		}, this);
	}

	this.show = function() {
		rect(this.vPos.x, this.vPos.y, 10, 10);
	}

	this.getPosition = function() {
		return this.vPos;
	}

	this.reflect = function(pos, target, dim) {
		if (pos > dim || pos <= 0) {
			console.log("reflected");
			this.notifyReflectListeners();
			return target * -1;
		}
		return target;
	}

	this.calc = function() {
		this.vPos.add(this.vTarget);
		this.vTarget.x = this.reflect(this.vPos.x, this.vTarget.x, width);
		this.vTarget.y = this.reflect(this.vPos.y, this.vTarget.y, height);
	}

	this.bounce = function() {
		this.vTarget = createVector(random(2) + 2, random(2) + 2);
	}

	this.init();
}

if (typeof module != 'undefined') {
	module.exports = Blok;
}
