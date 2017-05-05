var WebSocketServer = require('ws').Server;
var createWebSocket = function(){
    var wss = new WebSocketServer({port: 3004});
    wss.on('connection', function(ws){
        // 连接成功
        ws.on('message', function(message){
            if(message === 'fuybooo'){
                setInterval(function(){
                    // 接收消息 向服务器发送数据
                    ws.send('ooobyuf');
                }, 5000);
                
            }
        });
    });
};

module.exports = createWebSocket;
