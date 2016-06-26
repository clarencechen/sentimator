var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);
var currQuery = "";
var currLine = "";
$(document).ready(function() {
	$("button#submit").click(submitQuery);
	$("#comment").keypress(function(e){
		if(e.which == 13) {
			e.preventDefault()
			currQuery = submitQuery()
		}
	})
	$("#chatbot").on('click', '.popup-send', function(e) {
		submitToBot();
	})
	$('#chatbot').on('click', '.popup-reply', function(e) {
		if(e.which == 13) {
			e.preventDefault()
			submitToBot()
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
	var element = document.getElementById('0');
	if(element !== null && maintain === true)
	{
		element.style.display = "block";
	}
	else if(element === null && show === true)
	{
		register_popup(0, 'chatbot')
	}
	else if(show === false)
	{
		element.style.display = "none";
	}
}

function submitToBot() {
	if($(".popup-reply").val() == "")
		return "";
	var line = $(".popup-reply").val();
	$(".popup-reply").val("");
//	ws.send("botquery::" + query);
//	console.log("emitted" + query);
	mainroutine(line)
}

//creates markup for a new popup. Adds the id to popups array.
function register_popup(id, name) {
	var	element = '<div class="col-md-4 col-md-offset-4">' 
	element += '<div class="popup-box chat-popup" id="'+ id +'">';
	element += '<div class="popup-head">';
	element += '<div class="popup-head-left">'+ name +'</div>';
	element += '<div class="popup-head-right"></div>';
	element += '<div style="clear: both"></div></div><div class="popup-messages"></div>'
	element += '<div class="popup-foot">';
	element += '<textarea class="popup-reply" rows="1"></textarea>';
	element += '<button class="popup-send" id="send">Send</button>';
	element += '</div></div>'
	$("#chatbot").html(element)
}