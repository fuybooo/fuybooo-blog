var crypto = require('crypto');



var makeMd5 = function(data){
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
} ;
// var users = {};
// var currentUser = null;
// var setCurrentUser = function(user){
//     currentUser = user;
// };
// var getCurrentUser =
// var getUsers = function(){
//     return users;
// };
// var getUserByUserId = function(userId){
//     return users[userId];
// };
// var addUser = function(user){
//     users[user.userId] = user;
// };
// var deleteUser = function(userId){
//     users[userId] = null;
// };
module.exports = {
    makeMd5: makeMd5
};