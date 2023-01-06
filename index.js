const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const URL = process.env.ENV == 'production' ? process.env.DATABASE_URL : 'mongodb://localhost:27017/mern';

async function dbConnect()
{
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(URL);
        console.log(`Database connected: ${URL}`);
    } catch (error) {
        console.log('Database connection error: ', error.message);
    }
}

dbConnect();
app.use(express.json());

app.use('/user', require('./app/routes/userRoute'));
app.use('/role', require('./app/routes/roleRoute'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});