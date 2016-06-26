function mainroutine(input) {
	$('div.popup-messages').append('<p class="user-messages">' + input + '</p>')
	ws.send("sentiquery::" + input);
	console.log("emitted " + input);
	ws.onmessage = function(event){
		var last = $('p.bot-messages')[$('p.bot-messages').length -1].textContent
		var output = "";
		var obj = JSON.parse(event.data)
		if(obj.error)
			console.log(JSON.stringify(obj.error))
		else if(obj.negative[0])
		{
			if(last === "Hi! We noticed that you did not enjoy our restaurant. Can we help improve your experience?" || last === "I didn't really get what complaints you have. Please try rephrasing your sentence.")
				output = "I'm sorry that you didn't like " + obj.negative[0].topic +". Tell me more."
			else if(last.indexOf('I\'m sorry that you didn\'t like ') > -1 || last === "Please be a bit more specifc about your complaints. I know that people can jump to conclusions really quickly.")
				output = "We will try our utmost to improve our " + obj.negative[0].topic + " in the future. Also, as an apology, we will offer you a free A La Carte item if you deicide to come again."
			else
				output = "Goodbye."
		}
		else
		{
			if(last === "Hi! We noticed that you did not enjoy our restaurant. Can we help improve your experience?" || last === "I didn't really get what complaints you have. Please try rephrasing your sentence.")
				output = "I didn't really get what complaints you have. Please try rephrasing your sentence."
			else if(last.indexOf('I\'m sorry that you didn\'t like ') > -1 || last === "Please be a bit more specifc about your complaints. I know that people can jump to conclusions really quickly.")
				output = "Please be a bit more specifc about your complaints. I know that people can jump to conclusions really quickly."
			else
				output = "Goodbye."
		}
		$('div.popup-messages').append('<p class="bot-messages">' + output + '</p>')
	}
}
