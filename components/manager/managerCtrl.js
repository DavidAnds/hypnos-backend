const Manager = require('./ManagerModel');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

exports.createOne = (req, res) => {
    if (
        !req.body.email ||
        !req.body.password ||
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.hotelId
    ) {
        return res.status(400).json({ error: 'lack of information' });
    }
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            Manager.create({ ...req.body, password: hash })
                .then(() =>
                    res.status(201).json({ message: 'hotel created' })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res) => {
    Manager.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((managers) => res.status(200).json(managers))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOne = (req, res) => {
    Manager.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((manager) => res.status(200).json(manager))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateInfo = (req, res) => {
    Manager.findByPk(req.params.id)
        .then((manager) => {
            req.body.firstName
                ? (manager.firstName = req.body.firstName)
                : manager.firstName;
            req.body.lastName
                ? (manager.lastName = req.body.lastName)
                : manager.lastName;
            req.body.email ? (manager.email = req.body.email) : manager.email;
            req.body.hotelId ? (manager.hotelId = req.body.hotelId) : manager.hotelId;

            manager
                .save()
                .then(() =>
                    res.status(201).json({ msg: 'manager info updated' })
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
            Manager.findByPk(req.params.id)
                .then((manager) => {
                    manager.password = hash;

                    manager
                        .save()
                        .then(() =>
                            res
                                .status(201)
                                .json({ msg: 'manager password updated' })
                        )
                        .catch((error) => res.status(400).json({ error }));
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteOne = (req, res) => {
    Manager.destroy({ where: { id: req.params.id } })
        .then(() => res.status(201).json({ msg: 'manager deleted' }))
        .catch((error) => res.status(400).json({ error }));
};
