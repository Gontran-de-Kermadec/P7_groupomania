const dbConnect = require('../connect');
const sanitize = require('sanitize-html');

//Créer une publication
exports.post = (req, res, next) => {
    let postId = parseInt(sanitize(req.body.getId));
    let postName = sanitize(req.body.postName);
    let postUrl = sanitize(req.body.postUrl);
    console.log(postId);
    let content = sanitize(req.body.postContent);
    let data = [postId, content, postUrl]
    console.log(data);
    if(postUrl === '') {
        dbConnect.query(`INSERT INTO post (userId, name, postContent) VALUES (${postId}, "${postName}", "${content}")`, function(err, result) {
            if(err) throw err;
            if(result) {
                //console.log(result);
                res.status(201).json({message: 'post ajouté'});
                //res.end('Voilà la réponse du serveur !');
            }
        });
    } else {
        dbConnect.query(`INSERT INTO post (userId, name, postContent, postUrl) VALUES (${postId}, "${postName}", "${content}", "${postUrl}")`, function(err, result) {
            if(err) throw err;
            if(result) {
                //console.log(result);
                res.status(201).json({message: 'post ajouté'});
                //res.end('Voilà la réponse du serveur !');
            }
        });
    }
};

//obtenir tous les posts du plus récent au plus vieux.
exports.getAllPosts = (req, res, next) => {
    console.log(req.headers);
    dbConnect.query(`SELECT * FROM post ORDER BY postDate DESC`, function(err, result) {
        if(err) throw err;
        if(result) {
            //console.log(result);
            res.status(200).json(result);
            //res.end('Voilà la réponse du serveur !');
        }
    });
}

//Obtenir les posts d'un seul utilisateur
exports.getMyPosts = (req, res, next) => {
    dbConnect.query(`SELECT * FROM post WHERE userId=? ORDER BY postDate DESC`, req.params.id, function(err, result) {
        if(err) throw err;
        if(result) {
            console.log(result);
            res.status(200).json(result);
            //res.end('Voilà la réponse du serveur !');
        }
    });
}
//Obtenir un seul post
exports.getOnePost = (req, res, next) => {
    dbConnect.query(`SELECT * FROM post WHERE id=?`, req.params.id, function(err, result) {
        if(err) throw err;
        if(result) {
            console.log(result);
            res.status(200).json(result);
            //res.end('Voilà la réponse du serveur !');
        }
    });
}


//Supprimer un post
exports.deleteOnePost = (req, res, next) => {
    dbConnect.query('DELETE FROM post WHERE id=?', req.params.id, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({message:'publication supprimée'})
    })
}

//Like ou dislike d'un post
// exports.likePost = (req, res, next) => {
//     dbConnect.query('SELECT * FROM likes WHERE postId=?', req.params.id, (err, result) => {
//         if(err) throw err;
//         if (result.length === 0) {
//         //if (result === undefined) {
//             console.log(req.body.data.userLiked);
//             dbConnect.query(`INSERT INTO likes (postId, userLiked, isLike) VALUES ( ${req.params.id}, ${req.body.data.userLiked}, 1)`, (err, result) => {
//                 if(err) throw err;
//                 console.log(result); 
//             })
//             console.log(result.length);
//         } else {
//             //dbConnect.query('SELECT postId FROM likes WHERE userLiked=?', req.body.data.userLiked, (err, result) => {
//             dbConnect.query('SELECT userLiked FROM likes WHERE postId=?', req.params.id, (err, result) => {
//                 if(err) throw err;
//                 console.log('deja un like ou dislike');
//                 console.log(result[0].userLiked);
//                 console.log(JSON.stringify(result[0].userLiked));
//                 let neant = JSON.stringify(result[0].userLiked);
//                 if(result[0].userLiked === req.body.data.userLiked) {
//                     dbConnect.query(`UPDATE likes SET userLiked=${null}, isLike=0 where postId=? AND userLiked=?`, [req.params.id, req.body.data.userLiked], (err, result) => {
//                         if(err) throw err;
//                         console.log(result);
//                     })
//                 } else if(result[0].userLiked === null) {
//                     dbConnect.query(`UPDATE likes SET userLiked=?, isLike=1 where postId=? AND userLiked=?`, [req.body.data.userLiked, req.params.id, req.body.data.userLiked], (err, result) => {
//                         if(err) throw err;
//                         console.log(result);
//                         console.log('ne fonctionne pas');
//                     })
//                 } else if(result[0].userLiked !== req.body.data.userLiked && result[0].userLiked !== null) {
//                     console.log('pas encore de like');
//                     dbConnect.query(`INSERT INTO likes (postId, userLiked, isLike) VALUES (${req.params.id}, ${req.body.data.userLiked}, 1)`, (err, result) => {
//                         if(err) throw err;
//                         console.log(result);
//                     })
//                 }
//             })
//         }
//     })
// }

//a transferer dans un fichier like.js
