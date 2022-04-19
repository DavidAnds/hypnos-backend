const Reservation = require('./reservationModel');
const Suite = require('../suite/suiteModel');
const Hotel = require('../hotel/hotelModel');

exports.createOne = (req, res) => {
    if (!req.body.suiteId || !req.body.endDate || !req.body.startDate) {
        return res.status(400).json({ error: 'lack of information' });
    }
    Reservation.create({
        ...req.body,
        userId: req.user.id,
    })
        .then(() => res.status(201).json({ message: 'reservation completed' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAll = (req, res) => {
    Reservation.findAll({
        where: { userId: req.params.userId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            {
                model: Suite,
                include: [
                    {
                        model: Hotel,
                    },
                ],
            },
        ],
    })
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAllFromSuite = (req, res) => {
    Reservation.findAll({
        where: { suiteId: req.params.suiteId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteOne = (req, res) => {
    Reservation.destroy({ where: { id: req.params.id } })
        .then(() => res.status(201).json({ msg: 'hotel deleted' }))
        .catch((error) => res.status(400).json({ error }));
};
