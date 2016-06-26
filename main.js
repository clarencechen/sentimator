
console.log('app started')

var express = require('express')
var havenondemand = require('havenondemand')
var client = new havenondemand.HODClient('eb549982-2c3d-48d9-9c50-8b41a51151ec', 'v1')
var http = require('http')

var app = express()

app.use('/', express.static(__dirname+"/static"))

var port = (process.env.PORT || 5000);
var server = http.createServer(app)
server.listen(port)

var WebSocket = require("ws")
var ws = new WebSocket('wss://sentimator.herokuapp.com/')
var WebSocketServer = require("ws").Server
var wss = new WebSocketServer({server: server})
console.log("websocket server created")

function setUpSocket() {
	wss.on("connection", function(ws) {
		console.log("websocket connection open")
		ws.on("message", function(data) {//data from webpage
			var stuff = data.split("::")
			var id = stuff[0]
			var data = stuff[1]
		
			switch (id) {
				case "querytext":
				{
					var formatted = {'text' : data}
					callQuery(formatted, function(formatted) {
						console.log("In callback")
						ws.send(JSON.stringify(data))//send to webpage
					})
					break
				}
				default:
			
			}
	});
	ws.on("close", function() {
		console.log("websocket connection close")
		setUpSocket()
	})
})
}

setUpSocket()

var jobID
/*
function fetchData() {

}
*/
callQuery(data, )
function callQuery(data, callback) {
	client.post('analyzesentiment', data, true, function(err, resp) {
		jobID = resp.body.jobID
		console.log(jobID)
	})
	
	client.getJobStatus(jobID, function(err, resp) {
		if(err)
		{
			console.log(err)
			bail(err, callback)
		}
		else
			console.log(resp.body)
	})
}

function bail(err, callback) {
	var error = {isError: true, error: err}
	callback(error)
}