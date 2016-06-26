var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);
var dummy = "This restaraunt\'s burgers smelled terrible."
$(document).ready(function() {
	
	ws.onopen = function(){
		ws.send("querytext::" + dummy)
	}
	$("button#submit").click(submitQuery);
	$("#form-control").keypress(function(e){
		if(e.which == 13) {
			e.preventDefault()
			submitQuery()
		}
	})
	ws.onmessage = function(event){
 		var obj = JSON.parse(event.data)
 		console.log(JSON.stringify(obj))
 		if(obj.error)
 			$("p.chatbot").html(JSON.stringify(obj.error))
 		else
 			$("p.chatbot").html(JSON.stringify(obj))
 	}
})

function submitQuery() {
	if(("#form-control").val == "")
		return;
	var query = $("#form-control").val;
	$("#form-control").val("");
	ws.send("querytext::" + query);
	console.log("emitted" + query);
}
	