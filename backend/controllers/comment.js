const dbConnect = require('../connect');
const sanitize = require('sanitize-html');

//Créer un commentaire
exports.comment = (req, res, next) => {
    let userId = parseInt(sanitize(req.body.userId));
    let postId = parseInt(sanitize(req.body.postId));
    let commentName = sanitize(req.body.commentName);
    let content = sanitize(req.body.commentContent);
    console.log(content);
    //let data = [postId, content]
    //console.log(data);
    dbConnect.query(`INSERT INTO comments (userId, name, postId, comment) VALUES (${userId}, "${commentName}", "${postId}", "${content}")`, function(err, result) {
        if(err) throw err;
        if(result) {
            //console.log(result);
            res.status(201).json({message: 'commentaire ajouté'});
        }
    });
};


//obtenir commentaires du post
exports.getComments = (req, res, next) => {
    console.log(typeof req.params.postId);
    dbConnect.query(`SELECT * FROM comments WHERE postId=?`, req.params.postId, function(err, result) {
        if(err) throw err;
        if(result) {
            console.log(result);
            res.status(200).json(result);
            //res.end('Voilà la réponse du serveur !');
        }
    });
}