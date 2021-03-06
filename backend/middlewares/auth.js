const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let RANDOM_TOKEN_SECRET = 'zGTNYHbegATm0k$wYprfQqmZifuDfLIv4m_CAMj3eBN6o6Zd7g9u'
    try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
    } else {
        next();
    }
    } catch (error) {
    res.status(401).json({
        error: error | 'Requête non authentifiée'
    });
    }
};