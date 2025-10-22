require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/authRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); 
app.use(cookieParser());


app.get('/api', (req, res) => {
    res.send('Hello, world!');
});

app.use('/api/auth', authRouter);

connectDB()
    .then(() => {
            app.listen(PORT, () => {
                console.log(`MongoDB connected. Server is running`);
            });
    })
    .catch((error) => {
        console.error('Error starting server:', error);
    });

module.exports = app;