//create a sequelize instance
//export connectDB function to connect to the database and test the connection

const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DBNAME, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
})

const connectDB = async() => {
    try{
        await db.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Unable to connect DB ", error);
        process.exit(1);
    }
} 

module.exports = { connectDB, db };
