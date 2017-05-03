var express = require('express');
var router = express.Router();

/* GET request data */
router.post('/', function (req, res, next) {
    console.error('req', req.body);// 获取post请求参数
    var object = {
        a: 'a',
        b: 'b',
        c: 'c'
    };
    res.end(JSON.stringify(object));
});

module.exports = router;
