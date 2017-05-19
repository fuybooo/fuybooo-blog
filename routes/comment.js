var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var utils = require('../public/javascripts/common/utils');

var router = express.Router();

// 处理post请求
router.post('/', function (req, res, next) {
    // 获取用户的session信息

    var session_user = req.session.user;
    if(!session_user){
        // 用户未登录
        res.end(JSON.stringify({
            code: -1,
            msg: '未登录'
        }));
    }



    var username = req.body.username;
    var password_md5 = utils.makeMd5(req.body.password);
    var client = db.connect();
    db.executeSql(client, 'select * from t_user where user_name = \'' + username + '\' and user_password = \'' + password_md5 + '\'', function(result){
        var data = {
            code: 0,
            msg: '登录成功!'
        };
        if(result.length > 0){
            // 登录成功,设置session
            req.session.user = result[0];
            data.data = result[0];
        }else{
            data = {
                code: 1,
                msg: '用户名不存在!'
            };
        }
        res.end(JSON.stringify(data));
    });
    client.end();
});

// 处理get请求
router.get('/', function (req, res, next) {
});
module.exports = router;
