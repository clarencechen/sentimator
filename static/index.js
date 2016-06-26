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
	else if(obj.negative[0])
		startBot(event)
	else
		$('footer').append('<p class="review">' + currQuery + '</p>')
	} 
})
$(document).resize(function(event) {
	display_popup(true, false)
})
function submitQuery() {
	if($("#comment").val() == "")
		return "";
	var query = $("#comment").val();
	$("#comment").val("");
	ws.send("sentiquery::" + query);
	console.log("emitted" + query);
	return query;
}

function startBot(event) {
	var obj = JSON.parse(event.data)
	console.log('We got a negative review: ' + JSON.stringify(obj))
	display_popup(true, true)
}

function display_popup(maintain, show) {
	var element = document.getElementById('popup');
	if(element !== undefined && maintain === true)
	{
		element.style.right = "220 px";
		element.style.display = "block";
	}
	else if(element === undefined && show === true)
	{
		register_popup(0, 'chatbot')
	}
	else if(show === false)
	{
		element.style.display = "none";
	}
}

//creates markup for a new popup. Adds the id to popups array.
function register_popup(id, name) {
	var element = '<div class="popup-box chat-popup" id="'+ id +'">';
	element += '<div class="popup-head">';
	element += '<div class="popup-head-left">'+ name +'</div>';
	element += '<div class="popup-head-right"><a href="javascript:display_popup(false, false);">&#10005;</a></div>';
	element += '<div style="clear: both"></div></div><div class="popup-messages"></div></div>';
	
	$("body")[0].append(element)
}