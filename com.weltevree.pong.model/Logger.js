class Logger {
	 
 	static info(logMessage) {
 		console.log(Logger.getShortDate() + " ", ...logMessage);
 	}
 	
 	static getShortDate() {
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		return this.lTwo(h) + ":" + this.lTwo(m)+ ":" + this.lTwo(s);
	 }
 	
 	static lTwo(p){
 		if(('' + p).length == 1){
 			return '0' + p;
 		}
 		return p;
 	}
}

if(typeof module != 'undefined'){
	module.exports = Logger;
}
