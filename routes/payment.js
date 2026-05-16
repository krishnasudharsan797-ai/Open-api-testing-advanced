const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

// IMPORT PAYMENT DATA
const {
  createPayment,
  getPaymentById,
  updatePaymentStatus
} = require("../data/payments");

// IMPORT AUDIT LOGGER
const { addLog } = require("../data/audit");


// ----------------------
// INITIATE PAYMENT
// ----------------------
router.post("/initiate", (req, res) => {

  // EMPTY BODY CHECK
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      errorCode: "EMPTY_BODY",
      message: "Request body cannot be empty"
    });
  }

  const {
    amount,
    payeeVerified
  } = req.body;

  // AMOUNT REQUIRED
  if (amount === undefined || amount === null) {
    return res.status(400).json({
      errorCode: "VALIDATION_ERROR",
      message: "Amount is required"
    });
  }

  // MUST BE NUMBER
  if (typeof amount !== "number") {
    return res.status(400).json({
      errorCode: "VALIDATION_ERROR",
      message: "Amount must be a number"
    });
  }

  // POSITIVE AMOUNT
  if (amount <= 0) {
    return res.status(400).json({
      errorCode: "VALIDATION_ERROR",
      message: "Amount must be greater than zero"
    });
  }

  // MAX LIMIT VALIDATION
  if (amount > 100000) {
    return res.status(400).json({
      errorCode: "LIMIT_EXCEEDED",
      message: "Maximum transaction limit exceeded"
    });
  }

  // PAYEE VERIFIED MUST BE BOOLEAN
  if (
    payeeVerified !== undefined &&
    typeof payeeVerified !== "boolean"
  ) {
    return res.status(400).json({
      errorCode: "VALIDATION_ERROR",
      message: "payeeVerified must be boolean"
    });
  }

  const payment = {
    id: uuid(),
    amount,
    payeeVerified: payeeVerified || false,
    status: "INITIATED",
    createdAt: new Date().toISOString()
  };

  createPayment(payment);

  addLog({
    eventType: "PAYMENT_INITIATED",
    paymentId: payment.id,
    status: "SUCCESS"
  });

  return res.status(201).json({
    message: "Payment initiated",
    data: payment
  });
});


// ----------------------
// AUTHORIZE PAYMENT
// ----------------------
router.post("/:id/authorize", (req, res) => {

  const payment = getPaymentById(req.params.id);

  if (!payment) {
    return res.status(404).json({
      errorCode: "NOT_FOUND",
      message: "Payment not found"
    });
  }

  if (payment.status !== "INITIATED") {
    return res.status(400).json({
      errorCode: "INVALID_STATE",
      message: "Only initiated payments can be authorized"
    });
  }

  updatePaymentStatus(payment.id, "AUTHORIZED");

  addLog({
    eventType: "PAYMENT_AUTHORIZED",
    paymentId: payment.id,
    status: "SUCCESS"
  });

  return res.status(200).json({
    message: "Payment authorized",
    data: payment
  });
});


// ----------------------
// EXECUTE PAYMENT
// ----------------------
router.post("/:id/execute", (req, res) => {

  const payment = getPaymentById(req.params.id);

  // PAYMENT NOT FOUND
  if (!payment) {

    addLog({
      eventType: "PAYMENT_EXECUTION_FAILED",
      status: "FAILED",
      reason: "Payment not found"
    });

    return res.status(404).json({
      errorCode: "NOT_FOUND",
      message: "Payment not found"
    });
  }

  // DUPLICATE EXECUTION
  if (payment.status === "COMPLETED") {

    addLog({
      eventType: "DUPLICATE_PAYMENT_EXECUTION",
      paymentId: payment.id,
      status: "FAILED"
    });

    return res.status(400).json({
      errorCode: "INVALID_STATE",
      message: "Payment already executed"
    });
  }

  // MUST BE AUTHORIZED
  if (payment.status !== "AUTHORIZED") {

    addLog({
      eventType: "PAYMENT_EXECUTION_FAILED",
      paymentId: payment.id,
      status: "FAILED",
      reason: "Payment not authorized"
    });

    return res.status(400).json({
      errorCode: "INVALID_STATE",
      message: "Payment must be authorized before execution"
    });
  }

  // PAYEE VERIFICATION CHECK
  if (!payment.payeeVerified) {

    addLog({
      eventType: "PAYMENT_EXECUTION_FAILED",
      paymentId: payment.id,
      status: "FAILED",
      reason: "Payee not verified"
    });

    return res.status(400).json({
      errorCode: "PAYEE_NOT_VERIFIED",
      message: "Payee verification required before execution"
    });
  }

  // EXECUTE PAYMENT
  updatePaymentStatus(payment.id, "COMPLETED");

  addLog({
    eventType: "PAYMENT_EXECUTED",
    paymentId: payment.id,
    status: "SUCCESS"
  });

  return res.status(200).json({
    message: "Payment executed successfully",
    data: payment
  });
});

module.exports = router;