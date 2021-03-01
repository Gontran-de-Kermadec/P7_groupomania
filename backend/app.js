const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const userRoutes = require('./routes/user');

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
// app.post('/signup', (req,res) => {
//     console.log(req.body.name);
//     let name = req.body.name;
//     let mail = req.body.email;
//     let pass = req.body.password;
//     let data = [name, mail, pass]
//     res.end('Voilà la réponse du serveur !');
//     db.query("INSERT INTO users SET name=?, email=?, password=?", data, function(err, result) {
//           if(err) throw err;
//           console.log(result);
//         })
// })


module.exports = app;