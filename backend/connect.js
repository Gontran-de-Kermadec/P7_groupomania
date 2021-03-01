const mysql = require('mysql');

const dbConnect = mysql.createConnection({
    host: "localhost",
    user: "groupomania",
    password: "groupomania",
    database: "groupomania"
});

dbConnect.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

module.exports = dbConnect;