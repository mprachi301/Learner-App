const AuthService = require('../services/authService');

class AuthController {
    static async register(req, res) {
        try {
            const { username, email, password, role } = req.body;
            const { token, user } = await AuthService.register(username, email, password, role);
            res.status(201).json({ success: true, message: "User registered successfully", data: {token: token, username: user.username, email: user.email, role: user.role} });
        } catch (error) {
            const status = error.message.includes('already exists') ? 409 : error.message.includes('Invalid email') ? 401 : 500
            res.status(status).json({ success: false, error: error.message })
        }
    }

    static async login(req, res) {
        try {
            const {email, password} = req.body;
            const { token, user } = await AuthService.login(email, password);
            res.status(200).json({ success: true, message: "Login successful", data: {token: token, username: user.username, email: user.email, role: user.role}})
        } catch (error) {
            const status = error.message.includes('already exists') ? 409 : error.message.includes('Invalid email') ? 401 : 500
            res.status(status).json({ success: false, error: error.message })
        }
    }
}

module.exports = AuthController;