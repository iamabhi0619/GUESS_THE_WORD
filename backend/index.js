const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const wordsRoutes = require("./routes/words");
const userRoutes = require("./routes/user");
const app = express();
PORT = process.env.PORT || 2020;
dotenv.config();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Database connected...!");
}
main().catch((err) => {
  console.log(err);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/user", userRoutes.routes);
app.use("/api/word", wordsRoutes.routes);

app.listen(PORT, () => {
  console.log("Server Started");
});


module.exports = app;