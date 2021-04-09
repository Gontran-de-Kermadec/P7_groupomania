require('dotenv').config();
const mysql = require('mysql');

const dbConnect = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "groupomania",
    port: process.env.DB_PORT
});

dbConnect.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

module.exports = dbConnect;