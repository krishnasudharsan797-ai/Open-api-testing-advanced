let payments = [];

function createPayment(payment) {
    payments.push(payment);
    return payment;
}

function getPaymentById(id) {
    return payments.find(p => p.id === id);
}

function updatePaymentStatus(id, status) {
    const payment = payments.find(p => p.id === id);
    if (payment) {
        payment.status = status;
    }
    return payment;
}

module.exports = {
    createPayment,
    getPaymentById,
    updatePaymentStatus
};