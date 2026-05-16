const express = require("express");
const router = express.Router();

const { v4: uuid } = require("uuid");

// DATA LAYER
const {
    createConsent,
    getConsentById,
    updateConsentStatus
} = require("../data/consents");

// AUDIT LOGGER
const { addLog } = require("../data/audit");


// CREATE CONSENT
router.post("/create", (req, res) => {

    const { customerId } = req.body;

    if (!customerId) {
        return res.status(400).json({
            error: "customerId is required"
        });
    }

    const consent = {
        id: uuid(),
        customerId,
        status: "CREATED"
    };

    createConsent(consent);

    addLog({
        eventType: "CONSENT_CREATED",
        consentId: consent.id,
        status: "SUCCESS"
    });

    return res.status(201).json({
        message: "Consent created",
        data: consent
    });
});


// APPROVE CONSENT
router.post("/:id/approve", (req, res) => {

    const consent = getConsentById(req.params.id);

    if (!consent) {
        return res.status(404).json({
            error: "Consent not found"
        });
    }

    if (consent.status !== "CREATED") {
        return res.status(400).json({
            error: "Only CREATED consent can be approved"
        });
    }

    updateConsentStatus(consent.id, "APPROVED");

    addLog({
        eventType: "CONSENT_APPROVED",
        consentId: consent.id,
        status: "SUCCESS"
    });

    return res.status(200).json({
        message: "Consent approved",
        data: consent
    });
});


// REVOKE CONSENT
router.post("/:id/revoke", (req, res) => {

    const consent = getConsentById(req.params.id);

    if (!consent) {
        return res.status(404).json({
            error: "Consent not found"
        });
    }

    updateConsentStatus(consent.id, "REVOKED");

    addLog({
        eventType: "CONSENT_REVOKED",
        consentId: consent.id,
        status: "SUCCESS"
    });

    return res.status(200).json({
        message: "Consent revoked",
        data: consent
    });
});


// GET CONSENT
router.get("/:id", (req, res) => {

    const consent = getConsentById(req.params.id);

    if (!consent) {
        return res.status(404).json({
            error: "Consent not found"
        });
    }

    return res.status(200).json({
        data: consent
    });
});

module.exports = router;