require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

// read connection string from env file
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

// define db connect error handler
database.on('error', (error) => {
    console.log(error)
});

// define db connect handler
database.once('connected', () => {
    console.log('Connected to mongodb!');
});

// create app using express
const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})