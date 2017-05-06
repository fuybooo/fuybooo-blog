var Login = require('./login');
var WebSocketServer = require('ws').Server;
var createWebSocket = function(){
    var wss = new WebSocketServer({port: 3004});
    wss.on('connection', function(ws){
        // 连接成功
        ws.on('message', function(message){
            // 登录成功之后建立长连接
            if(message === 'loginSuccess'){
                if(!Login.getUser()){
                    // 向前台发送重复登录的消息
                    ws.send('multipleLogin');
                }else{
                    // 向前台发送第一次登录的信息
                    ws.send('firstLogin');
                }
            }
            
        });
    });
};

module.exports = createWebSocket;
