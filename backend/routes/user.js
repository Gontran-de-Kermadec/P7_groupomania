const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
//router.post('/login', userCtrl.login);
// router.post('/signup', (req, res, next) => {
//     const user = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     }
//     db.query(`INSERT INTO groupomania SET name=${user.name}, email=${user.email}, password=${user.password}`, function(err, result) {
//         if(err) throw err;
//         if(result) {
//             console.log(result);
//         }
//     });
//     res.end('Voilà la réponse du serveur !');
// });



module.exports = router;