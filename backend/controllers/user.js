const mysql = require('mysql');
const dbConnect = require('../connect');
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
    let name = req.body.name
    let mail = req.body.email;
    let pass = req.body.password;
    let data = [name, mail, pass]
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    console.log(user.password);
    console.log(data[0]);
    dbConnect.query(`INSERT INTO users SET name=?, email=?, password=?`, data, function(err, result) {
        if(err) throw err;
        if(result) {
            console.log(result);
            res.status(201).json({message: 'Utilisateur crée'});
            //res.end('Voilà la réponse du serveur !');
        }
    });
   
    // const user = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }
    // user.save()
    // .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
    // .catch(error => res.status(400).json({error}))
};