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