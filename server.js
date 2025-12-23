const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/order", async (req, res) => {
  const { product, price, number, trx } = req.body;

  if (!product || !price || !number || !trx) {
    return res.json({ success: false });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New UC Order",
      text: `
Product: ${product}
Price: ${price}
Number: ${number}
Transaction ID: ${trx}
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
