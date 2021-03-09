const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');


router.post('/comment', auth, commentCtrl.comment);
router.get('/comment/:postId', auth, commentCtrl.getComments);
// router.get('/:id', auth, postCtrl.getMyPosts);
// router.get('/post/:id', auth, postCtrl.getOnePost);
// router.delete('/post/:id', auth, postCtrl.deleteOnePost);
// router.post('/login', userCtrl.login);
// router.delete('/:id', userCtrl.deleteUser);


module.exports = router;