var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var utils = require('../public/javascripts/common/utils');

var router = express.Router();

// 处理post请求
router.post('/', function (req, res, next) {
    // 获取用户的session信息

    var session_user = req.session.user;
    if(!session_user){
        // 用户未登录
        res.end(JSON.stringify({
            code: -1,
            msg: '未登录'
        }));
    }

    var action = req.body.action;
    var sql = '';
    var client = db.connect();
    switch(action) {
        case 'save':
            sql = 'insert into t_topic (id,topic_title,topic_desc,topic_content,user_id,topic_date,topic_type) values (' +
                '\'' + utils.getUuid() + '\',' +
                '\'' + req.body.title + '\',' +
                '\'' + req.body.desc + '\',' +
                '\'' + req.body.content + '\',' +
                '\'' + session_user.user_id + '\',' +
                '\'' + utils.dateFormatter(new Date()) + '\',' +
                req.body.type +
                ')';
            db.executeSql(client, sql, function(result){
                var data = {
                    code: 0,
                    msg: '保存成功'
                }
                if(!result){
                    data = {
                        code: 1,
                        msg: '保存失败'
                    }
                }
                res.end(JSON.stringify(data));
            });
            break;
    }
    client.end();
});

// 处理get请求
router.get('/', function (req, res, next) {
});
module.exports = router;
