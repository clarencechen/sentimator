var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);
var dummy = "This restaraunt\'s burgers smelled terrible."
$(document).ready(function() {
	
	ws.onopen = function(){
		ws.send("querytext::" + dummy)
	}
	ws.onmessage = function(event){
 		var obj = JSON.parse(event.data)
 		console.log(JSON.stringify(obj))
 		if(obj.error)
 			$("p.analysis").html(JSON.stringify(obj.error))
 		else
 			$("p.analysis").html(JSON.stringify(obj))
 	}
})