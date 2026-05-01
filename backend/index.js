const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

// ✅ FIXED MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/", Routes);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ❗ IMPORTANT for Vercel
module.exports = app;

// Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}