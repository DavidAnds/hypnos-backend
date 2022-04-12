const Reservation = require('./reservationModel');

exports.createOne = (req, res) => {
    Reservation.create({
        ...req.body,
        userId: req.user.id,
    })
        .then(() => res.status(201).json({ message: 'reservation completed' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAll = (req, res) => {
    Reservation.findAll({
        where: { suiteId: req.params.suiteId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(400).json({ error }));
};
