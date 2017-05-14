var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
        
        var where = '';
        var username = req.query.username;
        if (username) {
            where += 'user_name = \'' + username + '\'';
        }
        var sql = 'select * from t_user' + where + ' order by user_name asc';
        db.executeSql(db.connect(), sql, function (result) {
            var data = {
                code: 0,
                msg: '查询完成',
                data: result
            };
            if (!result) {
                data = {
                    code: 1,
                    msg: '没有查询到数据!',
                    data: []
                };
            }
            res.end(JSON.stringify(data));
        });
});

router.post('/', function (req, res, next) {
    
    var action = req.body.action;
    if (action === 'quickEdit') {
        var sql = 'update t_user set ' + req.body.field + ' = \'' + req.body.value + '\' where id = \'' + req.body.id + '\'';
        db.executeSql(db.connect(), sql, function (result) {
            var data = {
                code: 0,
                msg: '修改成功!',
                data: result
            };
            if(!result){
                data = {
                    code: 1,
                    msg: '修改失败!'
                };
            }
            res.end(JSON.stringify(data));
        });
    } else {
    
    }
});

module.exports = router;
