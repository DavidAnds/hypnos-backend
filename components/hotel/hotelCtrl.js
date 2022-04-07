const Hotel = require('./hotelModel');
const fs = require('fs')

exports.createOne = (req, res) => {
    if (!req.body.adress || !req.body.name || !req.body.city) {
        return res.status(400).json({ error: 'lack of information' });
    }
    Hotel.create({
        ...req.body,
        imageURL: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`,
    })
        .then(() => res.status(201).json({ message: 'hotel created' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAll = (req, res) => {
    Hotel.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((hotels) => res.status(200).json(hotels))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOne = (req, res) => {
    Hotel.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((hotel) => res.status(200).json(hotel))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateOne = (req, res) => {
    Hotel.findByPk(req.params.id)
        .then((hotel) => {
            hotel.name = req.body.name;
            hotel.city = req.body.city;
            hotel.adress = req.body.adress;
            hotel.description = req.body.description;
            hotel.imageDescription = req.body.imageDescription

            if (req.file) {
                const pastFilename = hotel.imageURL.split('/images/')[1];
                fs.unlink(`images/${pastFilename}`, () => {});
                hotel.imageURL = `${req.protocol}://${req.get('host')}/images/${
                    req.file.filename
                }`;
            }

            hotel
                .save()
                .then(() => res.status(201).json({ msg: 'hotel updated' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteOne = (req, res) => {
    Hotel.destroy({ where: { id: req.params.id } })
        .then(() => res.status(201).json({ msg: 'hotel deleted' }))
        .catch((error) => res.status(400).json({ error }));
};
