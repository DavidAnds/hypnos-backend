const User = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    if (
        !req.body.email ||
        !req.body.password ||
        !req.body.firstName ||
        !req.body.lastName
    ) {
        return res.status(400).json({ error: 'lack of information' });
    }
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            User.create({ ...req.body, password: hash })
                .then((doc) =>
                    res.status(201).json({ message: 'user created', doc })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "user doesn't exist" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {
                    if (!result) {
                        return res
                            .status(401)
                            .json({ error: 'wrong password' });
                    }
                    res.status(201).json({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: jwt.sign(
                            { id: user.id },
                            'SECRET_TOKEN',
                            {
                                expiresIn: '24h',
                            }
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
    res.status(200).json({
        message: 'logout succefully',
        token: jwt.sign('SECRET_TOKEN', { expiresIn: '1s' }),
    });
};