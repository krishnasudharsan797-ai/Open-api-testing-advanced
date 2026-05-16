let consents = [];

function createConsent(consent) {
    consents.push(consent);
    return consent;
}

function getConsentById(id) {
    return consents.find(c => c.id === id);
}

function updateConsentStatus(id, status) {
    const consent = consents.find(c => c.id === id);
    if (consent) {
        consent.status = status;
    }
    return consent;
}

module.exports = {
    createConsent,
    getConsentById,
    updateConsentStatus
};