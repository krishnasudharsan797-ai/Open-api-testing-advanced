const express = require("express");
const app = express();

app.use(express.json());

// ROUTES
const authRoutes = require("./routes/auth");
const consentRoutes = require("./routes/consent");
const accountRoutes = require("./routes/accounts");
const paymentRoutes = require("./routes/payment");
const payeeRoutes = require("./routes/payee");
const auditRoutes = require("./routes/audit");

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/consents", consentRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/payee", payeeRoutes);
app.use("/api/audit", auditRoutes);

// ROOT
app.get("/", (req, res) => {
    res.send("API is running...");
});

// API HEALTH
app.get("/api", (req, res) => {
    res.json({
        message: "Open Banking API is running"
    });
});

// SERVER
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});