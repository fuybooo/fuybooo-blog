var express = require('express');
var webSocket = require('./web-socket');
var router = express.Router();

router.get('/', function (req, res, next) {
    
    webSocket.deleteUser(req.session.user.user_name);
    req.session.user = null;
    res.end();
});
module.exports = router;
