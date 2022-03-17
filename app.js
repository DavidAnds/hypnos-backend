const express = require('express');
const app = express();
app.use(express.json());

// Middleware
const setHeader = require('./components/middleware/setHeader')

// Routes
const hotelRoutes = require('./components/hotel/hotelRoutes.js');
const adminRoutes = require('./components/admin/adminRoutes');
const managerRoutes = require('./components/manager/managerRoutes');
const Database = require('./components/database/database.js');


// Acces to all request
app.use(setHeader);

// Routes
app.use('/hotel', hotelRoutes);
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);

Database.sync()
    .then(() => console.log('connexion a la BDD'))
    .catch((err) => console.log(err));

app.listen(3000, () => console.log('Listening on Port 3000'));

module.exports = app;
