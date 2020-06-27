const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
const handleOpen = () => console.log("connected db");
const handelError = () => console.log("err");
db.once("open", handleOpen);
db.on("error", handelError);
