var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);

$(document).ready(function() {
	ws = new WebSocket(host);
	ws.onmessage = function(event){
 		var obj = JSON.parse(event.data)
 		console.log(JSON.stringify(obj))
 		if(obj.error)
 			$("#analysis").html(JSON.stringify(obj.error))
 		else
 			$("#analysis").html(JSON.stringify(obj))
 	}
 }
var dummy = "This resteraunt\'s burgers smelled."
ws.send("querytext::" + dummy)