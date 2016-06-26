
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

function setUpSocket() {
	var WebSocketServer = require("ws").Server
	var wss = new WebSocketServer({server: server})
	console.log("websocket server created")
	wss.on("connection", function(ws) {
		console.log("websocket connection open")
		ws.on("message", function(data) {//data from webpage
			console.log('received data')
			var stuff = data.split("::")
			var id = stuff[0]
			var data = stuff[1]
		
			switch (id) {
				case "querytext":
				{
					var formatted = {'text' : data}
					console.log('about to call api')
					callQuery(formatted, function(resp) {
						console.log("In callback")
						ws.send(JSON.stringify(resp))//send to webpage
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

function callQuery(data, callback) {
	client.post('analyzesentiment', data, function(err, resp) {
		if(err)
		{
			console.log('An error occured! ' + err)
			bail(err, callback)
		}
		else
		{
			console.log('We got ' + JSON.stringify(resp.body))
			callback(resp.body);
		}
	})
}

function bail(err, callback) {
	var error = {isError: true, error: err}
	callback(error)
}