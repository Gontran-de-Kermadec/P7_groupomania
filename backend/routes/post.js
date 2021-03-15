const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');


router.post('/', auth, postCtrl.post);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getMyPosts);
router.get('/post/:id', auth, postCtrl.getOnePost);
router.delete('/post/:id', auth, postCtrl.deleteOnePost);
//router.post('/post/:id/like', auth, postCtrl.likePost);
// router.post('/login', userCtrl.login);
// router.delete('/:id', userCtrl.deleteUser);


module.exports = router;