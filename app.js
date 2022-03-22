const express = require('express');
const app = express();
app.use(express.json());

// Middleware
const setHeader = require('./components/middleware/setHeader')

// Routes
const hotelRoutes = require('./components/hotel/hotelRoutes.js');
const adminRoutes = require('./components/admin/adminRoutes');
const managerRoutes = require('./components/manager/managerRoutes');
const backUserRoutes = require('./components/backUser/backUserRoutes');
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
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/back/user', backUserRoutes);

Database.sync()
    .then(() => console.log('connexion a la BDD'))
    .catch((err) => console.log(err));

module.exports = app;
