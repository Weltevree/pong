function Blok() {

	this.init = function() {
		this.pos = createVector(random(width), random(height));
	}

	this.update = function() {
	}

	this.show = function() {
		rect(this.pos.x, this.pos.y, 10, 10);
	}
	
	this.init();
}

if(typeof module != 'undefined'){
	module.exports = Blok;
}
