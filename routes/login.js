var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var utils = require('../public/javascripts/common/utils');


var router = express.Router();

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password_md5 = utils.makeMd5(req.body.password);
    console.log('登录session:',req.session);
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
module.exports = router;
