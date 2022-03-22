module.exports = (req, res, next) => {
    if (req.user.id !== req.params.id || req.user.role !== 'admin') {
         res.status(401).json({ error: 'no acces for you' });
    } else {
        next()
    }
};
