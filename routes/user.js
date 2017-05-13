var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var where = '';
    var username = req.query.username;
    console.log('用户名',username);
    if(username){
        where += 'user_name = \'' + username + '\'';
    }
    var sql = 'select * from t_user' + where + ' order by user_name asc';
    console.log('sql',sql);
    db.executeSql(db.connect(), sql, function(result){
        console.log('执行sql', result);
        var data = {
            code: 0,
            msg: '查询完成',
            data: result
        };
        if(!result){
            data = {
                code: 1,
                msg: '没有查询到数据!',
                data: []
            };
        }
        res.end(JSON.stringify(data));
    });
});

module.exports = router;
