require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.error("DB Error:", err));

// Email setup
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Order API
app.post("/order", async (req, res) => {
  try {
    const { product, price, number, trx } = req.body;

    await transporter.sendMail({
      from: `"PUBG UC Order" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New PUBG UC Manual Payment",
      html: `
        <h3>New Order</h3>
        <p><b>Product:</b> ${product}</p>
        <p><b>Price:</b> ৳${price}</p>
        <p><b>Mobile:</b> ${number}</p>
        <p><b>Transaction ID:</b> ${trx}</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
