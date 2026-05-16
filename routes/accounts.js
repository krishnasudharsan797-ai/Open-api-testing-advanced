const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

// IMPORT ACCOUNT DATA
const {
    createAccount,
    getAllAccounts,
    getAccountById,
    getAccountsByCustomerId
} = require("../data/accounts");

// IMPORT CONSENT DATA
const {
    getConsentById
} = require("../data/consents");

// IMPORT ROLE AUTHORIZATION
const {
    authorizeRoles
} = require("../middleware/auth");


// CREATE ACCOUNT
router.post("/create", (req, res) => {

    const { customerId, balance, bankId } = req.body;

    // VALIDATION
    if (!customerId) {
        return res.status(400).json({
            error: "customerId is required"
        });
    }

    if (!bankId) {
        return res.status(400).json({
            error: "bankId is required"
        });
    }

    if (balance !== undefined && balance < 0) {
        return res.status(400).json({
            error: "Initial balance cannot be negative"
        });
    }

    const newAccount = {
        id: uuid(),
        customerId,
        bankId,
        balance: balance || 0
    };

    createAccount(newAccount);

    return res.status(201).json({
        message: "Account created successfully",
        data: newAccount
    });
});


// GET ALL ACCOUNTS
router.get("/", (req, res) => {

    const accounts = getAllAccounts();

    return res.status(200).json({
        count: accounts.length,
        data: accounts
    });
});


// AGGREGATED ACCOUNTS
// TPP ONLY ACCESS
router.get(
    "/aggregated/accounts",

    authorizeRoles("TPP"),

    (req, res) => {

        const { customerId, consentId } = req.query;

        // VALIDATE CUSTOMER ID
        if (!customerId) {
            return res.status(400).json({
                error: "customerId query parameter is required"
            });
        }

        // VALIDATE CONSENT ID
        if (!consentId) {
            return res.status(400).json({
                error: "consentId query parameter is required"
            });
        }

        // CHECK CONSENT
        const consent = getConsentById(consentId);

        if (!consent) {
            return res.status(404).json({
                error: "Consent not found"
            });
        }

        // CHECK CONSENT STATUS
        if (consent.status !== "APPROVED") {
            return res.status(403).json({
                error: "Access denied. Consent is not approved"
            });
        }

        // CHECK CUSTOMER OWNERSHIP
        if (consent.customerId !== customerId) {
            return res.status(403).json({
                error: "Consent does not belong to this customer"
            });
        }

        // FETCH ACCOUNTS
        const accounts = getAccountsByCustomerId(customerId);

        if (accounts.length === 0) {
            return res.status(404).json({
                error: "Accounts not found for customer"
            });
        }

        return res.status(200).json({
            customerId,
            totalAccounts: accounts.length,
            accounts
        });
    }
);


// GET ACCOUNT BY ID
router.get("/:id", (req, res) => {

    const account = getAccountById(req.params.id);

    if (!account) {
        return res.status(404).json({
            error: "Account not found"
        });
    }

    return res.status(200).json({
        data: account
    });
});

module.exports = router;