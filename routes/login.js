var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var crypto = require('crypto');
var router = express.Router();

var hasher = crypto.createHash('md5');
var userInfo = null;

router.post('/', function (req, res, next) {
    var username = req.body.username;
    hasher.update(req.body.password);
    var hashmsg = hasher.digest('hex');
    console.log(hashmsg);
    db.executeSql(db.connect(), 'select * from t_user where user_name = \'' + username + '\'', function(result){
        console.log('执行sql', result);
        console.log('typeof result', typeof result);
        console.log('JSON.stringify(result)', JSON.stringify(result) == '');
        console.log('result ===1 ', result == ''); // 验证得到此方法可以判断是否查询到值了
        console.log('result ===2 ', !result == true);
        console.log('result ===3 ', result == false);
        console.log('result ===4 ', !result == false);
        var data = {
            code: 0,
            msg: '登录成功!'
        };
        if(result == ''){
            data = {
                code: 1,
                msg: '用户名不存在!'
            };
        }else{
            userInfo = result;
        }
        res.end(JSON.stringify(data));
    });
});
var getUser = function(){
    return userInfo;
};
var setUser = function(userData){
    for(var p in userData){
        if(p in userInfo){
            userInfo[p] = userData[p];
        }
    }
};
module.exports = {
    router: router,
    getUser: getUser,
    setUser: setUser
};
