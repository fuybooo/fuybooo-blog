var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var router = express.Router();

router.get('/', function (req, res, next) {
    // var sql = 'select * from where user_name = \'' + username + '\'';
    // console.log('sql',sql);
    // db.executeSql(db.connect(), sql, function(result){
    //     console.log('执行sql', result);
    //     var data = {
    //         code: 0,
    //         msg: '查询完成'
    //     };
    //     if(result == ''){
    //         data = {
    //             code: 1,
    //             msg: '用户名不存在!'
    //         };
    //     }
    //     res.end(JSON.stringify(data));
    // });
    
    var data = [
        {
            sort: 1,
            id: 1,
            math: 1,
            chinese: 1,
            english: 1,
            liZong:1,
            wenZong:1
        },
        {
            sort: 2,
            id: 1,
            math: 1,
            chinese: 1,
            english: 1,
            liZong:1,
            wenZong:1
        },
        {
            sort: 3,
            id: 1,
            math: 1,
            chinese: 1,
            english: 1,
            liZong:1,
            wenZong:1
        },
        
    ];
    var response = {
        code: 0,
        msg: '查询成功',
        data: data
    }
    res.end(JSON.stringify(response));
});

module.exports = router;
