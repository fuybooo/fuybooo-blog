var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var utils = require('../public/javascripts/common/utils');

var router = express.Router();

// 处理post请求
router.post('/', function (req, res, next) {
    // 获取用户的session信息

    var session_user = req.session.user;
    // if (!session_user) {
    //     // 用户未登录
    //     res.end(JSON.stringify({
    //         code: -1,
    //         msg: '未登录'
    //     }));
    // }

    var action = req.body.action;
    var sql = '';
    var client = db.connect();
    switch (action) {
        case 'add':
            sql = 'insert into t_topic (id,topic_title,topic_desc,topic_content,user_id,topic_date,topic_type) values (' +
                '\'' + utils.getUuid() + '\',' +
                '\'' + req.body.title + '\',' +
                '\'' + (req.body.desc || '') + '\',' +
                '\'' + (req.body.content || '') + '\',' +
                '\'' + session_user.user_id + '\',' +
                '\'' + utils.dateFormatter(new Date()) + '\',' +
                req.body.type +
                ')';
            db.executeSql(client, sql, function (result) {
                var data = {
                    code: 0,
                    msg: '保存成功'
                };
                if (!result) {
                    data = {
                        code: 1,
                        msg: '保存失败'
                    }
                }
                client.end();
                res.end(JSON.stringify(data));
            });
            break;
        case 'del':
            var ids = req.body.ids.split(',').join('\',\'');
            sql = 'delete from t_topic where id in (\'' + ids + '\')';
            db.executeSql(client, sql, function (result) {
                var data = {
                    code: 0,
                    msg: '删除成功'
                };
                if (!result) {
                    data = {
                        code: 1,
                        msg: '删除失败'
                    }
                }
                client.end();
                res.end(JSON.stringify(data));
            })
    }

});

// 处理get请求
router.get('/', function (req, res, next) {
    // 获取用户的session信息

    var session_user = req.session.user;
    // if (!session_user) {
    //     // 用户未登录
    //     res.end(JSON.stringify({
    //         code: -1,
    //         msg: '未登录'
    //     }));
    // }
    var sql = 'select' +
        ' t.id,' +
        't.topic_content,' +
        't.topic_date,' +
        't.topic_desc,' +
        't.topic_title,' +
        't.topic_type ';
    if (req.query.action === 'validateUniqueTitle') {
        sql += ' from t_topic t where t.topic_title = \'' + req.query.value + '\'';
        var client = db.connect();
        db.executeSql(client, sql, function (result) {
            var data = {
                code: 0
            };
            if (result) {
                data = {
                    code: 1
                };
            }
            client.end();
            res.end(JSON.stringify(data));
        });
    } else if (req.query.action === 'findById') {
        sql += ' from t_topic t where t.id = \'' + req.query.id + '\'';
        var client = db.connect();
        db.executeSql(client, sql, function (result) {
            var data = {
                code: 0,
                data: result
            };
            if (!result) {
                data = {
                    code: 1,
                    msg: '无法通过id查找到对应的记录'
                };
            }
            client.end();
            res.end(JSON.stringify(data));
        });
    } else {
        sql += ', u.user_name from t_topic t LEFT JOIN t_user u on t.user_id = u.user_id where 1 = 1';
        if (req.query.title) {
            sql += ' and t.topic_title like \'%' + req.query.title + '%\'';
        }
        if (req.query.postDateStart) {
            sql += ' and t.topic_date >= \'' + req.query.postDateStart + '\'';
        }
        if (req.query.postDateEnd) {
            sql += ' t.and topic_date <= \'' + req.query.postDateEnd + '\'';
        }
        sql += ' ORDER BY t.topic_date DESC;';
        var client = db.connect();
        db.executeSql(client, sql, function (result) {
            var data = {
                code: 0,
                msg: '查询成功',
                data: result
            };
            if (!result) {
                data = {
                    code: 1,
                    msg: '没有数据或查询失败'
                }
            }
            client.end();
            res.end(JSON.stringify(data));
        });
    }
});
module.exports = router;
