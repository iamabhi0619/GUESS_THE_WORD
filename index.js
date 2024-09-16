const express = require("express");
const cors = require("cors");
const path = require("path");
const wordContoller = require("./controller/words");

const app = express();
PORT = process.env.PORT || 2020;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/word", wordContoller.getWords);
app.post("/api/new", wordContoller.newUser);
app.post("/api/check-word", wordContoller.checkWord);

app.listen(PORT, () => {
  console.log("Server Started");
});
