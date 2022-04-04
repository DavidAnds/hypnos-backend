const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());

// Middleware
const setHeader = require('./components/middleware/setHeader');

// Routes
const hotelRoutes = require('./components/hotel/hotelRoutes.js');
const backUserRoutes = require('./components/backUser/backUserRoutes');
const suiteRoutes = require('./components/suite/suiteRoutes');
const galleryImageRoutes = require('./components/galleryImage/galleryImageRoutes')
const Database = require('./components/database/database.js');

// Acces to all request
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

// Routes
app.use('/api/hotel', hotelRoutes);
app.use('/api/back/user', backUserRoutes);
app.use('/api/suite', suiteRoutes);
app.use('/api/gallery', suiteRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

Database.sync()
    .then(() => console.log('connexion a la BDD'))
    .catch((err) => console.log(err));

module.exports = app;
