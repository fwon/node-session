var http = require('http');
var request = require('request');
var UserModel = require('models/User');
var UserController = function () {
};
UserController.prototype.validata = function(username, password) {
    var userModel = new UserModel(username);
    if(userModel.password === password) {
        return true;
    }
};
module.exports = new UserController();