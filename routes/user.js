var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var username = req.query.username;
    console.log('用户名',username);
    db.executeSql(db.connect(), 'select * from t_user where user_name = \'' + username + '\'', function(result){
        console.log('执行sql', result);
        var data = {
            code: 0,
            msg: '查询完成'
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
