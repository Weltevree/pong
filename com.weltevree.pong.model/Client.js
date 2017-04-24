class Client extends  WebSocket {
	
	constructor(address, protocols){
		super(address, protocols);
		
		this.self = this;

		this.onopen =  function(){
			Logger.info(["Client",'WebSocket Client Connected']);
		}

		this.onclose =  function(){
			Logger.info(["Client",'echo-protocol Client Closed']);
		}

		this.onerror =  function(){
			Logger.info(["Client",'Connection Error']);
		}
		
		this.onmessage = function(e) {
			if (typeof e.data === 'string') {
				Logger.info(["Client", "Received: '" + e.data + "'"]);
			}
		}
	}

	sendText(text) {
		try{
		console.log(this.readyState);
		if (this.readyState === this.OPEN) {
			super.send(text);
		}}
		catch(err){
			throw(err);
		}
	}

	bounced(pBall, pUser) {
		try {
			this.sendText(JSON.stringify([ "<REFLECTED>", pUser ]));
		} catch (err) {
			Logger.info(["Client", "Logging in again.. (" + err.message + ")"]);
			try {
				this.login(user);
				try {
					this.sendText(JSON.stringify([ "<REFLECTED>", pUser ]));
				} catch (err) {
					Logger.info(["Client", "Could not send (" + err.message + ")"]);
				}
			} catch (err) {
				Logger.info(["Client", "Login failed (" + err.message + ")"]);
			}
		}
	}
}
