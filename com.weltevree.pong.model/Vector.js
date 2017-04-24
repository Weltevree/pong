function Vector(x, y, z) {

	this.x = x;
	this.y = y;
	this.z = z;

	this.add = function(vector) {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
	}
}

if (typeof module != 'undefined') {
	module.exports = Vector;
}
