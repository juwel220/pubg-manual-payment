require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/order", async (req, res) => {
  const { product, price, number, trx } = req.body;

  await transporter.sendMail({
    from: `"PUBG UC Order" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New PUBG UC Manual Payment",
    html: `
      <h3>New Order</h3>
      <p><b>Product:</b> ${product}</p>
      <p><b>Price:</b> ৳${price}</p>
      <p><b>Customer Number:</b> ${number}</p>
      <p><b>Transaction ID:</b> ${trx}</p>
    `
  });

  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("PUBG UC Manual Payment Site Running ✅");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
