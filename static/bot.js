var convpatterns = [
	[".*hello.*","Greetings."],
	["^I (?:wish |would like )(?:I could |I was able to |to be able to )(.*)\.","What would it be like to be able to $1?"],
	["I need (.*)\.?" , "Why do you need $1?", "Would it really help you to get $1?" , "Are you sure you need $1?"],
	["^When(.*) stole (.*)\.?","What happened when $2 was stolen?","And how did you feel then?","Was $2 ever found?"],
	["I'd really like to (.*)\.?","If you had the chance to $1, what would happen next?","Well then, I hope you get to $1."],
	["Why don't you (.*?)[\?]" , "Do you really think I don't $1?","Perhaps eventually I will $1.","Do you really want me to $1?"],
	["Why can't I (.*?)[\?]" , "Do you think you should be able to $1?","If you could $1, what would you do?",  "I don't know -- why can't you $1?","Have you really tried?"],
	["I can't (.*) you\.?","How do you know you can't $1 me?","Perhaps you could $1 me if you tried.", "What would it take for you to $1 me?"],
	["I can't (.*)\.?","How do you know you can't $1?","Perhaps you could $1 if you tried.", "What would it take for you to $1?"],
	["Are you (.*?)[\?]","Why does it matter whether I am $1?","Would you prefer it if I were not $1?","Perhaps you believe I am $1.","I may be $1 -- what do you think?"],
	["What (.*?)[\?]",  "Why do you ask?","How would an answer to that help you?","What do you think?"],
	["How (.*?)[\?]","How do you suppose?","Perhaps you can answer your own question.","What is it you're really asking?"],
	["Because (.*)\.?","Is that the real reason?", "What other reasons come to mind?","Does that reason apply to anything else?","If $1, what else must be true?"],
	["(.*) sorry (.*)\.?", "There are many times when no apology is needed.","What feelings do you have when you apologize?"],
	["I think (.*)\.?","Do you doubt $1?","Do you really think so?","But you're not sure $1?"],
	["(.*) friend(.*)\.?", "Tell me more about your friends.","When you think of a friend, what comes to mind?","Why don't you tell me about a childhood friend?"],
	["Yes\.?","You seem quite sure.","OK, but can you elaborate a bit?"],
	["(.*) computer(.*)\.?","Are you really talking about me?","Does it seem strange to talk to a computer?","How do computers make you feel?","Do you feel threatened by computers?"],
	["Is it (.*?)[\?]","Do you think it is $1?","Perhaps it's $1 -- what do you think?","If it were $1, what would you do?","It could well be that $1."],
	["It is (.*)\.?","You seem very certain.","If I told you that it probably isn't $1, what would you feel?"],
	["Can you (.*) (me |me$).*\?", "Of course I can $1 you.", "Why wouldn't I be able to $1 you?"],
	["Can you (.*?)[\?]","What makes you think I can't $1?","If I could $1, then what?","Why do you ask if I can $1?"],
	["Can I (.*?)[\?]","Perhaps you don't want to $1.","Do you want to be able to $1?","If you could $1, would you?"],
	["You are (.*)\.?","Why do you think I am $1?","Does it please you to think that I'm $1?","Perhaps you would like me to be $1.","Perhaps you're really talking about yourself?"],
	["You're (.*)\.?","Why do you say I am $1?","Why do you think I am $1?", "Are we talking about you, or me?"],
	["I don't (.*)\.?","Don't you really $1?","Why don't you $1?","Do you want to $1?"],
	["I feel (.*)\.?","Good, tell me more about these feelings.","Do you often feel $1?","When do you usually feel $1?","When you feel $1, what do you do?"],
	["I have (.*)\.?","Why do you tell me that you've $1?","Have you really $1?","Now that you have $1, what will you do next?"],
	["I would (.*)\.?","Could you explain why you would $1?","Why would you $1?","Who else knows that you would $1?"],
	["Is there (.*?)[\?]", "Do you think there is $1?","It's likely that there is $1.", "Would you like there to be $1?"],
	["My (.*)\.?", "I see, your $1.","Why do you say that your $1?", "When your $1, how do you feel?"],
	["^You (.*)\.?", "We should be discussing you, not me.","Why do you say that about me?","Why do you care whether I $1?"],
	["Why (.*)\?", "Why don't you tell me the reason why $1?","Why do you think $1?" ],
	["I want (.*)\.?", "What would it mean to you if you got $1?","Why do you want $1?","What would you do if you got $1?","If you got $1, then what would you do?"],
	[".*( the highway| the road).*","The highway is for gamblers, you better use your sense."],
	["(.*) mother(.*)\.?", "Tell me more about your mother.","What was your relationship with your mother like?",  "How do you feel about your mother?","How does this relate to your feelings today?","Good family relations are important."],
	["(.*) father(.*)\.?","Tell me more about your father.", "How did your father make you feel?","How do you feel about your father?","Does your relationship with your father relate to your feelings today?", "Do you have trouble showing affection with your family?"],
	["(.*) child(.*)\.?","Did you have close friends as a child?", "What is your favorite childhood memory?","Do you remember any dreams or nightmares from childhood?","Did the other children sometimes tease you?","How do you think your childhood experiences relate to your feelings today?"],
	["(.*) your fav(o|ou)rite(.*?)[\?]","I really don't have a favorite.","I have so many favorites it's hard to choose one."],
	["(.*?)[\?]","Hmm, not sure I know..", "That's an interesting question...",  "Gosh, I'm not sure I can answer that...","Why do you ask that?","Please consider whether you can answer your own question.",  "Perhaps the answer lies within yourself?","Why don't you tell me?", "If you knew that in one year you would die suddenly, would you change anything about the way you are living now?"],
	["(.*)","Do you have any hobbies?", "I see,  please continue...", "What exactly are we talking about?", "Can you go over that again please..", "Um, i get the feeling this conversation is not going anywhere..",  "oh yeah?",  "hmm, is that so..", "Please tell me more.","Let's change focus a bit... Tell me about your family.","Can you elaborate on that?","I see.","Very interesting.", "I see.  And what does that tell you?","How does that make you feel?","How do you feel when you say that?","If you had to have one piece of music softly playing in your mind for the rest of your life, what would you want it to be?","What room of your home do you spend the most time in?","If you could go back in time and become friends with one famous person, whom would you chose?","Which of the seven dwarfs personifies you best – Dopey, Sneezy, Sleepy, Bashful, Grumpy, Happy, or Doc?","Which animal would you leave out of the ark?"]
	]

