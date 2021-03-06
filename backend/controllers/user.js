require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConnect = require('../connect');
const sanitize = require('sanitize-html');


exports.signup = (req, res, next) => {
    let name = sanitize(req.body.name);
    let mail = sanitize(req.body.email);
    let pass = sanitize(req.body.password);
    let passwordLength = 8;
        dbConnect.query('SELECT email FROM users where email=?', mail, function(err, resp) {
            if(err) throw err;
            if(resp.length !== 0) {
                console.log(resp);
                res.status(409).send('Cet email est déjà existant');
            } else if(resp.length === 0) {
                bcrypt.hash(pass, 10)
                .then(hash => {
                    let data = [name, mail, hash];
                    dbConnect.query(`INSERT INTO users SET name=?, email=?, password=?`, data, function(err, result) {
                        if(err) throw err;
                        if(result) {
                            res.status(201).json({message: 'Utilisateur crée'});
                        }
                    });
                })
                .catch(error => res.status(500).json({error}));
            }
        })
};


exports.login = (req, res, next) => {
    let email = sanitize(req.body.email);
    let password = sanitize(req.body.password);
    dbConnect.query(`SELECT * FROM users WHERE email=?`,email, function(err, result) {
        if(err) {
            console.log(err);
        }
        if(result.length !== 0) {
            bcrypt.compare(password, result[0].password)
            .then(valid => {
                if(!valid) { 
                    return res.status(401).json({ error: 'Mot de passe incorrect !'})
                }
                res.status(200).json({ 
                    name: result[0].name,
                    token: jwt.sign(
                        {userId: result[0].id}, 
                        process.env.RANDOM_TOKEN_SECRET,
                        { expiresIn: '12h'}
                    )
                })
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            console.log('email incorrect');
            res.status(404).json({message: 'utiisateur inconnu !'})
        }
    })
}
//middleware pour recuperer l'id du user
exports.getUserId = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    dbConnect.query(`SELECT id,admin FROM users WHERE id=?`, userId, function(err, result) {
        if(err) throw err;
        if(result) {
            res.status(200).json({userId: result[0].id, admin: result[0].admin});
        }
    });
}

//middleware qui supprime un compte mais avant annule les likes de l'utilisateur
exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    console.log('ID:', req.params.id);
    dbConnect.query(`UPDATE post INNER JOIN opinion ON post.id = opinion.opinion_postId SET likes = likes - 1 WHERE opinion_userId=? AND opinion.votes = 1 AND opinion_postId = post.id`, userId)
    dbConnect.query(`UPDATE post INNER JOIN opinion ON post.id = opinion.opinion_postId SET dislikes = dislikes - 1 WHERE opinion_userId=? AND opinion.votes = -1 AND opinion_postId = post.id`, userId)
    dbConnect.query('DELETE FROM users WHERE id=?', userId, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({message:'compte supprimé'})
    })
}