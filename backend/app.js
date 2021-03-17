const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "groupomania",
//     password: "groupomania",
//     database: "groupomania"
// });
// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connecté à la base de données MySQL!");
// });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())


app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);
app.use('/', likeRoutes);


module.exports = app;