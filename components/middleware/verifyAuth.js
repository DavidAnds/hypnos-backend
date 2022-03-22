const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,'SECRET_TOKEN');
        const user = decodedToken;
        

        if (req.body.userId && req.body.userId !== user.id) {
            throw 'Invalid admin ID';
        } else {
            req.user = user
            next();
        }
    } catch {
        res.status('401').json({ error: "No acces" });
    }
};