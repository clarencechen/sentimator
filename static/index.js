var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);
$(document).ready(function() {
	$("button#submit").click(submitQuery);
	$("#comment").keypress(function(e){
		if(e.which == 13) {
			e.preventDefault()
			submitQuery()
		}
	})
	ws.onmessage = function(event){
 		var obj = JSON.parse(event.data)
 		console.log(JSON.stringify(obj))
 		if(obj.error)
 			$("p#chatbot").html(JSON.stringify(obj.error))
 		else
 			$("p#chatbot").html(JSON.stringify(obj))
 	}
})

function submitQuery() {
	if($("#comment").val() == "")
		return;
	var query = $("#comment").val();
	$("#comment").val("");
	ws.send("querytext::" + query);
	console.log("emitted" + query);
}
	