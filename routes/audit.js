const express = require("express");
const router = express.Router();

// IMPORT AUDIT LOGS
const { logs } = require("../data/audit");

// IMPORT ROLE MIDDLEWARE
const { authorizeRoles } = require("../middleware/auth");


// TEST ROUTE
router.get("/test", (req, res) => {
    res.json({
        message: "Audit route working"
    });
});


// ADMIN ONLY AUDIT LOGS
router.get(
    "/",
    authorizeRoles("ADMIN"),
    (req, res) => {

        return res.status(200).json({
            count: logs.length,
            data: logs
        });
    }
);

module.exports = router;