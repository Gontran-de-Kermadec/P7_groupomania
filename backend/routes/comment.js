const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');


router.post('/comment', auth, commentCtrl.comment);
router.get('/comment/:postId', auth, commentCtrl.getComments);


module.exports = router;