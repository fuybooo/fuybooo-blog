var express = require('express');
var webSocket = require('./web-socket');
var router = express.Router();

router.get('/', function (req, res, next) {
    
    console.log('退出时访问session中的user', req.session.user);
    webSocket.deleteUser(req.session.user.user_name);
    req.session.user = null;
    res.end();
});
module.exports = router;
