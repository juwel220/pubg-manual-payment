const express = require("express");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// order submit
app.post("/order", (req, res) => {
  const { product, price, number, trx } = req.body;

  console.log("NEW ORDER:");
  console.log(product, price, number, trx);

  res.json({ success: true });
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
