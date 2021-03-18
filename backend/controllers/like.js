const dbConnect = require('../connect');

//middleware lors d'un clic sur like
exports.likePost = (req, res, next) => {
    let data = [req.body.userLiked, req.params.id]
    if(req.body.like == 'true') {
        console.log(req.body.like);
        //console.log('stocke like');
        // dbConnect.query(`INSERT INTO opinion (opinion_userId, opinion_postId, votes) VALUES (${req.body.userLiked}, ${req.params.id}, "1")`, (err, result) => {
        //     if(err) throw err;
        //     console.log(result);
        // })
        //dbConnect.query(`UPDATE likes SET userLiked=?, isLike=1 where postId=? AND userLiked=?`, [req.body.data.userLiked, req.params.id, req.body.data.userLiked], (err, result) => {

        dbConnect.query(`INSERT INTO opinion SET opinion_userId=?, opinion_postId=?, votes=1`, data, (err, result) => {
            if(err) throw err;
            console.log(result);
            if(result) {
                //res.status(200).json({message:'like ajouté'})
                dbConnect.query(`UPDATE post SET likes= likes + 1 WHERE id=${req.params.id}`, function(err, result) {
                    if(err) throw err;
                    if(result) {
                        console.log(result);
                        res.status(200).json(result);
                        //res.end('Voilà la réponse du serveur !');
                    }
                });
            }  
        });

    } else if (req.body.like == 'false') {
        console.log(req.body.like);
        dbConnect.query(`DELETE FROM opinion WHERE opinion_userId=${req.body.userLiked} AND opinion_postId=${req.params.id}`, (err, result) => {
            if(err) throw err;
            console.log(result);
            dbConnect.query(`UPDATE post SET likes= likes - 1 WHERE id=${req.params.id}`, function(err, result) {
                if(err) throw err;
                if(result) {
                    console.log(result);
                    res.status(200).json(result);
                    //res.end('Voilà la réponse du serveur !');
                }
            });
        })
    }

}
//middleware lors d'un clic sur dislike
exports.dislikePost = (req, res, next) => {
    let data = [req.body.userId, req.params.id]
    if(req.body.dislike == 'true') {
        console.log(req.body.dislike);
        //console.log('stocke like');
        // dbConnect.query(`INSERT INTO opinion (opinion_userId, opinion_postId, votes) VALUES (${req.body.userLiked}, ${req.params.id}, "1")`, (err, result) => {
        //     if(err) throw err;
        //     console.log(result);
        // })
        //dbConnect.query(`UPDATE likes SET userLiked=?, isLike=1 where postId=? AND userLiked=?`, [req.body.data.userLiked, req.params.id, req.body.data.userLiked], (err, result) => {

        dbConnect.query(`INSERT INTO opinion SET opinion_userId=?, opinion_postId=?, votes=-1`, data, (err, result) => {
            if(err) throw err;
            console.log(result);
            if(result) {
                //res.status(200).json({message:'like ajouté'})
                dbConnect.query(`UPDATE post SET dislikes= dislikes + 1 WHERE id=${req.params.id}`, function(err, result) {
                    if(err) throw err;
                    if(result) {
                        console.log(result);
                        res.status(200).json(result);
                        //res.end('Voilà la réponse du serveur !');
                    }
                });
            }  
        });
    } else if (req.body.dislike == 'false') {
        console.log(req.body.dislike);
        dbConnect.query(`DELETE FROM opinion WHERE opinion_userId=${req.body.userId} AND opinion_postId=${req.params.id}`, (err, result) => {
            if(err) throw err;
            console.log(result);
            dbConnect.query(`UPDATE post SET dislikes= dislikes - 1 WHERE id=${req.params.id}`, function(err, result) {
                if(err) throw err;
                if(result) {
                    console.log(result);
                    res.status(200).json(result);
                    //res.end('Voilà la réponse du serveur !');
                }
            });
        })
    }
}


exports.getVote = (req, res, next) => {
    dbConnect.query(`SELECT * FROM opinion WHERE opinion_userId=${req.params.userId} AND opinion_postId=${req.params.id}`, function(err, result) {
        if(err) throw err;
        if(result) {
            console.log(result);
            res.status(200).json(result);
            //res.end('Voilà la réponse du serveur !');
        }
    });
}
//middleware qui récupère la quantité de like d'un post 
exports.getVoteQty = (req,res,next) => {
    dbConnect.query(`SELECT likes, dislikes FROM post WHERE id=?`, req.params.id, (err, result) => {
        if(err) throw err;
        if(result) {
            console.log(result[0]);
            res.status(200).json(result[0]);
        }
    })
}


// 