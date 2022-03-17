const Hotel = require('./hotelModel');

exports.createOne = (req, res) => {
    if (!req.body.adress || !req.body.name || !req.body.city) {
        return res.status(400).json({ error: "lack of information" });
    }
    Hotel.create({ ...req.body })
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
            req.body.name ? (hotel.name = req.body.name) : hotel.name;
            req.body.city ? (hotel.city = req.body.city) : hotel.city;
            req.body.adress ? (hotel.adress = req.body.adress) : hotel.adress;
            hotel
                .save()
                .then(() => res.status(201).json({ msg: 'hotel updated' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteOne = (req, res) => {
    Hotel.destroy({where: {id: req.params.id}})
    .then(() =>res.status(201).json({ msg: 'hotel deleted' }))
    .catch(error => res.status(400).json({error}))
};
