var UUID = require('node-uuid');
var db = require('../public/javascripts/common/db-connect');
var utils = require('../public/javascripts/common/utils');
var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password_md5 = utils.makeMd5(req.body.password);
    var id = UUID.v1();
    var date = new Date();
    var userId = date.getTime();
    var userState = 1;
    var userEntryDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() + 1)).slice(-2);
    var sql = 'insert into t_user(' +
        'id, ' +
        'user_id, ' +
        'user_name, ' +
        'user_password,' +
        'user_phone_no,' +
        'user_email,' +
        'user_sex,' +
        'user_home_address,' +
        'user_company_address,' +
        'user_native_place,' +
        'user_card_id,' +
        'user_birthday,' +
        'user_state, ' +
        'user_entry_date' +
        ') values(' +
        '\'' + id + '\',\'' +
        userId + '\',\'' +
        username + '\',\'' +
        password_md5 + '\',\'' +
        (req.body.phoneNo || '') + '\',\'' +
        (req.body.email || '') + '\',' +
        (req.body.sex || 0) + ',\'' +
        (req.body.homeAddress || '') + '\',\'' +
        (req.body.companyAddress || '') + '\',\'' +
        (req.body.nativePlace || '') + '\',\'' +
        ('') + '\',' +
        ('null') + ',' +
        userState + ',\'' +
        userEntryDate + '\')';
    console.log('addUserSql:', sql);
    var client = db.connect();
    db.executeSql(client, sql, function (result) {
        var data = {
            code: 0,
            msg: '添加成功!'
        };
        if (!result) {
            data = {
                code: -1,
                msg: '添加失败!'
            }
        }
        res.end(JSON.stringify(data));
    });
    client.end();
});

module.exports = router;
