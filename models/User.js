var mysql = require('database');
var UserModel = function(username){
    this.username = username;
    this.password = 'admin';
};
UserModel.prototype.getPassword = function() {
    mysql.query('select password from member where name="' + this.username + '"', function(err, rows, fields) {
        if (err) throw err;
        console.log('The mobile is: ', rows);
        return rows;
    });
};