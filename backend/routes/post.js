const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');


router.post('/', auth, postCtrl.post);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getMyPosts);
router.get('/post/:id', auth, postCtrl.getOnePost);
router.delete('/post/:id', auth, postCtrl.deleteOnePost);


module.exports = router;