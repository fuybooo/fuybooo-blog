var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var router = express.Router();


/* GET request data */
router.get('/', function (req, res, next) {
    console.error('req', req.query);// 获取get请求参数
    console.error('req', req.body);// 获取post请求参数

    var client = db.connect();
    db.executeSql(client, 'select * from t_user', function(result){
        console.log('执行sql', result);
        var object = {
            a: 'a',
            b: 'b',
            c: 'c'
        };
        res.end(JSON.stringify(object));
    });

});

module.exports = router;
