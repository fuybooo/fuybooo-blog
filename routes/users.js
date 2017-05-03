var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var object = {
        a: 'a',
        b: 'b'
    };
    res.end(JSON.stringify(object));
});

module.exports = router;
