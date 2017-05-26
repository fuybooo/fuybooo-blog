var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('===========================================执行es6代码');
    console.log('==let命令==')
    {
        let a = 10;
        var b = 11;
    }


});

module.exports = router;
