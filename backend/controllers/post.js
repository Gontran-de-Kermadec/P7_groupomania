const dbConnect = require('../connect');
const sanitize = require('sanitize-html');

//Créer une publication
exports.post = (req, res, next) => {
    let postId = parseInt(sanitize(req.body.getId));
    let postName = sanitize(req.body.postName);
    let postUrl = sanitize(req.body.postUrl);
    let content = sanitize(req.body.postContent);
    let data = [postId, content, postUrl]
    console.log(data);
    if(postUrl === '') {
        dbConnect.query(`INSERT INTO post (userId, name, postContent) VALUES (${postId}, "${postName}", "${content}")`, function(err, result) {
            if(err) throw err;
            if(result) {
                res.status(201).json({message: 'post ajouté'});
            }
        });
    } else {
        dbConnect.query(`INSERT INTO post (userId, name, postContent, postUrl) VALUES (${postId}, "${postName}", "${content}", "${postUrl}")`, function(err, result) {
            if(err) throw err;
            if(result) {
                //console.log(result);
                res.status(201).json({message: 'post ajouté'});
            }
        });
    }
};

//obtenir tous les posts du plus récent au plus vieux.
exports.getAllPosts = (req, res, next) => {
    dbConnect.query(`SELECT * FROM post ORDER BY postDate DESC`, function(err, result) {
        if(err) throw err;
        if(result) {
            //console.log(result);
            res.status(200).json(result);
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
        }
    });
}

//Update un post
exports.updatePost = (req, res, next) => {
    let postId = req.params.id;
    let postUrl = sanitize(req.body.postUrl);
    let content = sanitize(req.body.postContent);
    let data = [content, postUrl, postId];
    let dataMinusUrl = [content, postId]
    if (postUrl === "") {
        dbConnect.query('UPDATE post SET postContent=? WHERE id=?', dataMinusUrl, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.status(200).json({message:'publication mise à jour'})
        })
    } else {
        dbConnect.query('UPDATE post SET postContent=?, postUrl=? WHERE id=?', data, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.status(200).json({message:'publication mise à jour'})
        })
    }
   
}

//Supprimer un post
exports.deleteOnePost = (req, res, next) => {
    dbConnect.query('DELETE FROM post WHERE id=?', req.params.id, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({message:'publication supprimée'})
    })
}