//-------
function mainroutine(input) {
	$('div.popup-messages').append('<p class="user-messages">' + input + '</p>')

	var output = conversationpatterns(input)
	$('div.popup-messages').append('<p class="bot-messages">' + output + '</p>')
}


//-------
function conversationpatterns(input) {
	var last = $('p.bot-messages')[$('p.bot-messages').length -1].textContent
	if(last === "Hi! We noticed that you did not enjoy our restaurant. Can we help improve your experience?" || last === "I didn't really get what complaints you have. Please try rephrasing your sentence.")
	{
		ws.send("sentiquery::" + input);
		console.log("emitted " + input);
		ws.onmessage = function(event){
			var obj = JSON.parse(event.data)
			if(obj.error)
				console.log(JSON.stringify(obj.error))
			else if(obj.negative[0])
				output = "I'm sorry that you didn't like the " + obj.negative[0].topic +". Tell me more."
			else
				output = "I didn't really get what complaints you have. Please try rephrasing your sentence."
		}
	}
	else if(last.contains('I\'m sorry that you didn\'t like the ') || last === "Please be a bit more specifc about your complaints. I know that people can jump to conclusions really quickly.")
	{
		ws.send("sentiquery::" + input);
		console.log("emitted " + input);
		ws.onmessage = function(event){
			var obj = JSON.parse(event.data)
			if(obj.error)
				console.log(JSON.stringify(obj.error))
			else if(obj.negative[0])
				output = "We will try our utmost to improve our " + obj.negative[0].topic + " in the future. Also, as an apology, we will offer you a free A La Carte item if you deicide to come again."
			else
				output = "Please be a bit more specifc about your complaints. I know that people can jump to conclusions really quickly."
		}
	}
	else
		output = "Goodbye."
	return output;

/*	for (i=0; i < convpatterns.length; i++) {
		re = new RegExp (convpatterns[i][0], "i");
		if (re.test(input)) {
			len = convpatterns[i].length - 1;
			index = Math.ceil( len * Math.random());
			reply = convpatterns[i][index];
			var output = input.replace(re, reply);
			output = initialCap(output);
			return output;
			break;
		}
	}*/
}

function initialCap(field) {
   field = field.substr(0, 1).toUpperCase() + field.substr(1, field.length)
   return field
}