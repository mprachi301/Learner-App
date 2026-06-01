const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ success: false, error: "Forbidden: You don't have permission to access this resource" });
        }
        next();
    }
}

module.exports = roleMiddleware;