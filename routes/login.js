var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var username = req.query.username;
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
        }
        res.end(JSON.stringify(data));
    });
});

module.exports = router;
