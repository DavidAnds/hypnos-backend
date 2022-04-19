const Suites = require('./suiteModel');
const Hotel = require('../hotel/hotelModel')
const fs = require('fs');

exports.createOne = (req, res) => {
    if (!req.body.title || !req.body.price) {
        return res.status(400).json({ error: 'lack of information' });
    }
    Suites.create({
        ...req.body,
        hotelId: req.user.hotelId,
        imageURL: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`,
    })
        .then(() => res.status(201).json({ message: 'suite created' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAll = (req, res) => {
    Suites.findAll({
        where: { hotelId: req.params.hotelId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((suites) => res.status(200).json(suites))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOne = (req, res) => {
    Suites.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include:Hotel,
    })
        .then((suite) => res.status(200).json(suite))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateOne = (req, res) => {
    Suites.findByPk(req.params.id)
        .then((suite) => {
            if (req.user.hotelId !== suite.hotelId) {
                return res.status('401').json({ error: 'No acces' });
            }

            suite.title = req.body.title;
            suite.bookingLink = req.body.bookingLink;
            suite.description = req.body.description;
            suite.price = req.body.price;

            if (req.file) {
                const pastFilename = suite.imageURL.split('/images/')[1];
                fs.unlink(`images/${pastFilename}`, () => {});
                suite.imageURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }

            suite
                .save()
                .then(() => res.status(201).json({ msg: 'suite updated' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteOne = (req, res) => {
    Suites.findByPk(req.params.id)
        .then((suite) => {
            if (req.user.hotelId !== suite.hotelId) {
                return res.status('401').json({ error: 'No acces' });
            }
            const filename = suite.imageURL.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                suite
                    .destroy()
                    .then(() => res.status(200).json({ mesg: 'suite deleted' }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(400).json({ error }));
};
