const GalleryImage = require('./galleryImageModel');
const fs = require('fs')

exports.createOne = () => {
    GalleryImage.create({
        ...req.body,
        imageURL: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`,
    })
        .then(() => res.status(201).json({ message: 'suite created' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteOne = (req, res) => {
    GalleryImage.findByPk(req.params.id)
        .then((image) => {
            const filename = image.imageURL.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                image
                .destroy()
                .then(() => res.status(200).json({ mesg: 'suite deleted' }))
                .catch((error) => res.status(400).json({ error }));
            })  
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.getAll = (req,res) => {
    GalleryImage.findAll({
        where: { suiteId: req.params.suiteId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
        .then((images) => res.status(200).json(images))
        .catch((error) => res.status(400).json({ error }));
}