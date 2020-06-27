const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config"); // config.js
const db = require("./db");
const app = express();

// bodyParser는 미들웨어이기 때문에 라우터 보다 항상 위에 있도록 해야함
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "public", "views"));
app.use("/static", express.static("static"));

// Main
app.listen(config.port, function () {
  console.log("Server listening on port %d", config.port);
});

// Router
// 기본으로 index.js를 찾기 때문에
// require("./routes/index.js")라고 명시해주지 않았음
var routes = require("./routes")(app);
