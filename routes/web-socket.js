var WebSocketServer = require('ws').Server;
var users = [];
var createWebSocket = function(){
    var wss = new WebSocketServer({port: 3004});
    wss.on('connection', function(ws){
        // 连接成功
        ws.on('message', function(message){
            // 登录成功之后建立长连接
            if(users.indexOf(message) === -1){
                users.push(message);
                ws.send('登录成功');
            }else{
                ws.send('multipleLogin');
            }
            
        });
    });
};
var getUsers = function(){
    return users;
}
var deleteUser = function(username){
    users.splice(users.indexOf(username), 1);
}
module.exports = {
    createWebSocket: createWebSocket,
    getUsers: getUsers,
    deleteUser: deleteUser
};
