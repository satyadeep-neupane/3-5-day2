const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

// const URL = "mongodb+srv://QwPlfyWFO0GtlqMg:QwPlfyWFO0GtlqMg@cluster0.w50r0wi.mongodb.net/?retryWrites=true&w=majority"
const URL = "mongodb://localhost:27017/mern";

async function dbConnect()
{
    try {
        await mongoose.connect(URL);
        console.log('Database connected');
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