var crypto = require('crypto');
var UUID = require('node-uuid');

var makeMd5 = function(data){
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
};
var getUuid = function(){
    return UUID.v1();
};
var dateFormatter = function(date){
    var formate = arguments[1] || 'yyyy-MM-dd';
    var dateValue = '';
    switch (formate){
        case 'yyyy-MM-dd':
            dateValue = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() + 1)).slice(-2);
            break;
    }
    return dateValue;
};
var STATUS = {
        NOT_LOGGED_IN: -1,
        SUCCESS: 0,
        ERROR: 1
    };

module.exports = {
    makeMd5: makeMd5,
    getUuid: getUuid,
    dateFormatter: dateFormatter,
    STATUS: STATUS
};