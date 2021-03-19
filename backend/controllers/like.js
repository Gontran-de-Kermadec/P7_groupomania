const dbConnect = require('../connect');

//middleware qui lors d'un clic sur like ajoute 1 a table opinion et 1 a colonne like dans table post
exports.likePost = (req, res, next) => {
    let data = [req.body.userId, req.params.id]
    if(req.body.like_dislike == 'true') {
        console.log(req.body.like_dislike);
        dbConnect.query(`INSERT INTO opinion SET opinion_userId=?, opinion_postId=?, votes=1`, data, (err, result) => {
            if(err) throw err;
            console.log(result);
            if(result) {
                //dbConnect.query(`UPDATE post SET likes= likes + 1 WHERE id=${req.params.id}`, function(err, result) {
                dbConnect.query(`UPDATE post SET likes= likes + 1 WHERE id=?`, req.params.id, (err, result) => {
                    if(err) throw err;
                    if(result) {
                        console.log(result);
                        res.status(200).json(result);
                    }
                });
            }  
        });

    } else if (req.body.like_dislike == 'false') {
        console.log(req.body.like_dislike);
        //dbConnect.query(`DELETE FROM opinion WHERE opinion_userId=${req.body.userId} AND opinion_postId=${req.params.id}`, (err, result) => {
        dbConnect.query(`DELETE FROM opinion WHERE opinion_userId=? AND opinion_postId=?`, data, (err, result) => {
            if(err) throw err;
            console.log(result);
            //dbConnect.query(`UPDATE post SET likes= likes - 1 WHERE id=${req.params.id}`, function(err, result) {
            dbConnect.query(`UPDATE post SET likes= likes - 1 WHERE id=?`, req.params.id, (err, result) => {
                if(err) throw err;
                if(result) {
                    console.log(result);
                    res.status(200).json(result);
                }
            });
        })
    }

}
//middleware qui lors d'un clic sur dislike ajoute -1 a table opinion et 1 a colonne dislike dans table post
exports.dislikePost = (req, res, next) => {
    let data = [req.body.userId, req.params.id]
    if(req.body.like_dislike == 'true') {
        console.log(req.body.like_dislike);
        dbConnect.query(`INSERT INTO opinion SET opinion_userId=?, opinion_postId=?, votes=-1`, data, (err, result) => {
            if(err) throw err;
            console.log(result);
            if(result) {
                //dbConnect.query(`UPDATE post SET dislikes= dislikes + 1 WHERE id=${req.params.id}`, (err, result) => {
                dbConnect.query(`UPDATE post SET dislikes= dislikes + 1 WHERE id=?`, req.params.id, (err, result) => {
                    if(err) throw err;
                    if(result) {
                        console.log(result);
                        res.status(200).json(result);
                    }
                });
            }  
        });
    } else if (req.body.like_dislike == 'false') {
        console.log(req.body.like_dislike);
        //dbConnect.query(`DELETE FROM opinion WHERE opinion_userId=${req.body.userId} AND opinion_postId=${req.params.id}`, (err, result) => {
        dbConnect.query(`DELETE FROM opinion WHERE opinion_userId=? AND opinion_postId=?`, data, (err, result) => {
            if(err) throw err;
            console.log(result);
            //dbConnect.query(`UPDATE post SET dislikes= dislikes - 1 WHERE id=${req.params.id}`, function(err, result) {
            dbConnect.query(`UPDATE post SET dislikes= dislikes - 1 WHERE id=?`, req.params.id, (err, result) => {
                if(err) throw err;
                if(result) {
                    console.log(result);
                    res.status(200).json(result);
                }
            });
        })
    }
}
exports.getVote = (req, res, next) => {
    let data = [req.params.userId, req.params.id];
    //dbConnect.query(`SELECT * FROM opinion WHERE opinion_userId=${req.params.userId} AND opinion_postId=${req.params.id}`, function(err, result) {
    dbConnect.query(`SELECT * FROM opinion WHERE opinion_userId=? AND opinion_postId=?`, data, (err, result) => {
        if(err) throw err;
        if(result) {
            console.log(result);
            res.status(200).json(result);
        }
    });
}
//middleware qui récupère la quantité de like/dislike d'un post 
exports.getVoteQty = (req,res,next) => {
    dbConnect.query(`SELECT likes, dislikes FROM post WHERE id=?`, req.params.id, (err, result) => {
        if(err) throw err;
        if(result) {
            console.log(result[0]);
            res.status(200).json(result[0]);
        }
    })
}