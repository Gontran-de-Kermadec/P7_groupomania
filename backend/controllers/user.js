const mysql = require('mysql');
const bcrypt = require('bcrypt');
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
    bcrypt.hash(pass, 10)
    .then(hash => {
        console.log(hash);
        let data = [name, mail, hash];
        dbConnect.query(`INSERT INTO users SET name=?, email=?, password=?`, data, function(err, result) {
            if(err) throw err;
            if(result) {
                console.log(result);
                res.status(201).json({message: 'Utilisateur crée'});
                //res.end('Voilà la réponse du serveur !');
            }
        });
    })
    .catch(error => res.status(500).json({error}));
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    console.log(user.password);
    //console.log(data[0]);
   
    // const user = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }
    // user.save()
    // .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
    // .catch(error => res.status(400).json({error}))
};


exports.login = (req, res, next) => {
    let email = req.body.email;
    dbConnect.query(`SELECT email FROM users WHERE email='${req.body.email}'`, function(err, result) {
        if(err) throw err;
        if(result) {
            console.log(result);
            console.log('user trouvé');
            res.status(200).json({ email: result[0].email})
            res.status(200).json({ result })
        }
    })
    // User.findOne({ email: req.body.email}) 
    // .then(user => {
    //     console.log(user);
    //     if (!user) {
    //        return res.status(401).json({ error: 'Utilisateur inconnu !'})
    //     }
    //     bcrypt.compare(req.body.password, user.password)
    //     .then(valid => {
    //         if(!valid) {
    //          return res.status(401).json({ error: 'Mot de passe incorrect !'})
    //         }
    //         res.status(200).json({
    //             userId: user._id,
    //             token: jwtoken.sign(
    //                {userId: user._id},
    //                'RANDOM_TOKEN_SECRET',
    //                {expiresIn: '24h'}
    //             )
    //         });
    //     })
    //     .catch(error => res.status(500).json({ error }));
    // })
    // .catch(error => res.status(500).json({ error }));
}