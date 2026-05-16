const express = require("express");
const router = express.Router();

router.post("/token", (req, res) => {
    const { role } = req.body;

    const tokens = {
        CUSTOMER: "token-customer",
        TPP: "token-tpp",
        ADMIN: "token-admin"
    };

    res.json({
        token: tokens[role] || "token-customer"
    });
});

module.exports = router;