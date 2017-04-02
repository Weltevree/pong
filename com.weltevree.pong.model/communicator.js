/**
 * Communicator as worker implementation
 */

// not finished

onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}

function Communnicator() {
	
	this.logon = function(){
		
		this.socket = new MySocket("ws://localhost:7777/myapp", "echo-protocol");
		this.socket.addEventListener("open", function(event) {
			var command = JSON.stringify([ "<LOGIN>", user ]);
			console.log(command);
			this.socket.send(command);
		});
		
	}
	
}