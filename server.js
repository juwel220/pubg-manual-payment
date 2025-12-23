const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Order receive
app.post("/order", (req, res) => {
  const { uc, phone, trxid } = req.body;

  console.log("New Order:");
  console.log("UC:", uc);
  console.log("Phone:", phone);
  console.log("TRXID:", trxid);

  res.send("Order received! We will verify and send UC.");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
