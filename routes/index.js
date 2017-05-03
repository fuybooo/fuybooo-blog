var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    var object = {
        a: 'a',
        b: 'b',
        c: 'c'
    };
    res.end(JSON.stringify(object));
});

module.exports = router;
