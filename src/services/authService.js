const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

class AuthService {
    static async register(username, email, password, role) {
        const existingUser = await User.findOne({ where: {email} });
        if(existingUser) {
            throw new Error("User with this email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password: hashedPassword, role});
        const jwtToken = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        return { token: jwtToken, user };
    }

    static async login(email, password){
        const user = await User.findOne({where: {email} });
        if(!user) {
            throw new Error("Invalid email or password")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error("Invalid email or password")
        }
        const jwtToken = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
        return { token: jwtToken, user };
    }
}

module.exports = AuthService;