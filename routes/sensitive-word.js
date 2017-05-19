var express = require('express');
var db = require('../public/javascripts/common/db-connect');
var utils = require('../public/javascripts/common/utils');

var router = express.Router();

// 处理post请求
router.post('/', function (req, res, next) {

    var action = req.body.action;
    var sql = '';
    console.log('打开连接')
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
        case 'validate':
            var validateSensitiveWord = function(value){
                var code = 0;
                for(var i=0,l=global.sensitiveWords.length;i<l;i++){
                    var item = global.sensitiveWords[i];
                    if(value.indexOf(item.sensitive_word) !== -1){
                        code = 1;
                        break;
                    }
                }
                return code;
            };
            if(!global.sensitiveWords){
                sql = 'select sensitive_word from t_sensitive_word';
                db.executeSql(client, sql, function(result){
                    // 缓存结果集
                    global.sensitiveWords = result;
                    client.end();
                    res.end(JSON.stringify({code:validateSensitiveWord(req.body.value)}));
                });
            }else{
                res.end(JSON.stringify({code:validateSensitiveWord(req.body.value)}));
            }
            break;
    }

});

// 处理get请求
router.get('/', function (req, res, next) {
});
module.exports = router;
