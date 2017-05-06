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
    db.executeSql(db.connect(), 'select * from t_user where user_name = \'' + username + '\'', function(result){
        var data = {
            code: 0,
            msg: '登录成功!',
            data: result
        };
        if(!result){
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
