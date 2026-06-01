const express = require('express');
const { connectDB, db } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
require('./models');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/enrollment', enrollmentRoutes);

const startServer = async() => {
    try {
        await connectDB();
        await db.sync({ alter: true });
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server is running on port ", process.env.PORT || 5000);
        })
    } catch (error) {
        console.error(error);
    }
}

startServer();
