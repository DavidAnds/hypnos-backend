const BackUser = require('../backUser/backUserModel');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            BackUser.create({ ...req.body, password: hash })
                .then((doc) =>
                    res.status(201).json({ message: 'user created', doc })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    BackUser.findOne({ where: { email: req.body.email } })
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
                    user.hotelId === null
                        ? (hotelId = 'All hotel')
                        : (hotelId = user.hotelId);
                    res.status(201).json({
                        role: user.role,
                        hotelId,
                        token: jwt.sign(
                            { id: user.id, role: user.role, hotelId },
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

exports.refresh = (req,res,next) => {
    res.status(201).json({
        role: req.user.role,
        hotelId: req.user.hotelId,
        token: jwt.sign(
            { id: req.user.id, role: req.user.role, hotelId },
            'SECRET_TOKEN',
            {
                expiresIn: '24h',
            }
        ),
    })
}

exports.logout = (req, res) => {
    res.status(200).json({
        message: 'logout succefully',
        token: jwt.sign('SECRET_TOKEN', { expiresIn: '1s' }),
    });
};

exports.getAll = (req, res) => {
    BackUser.findAll({
        where: { role: 'manager' },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOne = (req, res) => {
    BackUser.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateInfo = (req, res) => {
    BackUser.findByPk(req.params.id)
        .then((user) => {
            req.body.firstName
                ? (user.firstName = req.body.firstName)
                : user.firstName;
            req.body.lastName
                ? (user.lastName = req.body.lastName)
                : user.lastName;
            req.body.email ? (user.email = req.body.email) : user.email;
            req.body.hotelId ? (user.hotelId = req.body.hotelId) : user.hotelId;

            user.save()
                .then((doc) =>
                    res.status(201).json({ msg: 'user info updated', doc })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.updatePassword = (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({ error: 'lack of information' });
    }
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            BackUser.findByPk(req.params.id)
                .then((user) => {
                    user.password = hash;

                    user.save()
                        .then(() =>
                            res
                                .status(201)
                                .json({ msg: 'user password updated' })
                        )
                        .catch((error) => res.status(400).json({ error }));
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteOne = (req, res) => {
    BackUser.destroy({ where: { id: req.params.id } })
        .then(() => res.status(201).json({ msg: 'manager deleted' }))
        .catch((error) => res.status(400).json({ error }));
};
