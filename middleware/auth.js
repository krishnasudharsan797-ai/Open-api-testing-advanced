function authorizeRoles(...allowedRoles) {

    return (req, res, next) => {

        const role = req.headers.role;

        // MISSING ROLE
        if (!role) {
            return res.status(401).json({
                errorCode: "UNAUTHORIZED",
                message: "Role header is required"
            });
        }

        // FORBIDDEN
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({
                errorCode: "FORBIDDEN",
                message: "Access denied"
            });
        }

        next();
    };
}

module.exports = {
    authorizeRoles
};