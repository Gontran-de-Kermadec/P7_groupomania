const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middlewares/auth');


router.post('/post/:id/like', auth, likeCtrl.likePost);
router.post('/post/:id/dislike', auth, likeCtrl.dislikePost);
router.get('/post/:id/like', auth, likeCtrl.getVoteQty);
router.get('/post/:id/like/:userId', auth, likeCtrl.getVote);

module.exports = router;