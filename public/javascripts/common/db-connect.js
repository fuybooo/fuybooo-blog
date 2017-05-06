var mysql = require('mysql');

function connectServer() {
    return mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'fuybooo_blog'
    });
}

function executeSql(client, sql, callback){
    client.query(sql, function(err, results, fields){
        if(err){
            throw err;
        }else{
            callback(results);
        }
    });
}

exports.connect = connectServer;
exports.executeSql  = executeSql;