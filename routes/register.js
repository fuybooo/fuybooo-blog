var UUID = require('node-uuid');
var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var hasher = crypto.createHash('md5');
    hasher.update(password);
    var hashmsg = hasher.digest('hex');
    console.log(hashmsg);
    var id = UUID.v1();
    var date = new Date();
    var userId = (date.getMilliseconds() + '').slice(-10);
    var userState = 1;
    var userEntryDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() + 1)).slice(-2);
    db.executeSql(db.connect(),
        'insert into t_user(id, user_id, user_name, user_password,user_state, user_entry_date) values(' +
        id + userId + username + hashmsg + userState + userEntryDate +
        ')',
        function(result){
            console.log(result);
            var data = {
                code: 0,
                msg: '注册成功!'
            };
            if(result == ''){
                data = {
                    code: -1,
                    msg: '注册失败!'
                }
            }
            res.end(JSON.stringify(data));
    });
});

module.exports = router;
