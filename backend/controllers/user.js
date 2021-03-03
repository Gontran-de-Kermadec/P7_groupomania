const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConnect = require('../connect');
const sanitize = require('sanitize-html');
//const configConnect = require('../connect')

//const connection = mysql.createConnection(dbConnect);

exports.signup = (req, res, next) => {
    //let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    // if (!regexEmail.test(req.body.email)) {
    //     return res.status(400).json({error: 'Format email non valide'});
    // } else {
    //     bcrypt.hash(req.body.password, 10)
    //     .then(hash => {
    //         const user = new User({
    //             email: req.body.email,
    //             password: hash
    //         });
    //         user.save()
    //         .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
    //         .catch(error => res.status(400).json({error}))
    //     })
    //     .catch(error => res.status(500).json({error}))
    // }
    let name = sanitize(req.body.name);
    let mail = sanitize(req.body.email);
    let pass = sanitize(req.body.password);
    dbConnect.query('SELECT email FROM users where email=?', mail, function(err, resp) {
        if(err) throw err;
        if(resp.length !== 0) {
            console.log(resp);
            res.status(409).json({message: 'Email déjà existant'});
        } else if(resp.length === 0) {
            bcrypt.hash(pass, 10)
            .then(hash => {
                let data = [name, mail, hash];
                dbConnect.query(`INSERT INTO users SET name=?, email=?, password=?`, data, function(err, result) {
                    if(err) throw err;
                    if(result) {
                        //console.log(result);
                        res.status(201).json({message: 'Utilisateur crée'});
                        //res.end('Voilà la réponse du serveur !');
                    }
                });
            })
            .catch(error => res.status(500).json({error}));
        }
    })
    // const user = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }
    // console.log(user.password);
};


exports.login = (req, res, next) => {
    //let email = req.body.email;
    let RANDOM_TOKEN_SECRET = 'zGTNYHbegATm0k$wYprfQqmZifuDfLIv4m_CAMj3eBN6o6Zd7g9u'
    let email = sanitize(req.body.email);
    let password = sanitize(req.body.password);
    dbConnect.query(`SELECT * FROM users WHERE email=?`,email, function(err, result) {
        if(err) {
            //throw err;
            console.log(err);
        }
        if(result.length !== 0) {
            console.log(result);
            bcrypt.compare(password, result[0].password)
            .then(valid => {
                if(!valid) { 
                    return res.status(401).json({ error: 'Mot de passe incorrect !'})
                }
                console.log('user trouvé');
                res.status(200).json({ 
                    userId: result[0].id,
                    name: result[0].name,
                    token: jwt.sign(
                        {userId: result[0].id}, 
                        RANDOM_TOKEN_SECRET,
                        { expiresIn: '2h'}
                    )
                })
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            console.log('email incorrect');
        }
    })
    //     bcrypt.compare(req.body.password, user.password)
    //     .then(valid => {
    //         if(!valid) {
    //          return res.status(401).json({ error: 'Mot de passe incorrect !'})
    //         }
}