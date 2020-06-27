const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("GET");
});
app.post("/", (req, res) => {
  res.send("post");
});
app.put("/", (req, res) => {
  res.send("put");
});
app.delete("/", (req, res) => {
  res.send("delete");
});
app.listen(3000, () => console.log("Listening on 3000"));
