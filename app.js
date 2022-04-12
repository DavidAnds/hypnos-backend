const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
app.use(express.json());

// Routes
const hotelRoutes = require('./components/hotel/hotelRoutes');
const backUserRoutes = require('./components/backUser/backUserRoutes');
const suiteRoutes = require('./components/suite/suiteRoutes');
const galleryImageRoutes = require('./components/galleryImage/galleryImageRoutes');
const userRoutes = require('./components/user/userRoutes');
const Database = require('./components/database/database.js');
const reservationRoutes = require('./components/reservation/reservationRoutes');

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
app.use('/api/user', userRoutes);
app.use('/api/suite', suiteRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/gallery', galleryImageRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

Database.sync()
    .then(() => console.log('connexion a la BDD'))
    .catch((err) => console.log(err));

app.listen(port);
console.log(`Server is litening on port ${port}`);
// module.exports = app;
