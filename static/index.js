var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);
var currQuery = "";
$(document).ready(function() {
	$("button#submit").click(submitQuery);
	$("#comment").keypress(function(e){
		if(e.which == 13) {
			e.preventDefault()
			currQuery = submitQuery()
		}
	})
	ws.onmessage = function(event){
	var obj = JSON.parse(event.data)
	if(obj.error)
		console.log(JSON.stringify(obj.error))
	else if(obj.aggregate.sentiment == "negative")
		startBot(event)
	else
		$('footer').append('<p class="review">' + currQuery + '</p>')
	} 
})

function submitQuery() {
	if($("#comment").val() == "")
		return "";
	var query = $("#comment").val();
	$("#comment").val("");
	ws.send("querytext::" + query);
	console.log("emitted" + query);
	return query;
}

function startBot(event) {
	var obj = JSON.parse(event.data)
	console.log('We got a negative review: ' + JSON.stringify(obj))
	else
		$("p#chatbot").html(JSON.stringify(obj))
}