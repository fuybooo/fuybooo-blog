var WebSocket = require('ws');
var users = [];
var createWebSocket = function(){
    var wss = new WebSocket.Server({port: 3004});
    wss.broadcast = function(data){
        wss.clients.forEach(function(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data);
            }
        });
    };
    wss.on('connection', function(ws){

        // 连接成功
        ws.on('message', function(data){

            if(users.indexOf(data) === -1){
                users.push(data);
            }else{
                wss.clients.forEach(function(client){
                    if(client !== ws && client.readyState === WebSocket.OPEN){
                        if(client.session.user_name === data){
                            var msg = {
                                code: 1,
                                msg: '您的账号在其他地方被登录'
                            }
                            client.send(JSON.stringify(msg));
                        }
                    }
                });
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
