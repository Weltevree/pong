class MySocket extends  WebSocket {
	
	constructor(address, protocols){
		super(address, protocols);
		
		this.onopen =  function(){
			console.log('WebSocket Client Connected');
		}

		this.onclose =  function(){
			console.log('echo-protocol Client Closed');
		}

		this.onerror =  function(){
			console.log('Connection Error');
		}
		
		this.onmessage = function(e) {
			if (typeof e.data === 'string') {
				console.log("Received: '" + e.data + "'");
			}
		}
	}

	sendText(text) {
		console.log(this.readyState);
		if (this.readyState === this.OPEN) {
			send(text);
		}
	}
}