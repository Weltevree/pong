function User(name, position) {
	this.name = name;
	this.vector = {
		x : position.x,
		y : position.y
	}
}

User.fromString = function(data) {
	return new User(data.name, data.vector);
}

User.prototype.constructor = User;

if (typeof module != 'undefined') {
	module.exports = User;
}