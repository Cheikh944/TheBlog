const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const logHeader = req.headers.authorization || req.headers.Authorization;

    if (!logHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const token = logHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('TokenExpiredError')
                return res.status(401).json({ error: 'Token expired' });
            } else {
                return res.status(403).json({ error: 'Forbidden' });
            }
        }

        req.name = decoded.name;
        req.id = decoded.id;
        next();
    });
};

module.exports = verify