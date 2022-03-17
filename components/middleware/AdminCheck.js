const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,'SECRET_TOKEN');
        const adminId = decodedToken.adminId;
        

        if (req.body.adminId && req.body.adminId !== adminId) {
            throw 'Invalid admin ID';
        } else {
            req.auth = {adminId}
            next();
        }
    } catch {
        res.status('401').json({ error: "No acces" });
    }
};