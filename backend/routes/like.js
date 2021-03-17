const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middlewares/auth');


router.post('/post/:id/like', auth, likeCtrl.likePost);
router.get('/post/:id/like/:userId', auth, likeCtrl.getVote);


module.exports = router;