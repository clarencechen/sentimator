var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);
var dummy = "This resteraunt\'s burgers smelled."
$(document).ready(function() {
	
	ws.onopen = function(){
		ws.send("querytext::" + dummy)
	}
	ws.onmessage = function(event){
 		var obj = JSON.parse(event.data)
 		console.log(JSON.stringify(obj))
 		if(obj.error)
 			$("#analysis").html(JSON.stringify(obj.error))
 		else
 			$("#analysis").html(JSON.stringify(obj))
 	}
})