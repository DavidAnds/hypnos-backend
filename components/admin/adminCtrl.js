const Admin = require('./adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signin = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'lack of information' });
    }
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            Admin.create({ ...req.body, password: hash })
                .then((doc) =>
                    res.status(201).json({ message: 'admin created', doc })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.signup = (req, res, next) => {
    Admin.findOne({ where: { email: req.body.email } })
        .then((admin) => {
            if (!admin) {
                return res.status(401).json({ error: "admin doesn't exist" });
            }
            bcrypt
                .compare(req.body.password, admin.password)
                .then((result) => {
                    if (!result) {
                        return res
                            .status(401)
                            .json({ error: 'wrong password' });
                    }

                    res.status(201).json({
                        adminId: admin.id,
                        token: jwt.sign({ adminId: admin.id }, 'SECRET_TOKEN', {
                            expiresIn: '24h',
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
