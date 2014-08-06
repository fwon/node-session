var mysql = require('mysql');
var settings = require('./settings');
var connection = mysql.createConnection({
  host: settings.host,
  database: settings.db,
  user: settings.dbUser,
  password: settings.dbPwd
});

connection.connect();

module.exports = connection;
// connection.query('SELECT * from syss_mates where id=33', function(err, rows, fields) {
//   if(err) {
//     throw err;
//   }
//   console.log('this user is:' + rows[0]['beg_time']);
// });

// connection.end();