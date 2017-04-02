function Logger() {
	 
 	Logger.prototype.info = function(logMessage) {
 		console.log(this.getShortDate() + " ", ...logMessage);
 	}
 	
 	Logger.prototype.getShortDate = function() {
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		return this.lTwo(h) + ":" + this.lTwo(m)+ ":" + this.lTwo(s);
	 }
 	
 	Logger.prototype.lTwo = function(p){
 		if(('' + p).length == 1){
 			return '0' + p;
 		}
 		return p;
 	}
}

if(typeof module != 'undefined'){
	module.exports = Logger;
}