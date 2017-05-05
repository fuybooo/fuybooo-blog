var express = require('express');
// var WebSocketServer = require('ws').Server;
//
// console.log('WebSocketServer.new');
// var wss = new WebSocketServer({port: 3003});
// wss.on('connection', function(ws){
//     console.log('client connected:' , ws);
//     ws.on('message', function(message){
//         console.log('message:', message);
//     });
// });


var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // console.log('router.get');
    // var wss = new WebSocketServer({port: 3003});
    // wss.on('connection', function(ws){
    //     console.log('client connected:' , ws);
    //     ws.on('message', function(message){
    //         console.log('message:', message);
    //     });
    // });
});

module.exports = router;
