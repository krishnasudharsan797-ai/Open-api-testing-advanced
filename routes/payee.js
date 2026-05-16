const express = require("express");
const router = express.Router();

// AUDIT LOGGER
const { addLog } = require("../data/audit");


// MOCK PAYEE DATABASE
const payees = [
    {
        accountNumber: "12345678",
        ifsc: "SBIN0001234",
        accountHolderName: "Rahul Kumar"
    },
    {
        accountNumber: "87654321",
        ifsc: "HDFC0005678",
        accountHolderName: "Anita Sharma"
    }
];


// VERIFY PAYEE
router.post("/verify", (req, res) => {

    const {
        accountNumber,
        ifsc,
        accountHolderName
    } = req.body;

    // VALIDATION
    if (!accountNumber) {
        return res.status(400).json({
            error: "accountNumber is required"
        });
    }

    if (!ifsc) {
        return res.status(400).json({
            error: "ifsc is required"
        });
    }

    if (!accountHolderName) {
        return res.status(400).json({
            error: "accountHolderName is required"
        });
    }

    // FIND PAYEE
    const payee = payees.find(
        p =>
            p.accountNumber === accountNumber &&
            p.ifsc === ifsc
    );

    // NO ACCOUNT MATCH
    if (!payee) {

        addLog({
            eventType: "PAYEE_VERIFICATION_FAILED",
            result: "NO_MATCH",
            status: "FAILED"
        });

        return res.status(404).json({
            message: "Payee not found",
            result: "NO_MATCH"
        });
    }

    let result = "NO_MATCH";

    // EXACT MATCH
    if (
        payee.accountHolderName.toLowerCase() ===
        accountHolderName.toLowerCase()
    ) {
        result = "MATCH";
    }

    // PARTIAL MATCH
    else if (
        payee.accountHolderName
            .toLowerCase()
            .includes(accountHolderName.toLowerCase()) ||

        accountHolderName
            .toLowerCase()
            .includes(payee.accountHolderName.toLowerCase().split(" ")[0])
    ) {
        result = "PARTIAL_MATCH";
    }

    // AUDIT LOG
    addLog({
        eventType: "PAYEE_VERIFIED",
        accountNumber,
        ifsc,
        result,
        status: "SUCCESS"
    });

    return res.status(200).json({
        message: "Verification completed",
        result
    });
});

module.exports = router;